import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Triggered by entity automation when a Reel status becomes "complete".
// Calls D-ID /talks using ElevenLabs as the voice provider.
// Stores the D-ID talk ID and sets status → "rendering".

// Default presenter image — replace with your agent's photo URL if desired
const PRESENTER_IMAGE_URL = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/146903c3c_hero-luxury-property-twilight.png";

// ElevenLabs voice: Rachel (warm, clear female voice)
const ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const DID_API_KEY = Deno.env.get("DID_API_KEY");
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

    if (!DID_API_KEY || !ELEVENLABS_API_KEY) {
      return Response.json({ error: "Missing DID_API_KEY or ELEVENLABS_API_KEY" }, { status: 500 });
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

    // Submit to D-ID with ElevenLabs voice provider
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
            type: "elevenlabs",
            voice_id: ELEVENLABS_VOICE_ID,
            voice_config: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
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