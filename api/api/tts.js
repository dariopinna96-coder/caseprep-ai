export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const elKey = process.env.ELEVENLABS_API_KEY;
  if (!elKey) return res.status(400).json({ error: 'ELEVENLABS_API_KEY non configurata. Verrà usata la voce browser.' });

  const { text, voiceId = 'N2lVS1w4EtoT3dr4eOWO' } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'xi-api-key': elKey },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2_5',
        language_code: 'it',
        voice_settings: { stability: 0.35, similarity_boost: 0.85, style: 0.40, use_speaker_boost: true, speed: 0.95 }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err.detail?.message || 'ElevenLabs error' });
    }

    const audioBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioBuffer.byteLength);
    res.send(Buffer.from(audioBuffer));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
