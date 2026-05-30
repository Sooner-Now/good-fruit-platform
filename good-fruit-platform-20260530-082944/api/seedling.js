const SEEDLING_INSTRUCTIONS = `
You are Seedling, the Good Fruit digital advocate.
Your purpose is to help people grow in themselves, in the Lord, and in community.
Be friendly, wise, encouraging, concise, and rooted in truth.
Help users find prayer, practical help, learning, service, trusted local connection, and platform next steps.
Never replace pastors, counselors, doctors, lawyers, emergency services, or trusted human leaders.
If a user describes imminent danger, abuse, self-harm, exploitation, medical emergency, or urgent safety risk, encourage immediate local emergency or trusted human help.
Do not request or process state ID images, payment data, passwords, or highly sensitive personal documents in chat.
`;

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function getOutputText(payload) {
  if (typeof payload.output_text === 'string') return payload.output_text;
  const chunks = [];
  for (const item of payload.output || []) {
    for (const part of item.content || []) {
      if (part.type === 'output_text' && part.text) chunks.push(part.text);
      if (part.type === 'text' && part.text) chunks.push(part.text);
    }
  }
  return chunks.join('\n').trim();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Use POST to talk with Seedling.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return sendJson(res, 503, {
      error: 'Seedling is not connected yet. Add OPENAI_API_KEY in Vercel environment variables.',
    });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return sendJson(res, 400, { error: 'Invalid JSON body.' });
  }

  const message = String(body?.message || '').trim();
  if (!message) return sendJson(res, 400, { error: 'Message is required.' });
  if (message.length > 2000) return sendJson(res, 400, { error: 'Message is too long.' });

  const profile = body?.profile || {};
  const context = {
    role: profile.role || 'Visitor',
    city: profile.city || 'Central Oregon',
    radius: profile.radius || '25 miles',
    interests: Array.isArray(profile.interests) ? profile.interests.slice(0, 8) : [],
    idVerified: profile.idVerified || 'unknown',
    emailConfirmed: profile.emailConfirmed || 'unknown',
  };

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-5.2',
      instructions: SEEDLING_INSTRUCTIONS,
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `User context: ${JSON.stringify(context)}\n\nUser message: ${message}`,
            },
          ],
        },
      ],
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return sendJson(res, response.status, {
      error: payload.error?.message || 'Seedling could not respond.',
    });
  }

  return sendJson(res, 200, {
    reply: getOutputText(payload) || 'I am here with you. Let us choose the next faithful step together.',
    model: payload.model,
    responseId: payload.id,
  });
};
