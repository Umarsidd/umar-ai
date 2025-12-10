import express from 'express';
import { handleChat } from '../controllers/chatController.js';

const router = express.Router();

// POST /api/chat
// body: { messages: [{role: 'user'|'assistant'|'system', content: '...'}], max_tokens?, temperature?, model? }
router.post('/chat', handleChat);

export default router;
