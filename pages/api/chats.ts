import type { NextApiRequest, NextApiResponse } from 'next';

// Configure Next.js to parse JSON body
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the API key from environment variables
  const apiKey = process.env.TD_API_KEY;

  if (!apiKey) {
    console.error('TD_API_KEY environment variable not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Get base URL from environment or use default
  const baseUrl = process.env.TD_LLM_BASE_URL || 'https://llm-api-development.us01.treasuredata.com';

  // Build the target URL - directly maps to /api/chats
  const targetUrl = `${baseUrl}/api/chats`;

  // Next.js should automatically parse JSON body
  const requestBody = req.body;

  console.log('🔍 Request Debug:', {
    method: req.method,
    targetUrl,
    contentType: req.headers['content-type'],
    hasBody: !!requestBody,
    bodyType: typeof requestBody,
    bodySample: requestBody ? JSON.stringify(requestBody).substring(0, 200) : 'null'
  });

  // Ensure we have a body
  if (!requestBody || typeof requestBody !== 'object') {
    console.error('❌ Missing or invalid request body:', {
      requestBody,
      bodyType: typeof requestBody
    });
    return res.status(400).json({
      error: 'Request body is required',
      receivedBodyType: typeof requestBody,
      hint: 'Ensure Content-Type is application/json or application/vnd.api+json'
    });
  }

  try {
    console.log('📤 Forwarding to TD API:', {
      targetUrl,
      bodyKeys: Object.keys(requestBody)
    });

    // Forward the request to the target API
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Authorization': `TD1 ${apiKey}`,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📡 TD API Response:', response.status);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

    // If API returned an error, get the error details
    if (!response.ok) {
      const responseText = await response.text();
      let errorDetails;
      try {
        errorDetails = JSON.parse(responseText);
      } catch (e) {
        errorDetails = responseText;
      }
      console.error('❌ TD API Error:', {
        status: response.status,
        statusText: response.statusText,
        details: errorDetails
      });
      return res.status(response.status).json({
        error: 'API request failed',
        status: response.status,
        statusText: response.statusText,
        details: errorDetails,
      });
    }

    // Handle JSON response
    const data = await response.json();
    console.log('✅ Chat session created:', data.data?.id);
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('💥 Proxy error:', error);
    return res.status(500).json({
      error: 'Proxy request failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
