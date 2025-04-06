import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();
const port = 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
  },
  systemInstruction:
    'You are an expert in career guidance for young and enthusiastic women in the field of technology.',
});

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    res.json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: 'Server error. Try again later.' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
