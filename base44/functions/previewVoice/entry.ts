import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const VOICE_IDS = {
  Oliver: "jRAAK67SEFE9m7ci5DhD",
  Mia: "69h9o7wh5u0isWHzdogD",
  Aria: "69h9o7wh5u0isWHzdogD",
  Marcus: "yXFr3XVHzrViCIHi1yoc",
  Emma: "69h9o7wh5u0isWHzdogD",
};

const SAMPLE_SCRIPT = "Welcome to this stunning prestige property. Exceptional craftsmanship, breathtaking views, and a lifestyle that truly sets the standard.";

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { presenter_name } = await req.json();
  const voiceId = VOICE_IDS[presenter_name];

  if (!voiceId) {
    return Response.json({ error: 'Voice not configured for this presenter yet.' }, { status: 400 });
  }

  const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: SAMPLE_SCRIPT,
      model_id: "eleven_monolingual_v1",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return Response.json({ error: err }, { status: 500 });
  }

  const audioBuffer = await response.arrayBuffer();
  const bytes = new Uint8Array(audioBuffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const base64 = btoa(binary);
  return Response.json({ audio_base64: base64 });
});