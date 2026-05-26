import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const OLIVER_IMAGE_URL = "https://randomuser.me/api/portraits/men/75.jpg";
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

    // Step 1: Generate audio via ElevenLabs
    console.log("Generating audio from ElevenLabs...");
    const elevenRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${OLIVER_VOICE_ID}`, {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
      },
      body: JSON.stringify({
        text: reel.script,
        model_id: "eleven_monolingual_v1",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (!elevenRes.ok) {
      const err = await elevenRes.text();
      console.error("ElevenLabs error:", err);
      await base44.asServiceRole.entities.Reel.update(reelId, { status: "failed" });
      return Response.json({ error: "ElevenLabs error: " + err }, { status: 500 });
    }

    // Step 2: Upload audio to D-ID /audios
    console.log("Uploading audio to D-ID...");
    const audioBuffer = await elevenRes.arrayBuffer();
    const audioBlob = new Blob([audioBuffer], { type: "audio/mpeg" });
    const audioForm = new FormData();
    audioForm.append("audio", audioBlob, "oliver.mp3");

    const audioUploadRes = await fetch("https://api.d-id.com/audios", {
      method: "POST",
      headers: { "Authorization": `Basic ${DID_API_KEY}` },
      body: audioForm,
    });

    const audioUploadData = await audioUploadRes.json();
    if (!audioUploadRes.ok) {
      console.error("D-ID audio upload error:", JSON.stringify(audioUploadData));
      await base44.asServiceRole.entities.Reel.update(reelId, { status: "failed" });
      return Response.json({ error: "D-ID audio upload error: " + JSON.stringify(audioUploadData) }, { status: 500 });
    }

    const audioUrl = audioUploadData?.url;
    console.log("Audio uploaded to D-ID:", audioUrl);

    // Step 3: Submit talk to D-ID using uploaded audio URL
    console.log("Submitting talk to D-ID...");
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
          type: "audio",
          audio_url: audioUrl,
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
      console.error("D-ID talks error:", JSON.stringify(didData));
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