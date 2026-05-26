import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Triggered by entity automation when a Reel status becomes "complete".
// Calls D-ID /talks using Microsoft neural TTS.
// Once you've created Mia & Oliver in D-ID, replace PRESENTER_IMAGE_URL
// with the image URL from your D-ID agent/presenter.

// Oliver presenter video (ElevenLabs / Veed)
const PRESENTER_IMAGE_URL = "https://media.base44.com/videos/public/6a1440ebe28bb283cc5442e2/75db00a9e_ElevenLabs_video_veed-fabric_2026-05-17T17_33_17.mp4";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const DID_API_KEY = Deno.env.get("DID_API_KEY");
    if (!DID_API_KEY) {
      return Response.json({ error: "Missing DID_API_KEY" }, { status: 500 });
    }

    const body = await req.json();

    // Support both entity automation payload and direct call
    const reelId = body?.event?.entity_id || body?.reel_id;
    if (!reelId) {
      return Response.json({ error: "Missing reel_id" }, { status: 400 });
    }

    const reel = await base44.asServiceRole.entities.Reel.get(reelId);
    if (!reel) return Response.json({ error: "Reel not found" }, { status: 404 });
    if (!reel.script) return Response.json({ error: "Reel has no script" }, { status: 400 });
    if (reel.status !== "complete") {
      return Response.json({ message: "Reel not in complete status, skipping" });
    }

    // Submit to D-ID using Microsoft neural TTS (no external integrations required)
    const didRes = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${DID_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        source_url: PRESENTER_IMAGE_URL,
        script: {
          type: "text",
          input: reel.script,
          provider: {
            type: "microsoft",
            voice_id: "en-AU-NatashaNeural", // Australian female voice — great for real estate
          },
        },
        config: {
          fluent: true,
          pad_audio: 0.0,
          stitch: true,
        },
      }),
    });

    const didData = await didRes.json();

    if (!didRes.ok) {
      const errMsg = didData?.description || didData?.message || JSON.stringify(didData);
      console.error("D-ID API error:", errMsg);
      await base44.asServiceRole.entities.Reel.update(reelId, { status: "failed" });
      return Response.json({ error: "D-ID error: " + errMsg }, { status: 500 });
    }

    const talkId = didData?.id;
    if (!talkId) {
      return Response.json({ error: "No talk ID returned from D-ID" }, { status: 500 });
    }

    await base44.asServiceRole.entities.Reel.update(reelId, {
      did_video_id: talkId,
      status: "rendering",
    });

    console.log(`Reel ${reelId} submitted to D-ID. Talk ID: ${talkId}`);
    return Response.json({ success: true, did_video_id: talkId });

  } catch (error) {
    console.error("generateVideo error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});