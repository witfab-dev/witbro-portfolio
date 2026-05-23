// api/chat.js — place at project ROOT (same level as package.json)
// Vercel Environment Variable needed: ANTHROPIC_API_KEY

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── Debug: log what env vars are visible (safe — only logs key name presence)
  console.log('[chat] ENV keys present:', Object.keys(process.env).filter(k => k.startsWith('ANTH')));

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error('[chat] ANTHROPIC_API_KEY is undefined');
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY environment variable is not set. Add it in Vercel → Settings → Environment Variables, then redeploy.',
    });
  }

  if (!apiKey.startsWith('sk-ant-')) {
    console.error('[chat] ANTHROPIC_API_KEY looks malformed');
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY looks incorrect — it should start with sk-ant-',
    });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { messages, system } = body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: system || '',
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[chat] Anthropic API error:', data);
      return res.status(response.status).json({
        error: data?.error?.message || 'Anthropic API returned an error',
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('[chat] Fetch error:', err);
    return res.status(500).json({ error: `Server error: ${err.message}` });
  }
}