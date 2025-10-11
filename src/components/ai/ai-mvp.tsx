'use client';

import React, { useState } from 'react';

export default function AiMvp() {
  const [prompt, setPrompt] = useState('Summarize my recent spending by category');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const json = await r.json();
      setResult(json?.result?.text || JSON.stringify(json.result));
    } catch (e: any) {
      setResult('Error generating AI result');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">AI Assistant (MVP)</h3>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full mt-2 p-2 border rounded" rows={3} />
      <div className="flex gap-2 mt-2">
        <button className="btn" onClick={generate} disabled={loading}>{loading ? 'Thinking…' : 'Generate'}</button>
      </div>
      {result && (
        <div className="mt-3 p-3 bg-gray-50 rounded">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
