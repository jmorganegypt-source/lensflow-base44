import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Scheduled every 5 minutes.
// Finds all reels with status "rendering", checks HeyGen for completion,
// and updates status to "ready" with the signed download URL.

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const HEYGEN_API_KEY = Deno.env.get("HEYGEN_API_KEY");
    if (!HEYGEN_API_KEY) {
      return Response.json({ error: "HEYGEN_API_KEY not set" }, { status: 500 });
    }

    // Fetch all reels currently rendering
    const renderingReels = await base44.asServiceRole.entities.Reel.filter({ status: "rendering" });

    if (!renderingReels || renderingReels.length === 0) {
      console.log("No reels in rendering state.");
      return Response.json({ message: "No reels to poll" });
    }

    console.log(`Polling ${renderingReels.length} rendering reel(s)...`);

    const results = [];

    for (const reel of renderingReels) {
      if (!reel.heygen_video_id) {
        console.warn(`Reel ${reel.id} has no heygen_video_id, skipping.`);
        continue;
      }

      try {
        const statusRes = await fetch(
          `https://api.heygen.com/v1/video_status.get?video_id=${reel.heygen_video_id}`,
          {
            headers: { "X-Api-Key": HEYGEN_API_KEY },
          }
        );

        const statusData = await statusRes.json();
        const videoStatus = statusData?.data?.status;
        const videoUrl = statusData?.data?.video_url;
        const thumbnailUrl = statusData?.data?.thumbnail_url;

        console.log(`Reel ${reel.id} (HeyGen ${reel.heygen_video_id}): ${videoStatus}`);

        if (videoStatus === "completed" && videoUrl) {
          await base44.asServiceRole.entities.Reel.update(reel.id, {
            status: "ready",
            video_url: videoUrl,
          });
          results.push({ reel_id: reel.id, status: "ready", video_url: videoUrl });
          console.log(`Reel ${reel.id} is now READY. URL: ${videoUrl}`);
        } else if (videoStatus === "failed") {
          await base44.asServiceRole.entities.Reel.update(reel.id, {
            status: "failed",
          });
          results.push({ reel_id: reel.id, status: "failed" });
          console.log(`Reel ${reel.id} FAILED in HeyGen.`);
        } else {
          // Still processing (pending / processing)
          results.push({ reel_id: reel.id, status: videoStatus });
        }
      } catch (err) {
        console.error(`Error polling reel ${reel.id}:`, err.message);
        results.push({ reel_id: reel.id, error: err.message });
      }
    }

    return Response.json({ polled: renderingReels.length, results });

  } catch (error) {
    console.error("pollVideoStatus error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});