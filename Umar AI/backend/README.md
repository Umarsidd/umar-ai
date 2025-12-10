# Umar AI Backend

Node.js + Express backend that proxies requests to OpenAI's API.

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   MODEL=gpt-4o
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:4001`.

## API Endpoints

### POST /api/chat

Send a chat message and receive AI response.

**Request body:**
```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello!" }
  ],
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**Response:**
```json
{
  "reply": "Hello! How can I help you today?",
  "raw": { ... }
}
```
