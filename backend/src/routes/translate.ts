import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Translate text
router.post('/text', async (req: express.Request, res: express.Response) => {
  try {
    const { text, sourceLang, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. 
            Translate the following text from ${sourceLang || 'auto'} to ${targetLang}.
            Provide only the translation, no explanations.
            Preserve the original formatting and tone.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      max_tokens: 2000,
    });

    const translation = response.choices[0]?.message?.content || '';

    res.json({
      original: text,
      translation,
      sourceLang: sourceLang || 'auto-detected',
      targetLang,
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Translate voice ( Whisper )
router.post('/voice', async (req: express.Request, res: express.Response) => {
  try {
    const { audioData, targetLang } = req.body;

    if (!audioData || !targetLang) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In production, you'd process the audio buffer
    // This is a placeholder for the actual implementation
    res.json({
      message: 'Voice translation endpoint',
      note: 'Requires audio buffer processing with Whisper API',
    });
  } catch (error) {
    console.error('Voice translation error:', error);
    res.status(500).json({ error: 'Voice translation failed' });
  }
});

// Get supported languages
router.get('/languages', (req: express.Request, res: express.Response) => {
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'kk', name: 'Kazakh', nativeName: 'Қазақша' },
    { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbekcha' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
  ];

  res.json({ languages });
});

// Translation history (requires auth)
router.get('/history', async (req: express.Request, res: express.Response) => {
  // In production, fetch from database with user ID
  res.json({
    message: 'Translation history endpoint',
    note: 'Requires database integration',
  });
});

export default router;
