import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Scheduled every 5 minutes.
// Checks D-ID status for all "rendering" reels.
// On completion → sets status to "ready" + saves the signed video_url.

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const DID_API_KEY = Deno.env.get("DID_API_KEY");
    if (!DID_API_KEY) {
      return Response.json({ error: "DID_API_KEY not set" }, { status: 500 });
    }

    const renderingReels = await base44.asServiceRole.entities.Reel.filter({ status: "rendering" });

    if (!renderingReels || renderingReels.length === 0) {
      console.log("No reels in rendering state.");
      return Response.json({ message: "No reels to poll" });
    }

    console.log(`Polling ${renderingReels.length} rendering reel(s)...`);
    const results = [];

    for (const reel of renderingReels) {
      if (!reel.did_video_id) {
        console.warn(`Reel ${reel.id} has no did_video_id, skipping.`);
        continue;
      }

      try {
        const statusRes = await fetch(`https://api.d-id.com/talks/${reel.did_video_id}`, {
          headers: {
            "Authorization": `Basic ${DID_API_KEY}`,
            "Accept": "application/json",
          },
        });

        const statusData = await statusRes.json();
        const talkStatus = statusData?.status;
        const videoUrl = statusData?.result_url;

        console.log(`Reel ${reel.id} (D-ID ${reel.did_video_id}): ${talkStatus}`);

        if (talkStatus === "done" && videoUrl) {
          await base44.asServiceRole.entities.Reel.update(reel.id, {
            status: "ready",
            video_url: videoUrl,
          });
          results.push({ reel_id: reel.id, status: "ready", video_url: videoUrl });
          console.log(`Reel ${reel.id} is READY. URL: ${videoUrl}`);

        } else if (talkStatus === "error") {
          const errMsg = statusData?.error?.description || "Unknown D-ID error";
          console.error(`Reel ${reel.id} FAILED: ${errMsg}`);
          await base44.asServiceRole.entities.Reel.update(reel.id, { status: "failed" });
          results.push({ reel_id: reel.id, status: "failed", error: errMsg });

        } else {
          // Still in progress (created / started)
          results.push({ reel_id: reel.id, status: talkStatus });
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