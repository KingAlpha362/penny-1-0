import type { NextApiRequest, NextApiResponse } from 'next';
import { httpPost } from '@/lib/http';

// Try to import existing genkit integration; fall back to mock
let genkit: any = null;
try {
  // Try relative require first (works at runtime)
  // @ts-ignore
  genkit = require('../../../ai/genkit');
  if (!genkit) {
    // Try alias path as fallback
    // @ts-ignore
    genkit = require('@/ai/genkit');
  }
} catch (e) {
  // no-op - we'll fallback to proxy or mock
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body ?? {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  try {
    if (genkit && typeof genkit.generate === 'function') {
      const out = await genkit.generate(prompt);
      return res.status(200).json({ result: out });
    }

    // As fallback, call an external placeholder AI echo endpoint if configured
    if (process.env.NEXT_PUBLIC_AI_PROXY_URL) {
      const response = await httpPost(process.env.NEXT_PUBLIC_AI_PROXY_URL, { prompt });
      return res.status(200).json({ result: response.data });
    }

    // Minimal mock response
    return res.status(200).json({ result: { text: `Echo: ${prompt}` } });
  } catch (err: any) {
    console.error('AI generate error', err?.message || err);
    return res.status(500).json({ error: 'AI generation failed' });
  }
}
