import OpenAI from 'openai';

// Check if API key is configured
const apiKey = process.env.OPENAI_API_KEY;
let openai = null;

// Only initialize OpenAI if we have a valid API key
if (apiKey && apiKey !== 'sk-REPLACE_WITH_YOUR_KEY' && !apiKey.includes('REPLACE')) {
    try {
        openai = new OpenAI({ apiKey });
        console.log('✅ OpenAI client initialized successfully');
    } catch (err) {
        console.error('❌ Failed to initialize OpenAI client:', err.message);
    }
} else {
    console.warn('⚠️  OpenAI API key not configured. Please add your API key to backend/.env');
    console.warn('   Visit https://platform.openai.com/api-keys to get your API key');
}

export async function handleChat(req, res) {
    try {
        // Check if OpenAI client is initialized
        if (!openai) {
            return res.status(503).json({
                error: 'OpenAI API not configured',
                detail: 'Please add your OpenAI API key to backend/.env file. Visit https://platform.openai.com/api-keys to get your API key.',
                instructions: [
                    '1. Go to https://platform.openai.com/api-keys',
                    '2. Sign in and create a new API key',
                    '3. Copy the key (starts with sk-)',
                    '4. Edit backend/.env and replace sk-REPLACE_WITH_YOUR_KEY with your actual key',
                    '5. Save the file - the server will auto-restart!'
                ]
            });
        }

        const { messages, model, temperature, max_tokens } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'messages array is required' });
        }

        // Use model from request or fallback to env
        const chosenModel = model || process.env.MODEL || 'gpt-4o';

        console.log(`📨 Processing chat request with model: ${chosenModel}`);

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: chosenModel,
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            temperature: temperature ?? 0.7,
            max_tokens: max_tokens ?? 1000
        });

        // Extract the assistant's reply
        const assistantText = response.choices?.[0]?.message?.content || 'No response';

        console.log('✅ Chat response received successfully');

        return res.json({ reply: assistantText, raw: response });
    } catch (err) {
        console.error('❌ Chat error:', err?.response?.data || err.message);

        // Handle specific OpenAI errors
        if (err.status === 401) {
            return res.status(401).json({
                error: 'Invalid API key',
                detail: 'Your OpenAI API key is invalid. Please check backend/.env and make sure you have a valid API key.'
            });
        }

        if (err.status === 429) {
            return res.status(429).json({
                error: 'Rate limit exceeded',
                detail: 'Too many requests. Please try again in a moment.'
            });
        }

        if (err.code === 'insufficient_quota') {
            return res.status(402).json({
                error: 'Insufficient quota',
                detail: 'Your OpenAI account has run out of credits. Please add credits at https://platform.openai.com/account/billing'
            });
        }

        return res.status(500).json({
            error: 'Failed to get response from model',
            detail: err.message || 'Unknown error occurred'
        });
    }
}
