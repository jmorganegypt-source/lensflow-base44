import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Triggered by entity automation when a Reel status becomes "complete"
// Submits the script to HeyGen and moves the reel to "rendering"

const HEYGEN_AVATAR_ID = "Daisy-inskirt-20220818";
const HEYGEN_VOICE_ID = "1bd001e7e50f421d891986aad5158bc8"; // Rachel - clear, warm female voice

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const reelId = body?.event?.entity_id || body?.reel_id;

    if (!reelId) {
      return Response.json({ error: "Missing reel_id" }, { status: 400 });
    }

    const reel = await base44.asServiceRole.entities.Reel.get(reelId);

    if (!reel) {
      return Response.json({ error: "Reel not found" }, { status: 404 });
    }

    if (!reel.script) {
      return Response.json({ error: "Reel has no script" }, { status: 400 });
    }

    if (reel.status !== "complete") {
      return Response.json({ message: "Reel is not in complete status, skipping" });
    }

    const HEYGEN_API_KEY = Deno.env.get("HEYGEN_API_KEY");
    if (!HEYGEN_API_KEY) {
      return Response.json({ error: "HEYGEN_API_KEY not set" }, { status: 500 });
    }

    // Submit video generation job to HeyGen
    const heygenRes = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST",
      headers: {
        "X-Api-Key": HEYGEN_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_inputs: [
          {
            character: {
              type: "avatar",
              avatar_id: HEYGEN_AVATAR_ID,
              avatar_style: "normal",
            },
            voice: {
              type: "text",
              input_text: reel.script,
              voice_id: HEYGEN_VOICE_ID,
              speed: 1.0,
            },
            background: {
              type: "color",
              value: "#0a0e1a",
            },
          },
        ],
        dimension: { width: 1080, height: 1920 },
        aspect_ratio: "9:16",
        caption: false,
      }),
    });

    const heygenData = await heygenRes.json();

    if (!heygenRes.ok || heygenData.error) {
      const errMsg = heygenData?.error?.message || JSON.stringify(heygenData);
      console.error("HeyGen API error:", errMsg);
      await base44.asServiceRole.entities.Reel.update(reelId, { status: "failed" });
      return Response.json({ error: "HeyGen error: " + errMsg }, { status: 500 });
    }

    const videoId = heygenData?.data?.video_id;
    if (!videoId) {
      return Response.json({ error: "No video_id returned from HeyGen" }, { status: 500 });
    }

    // Update reel: store HeyGen video ID and move to "rendering"
    await base44.asServiceRole.entities.Reel.update(reelId, {
      heygen_video_id: videoId,
      status: "rendering",
    });

    console.log(`Reel ${reelId} submitted to HeyGen. Video ID: ${videoId}`);
    return Response.json({ success: true, heygen_video_id: videoId });

  } catch (error) {
    console.error("generateVideo error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});