import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (optional - will work without it)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/umar-ai';
if (process.env.MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('✅ MongoDB connected successfully'))
        .catch(err => console.log('⚠️  MongoDB not connected (auth features disabled):', err.message));
} else {
    console.log('⚠️  MONGODB_URI not set - authentication features will be disabled');
    console.log('   Add MONGODB_URI to .env to enable user authentication');
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Umar-AI backend listening on http://localhost:${PORT}`));

