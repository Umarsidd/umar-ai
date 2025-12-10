# Umar-AI — Full ChatGPT-like Project (Frontend + Backend)

A ChatGPT-style web application with Node.js + Express backend and React + Vite + Tailwind frontend.

## Project Structure

```
umar-ai/
├── backend/          # Node.js + Express API
├── frontend/         # React + Vite + Tailwind UI
└── README.md
```

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# Create .env file with VITE_BACKEND_URL=http://localhost:4001
npm run dev
```

Open `http://localhost:5173` in your browser.

## Features
- ChatGPT-style UI
- OpenAI API integration
- Real-time chat interface
- Message history
- Responsive design

## Deployment
- Backend: Render, Railway, or Heroku
- Frontend: Vercel or Netlify

## License
This project is for learning and prototyping. Ensure compliance with API terms of service.
