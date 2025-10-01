'use server';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import {-next-line} from 'genkit/next';

export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
