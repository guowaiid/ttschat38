const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      const response = await openai.createAudio({
        model: 'text-to-speech',
        text: text,
        voice: 'your-preferred-voice',
      });

      res.status(200).json({ audioUrl: response.data.audio_url });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate audio' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
