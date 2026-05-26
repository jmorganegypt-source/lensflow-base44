import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Oliver presenter image — a neutral still for D-ID lip-sync
// Replace with an actual headshot of Oliver if available
const OLIVER_IMAGE_URL = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=512&h=512&fit=crop&crop=face";
const OLIVER_VOICE_ID = "jRAAK67SEFE9m7ci5DhD";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const DID_API_KEY = Deno.env.get("DID_API_KEY");
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!DID_API_KEY) return Response.json({ error: "Missing DID_API_KEY" }, { status: 500 });
    if (!ELEVENLABS_API_KEY) return Response.json({ error: "Missing ELEVENLABS_API_KEY" }, { status: 500 });

    const body = await req.json();
    const reelId = body?.event?.entity_id || body?.reel_id;
    if (!reelId) return Response.json({ error: "Missing reel_id" }, { status: 400 });

    const reel = await base44.asServiceRole.entities.Reel.get(reelId);
    if (!reel) return Response.json({ error: "Reel not found" }, { status: 404 });
    if (!reel.script) return Response.json({ error: "Reel has no script" }, { status: 400 });
    if (reel.status !== "complete") return Response.json({ message: "Reel not in complete status, skipping" });

    // Submit to D-ID using ElevenLabs provider with Oliver's voice
    const didRes = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${DID_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        source_url: OLIVER_IMAGE_URL,
        script: {
          type: "text",
          input: reel.script,
          provider: {
            type: "elevenlabs",
            voice_id: OLIVER_VOICE_ID,
            voice_config: {
              api_key: ELEVENLABS_API_KEY,
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
      console.error("D-ID API error:", JSON.stringify(didData));
      const errMsg = didData?.description || didData?.message || JSON.stringify(didData);
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