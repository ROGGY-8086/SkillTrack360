import express, { Request, Response, Router } from 'express';
import {
  runComplexAnalysis,
  runQuickCalculation,
  runGeneralTask,
  runMultiTurnChat,
  runMapsGroundingSearch,
  generateSpeechTTS,
  startVideoGeneration,
  checkVideoStatus,
  downloadVideoBuffer,
} from './geminiService';

export const apiRouter = Router();

apiRouter.use(express.json({ limit: '25mb' }));

apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Gusto API Services' });
});

apiRouter.post('/gemini/analyze', async (req: Request, res: Response) => {
  try {
    const { prompt, contextData } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const result = await runComplexAnalysis(prompt, contextData);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/gemini/analyze:', error);
    res.status(500).json({ error: error.message || 'Failed to run complex analysis' });
  }
});

apiRouter.post('/gemini/quick', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const result = await runQuickCalculation(prompt);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/gemini/quick:', error);
    res.status(500).json({ error: error.message || 'Failed to run quick calculation' });
  }
});

apiRouter.post('/gemini/general', async (req: Request, res: Response) => {
  try {
    const { prompt, role } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const result = await runGeneralTask(prompt, role);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/gemini/general:', error);
    res.status(500).json({ error: error.message || 'Failed to run general assistant' });
  }
});

apiRouter.post('/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { messages, modelType, roleSystemInstruction } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid messages array is required' });
    }
    const result = await runMultiTurnChat(messages, modelType, roleSystemInstruction);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error);
    res.status(500).json({ error: error.message || 'Failed to process chat message' });
  }
});

apiRouter.post('/gemini/maps', async (req: Request, res: Response) => {
  try {
    const { query, location } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const result = await runMapsGroundingSearch(query, location);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/gemini/maps:', error);
    res.status(500).json({ error: error.message || 'Failed to run maps grounding search' });
  }
});

apiRouter.post('/gemini/tts', async (req: Request, res: Response) => {
  try {
    const { text, voice, style } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    const result = await generateSpeechTTS(text, voice, style);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/gemini/tts:', error);
    res.status(500).json({ error: error.message || 'Failed to synthesize speech' });
  }
});

apiRouter.post('/gemini/video', async (req: Request, res: Response) => {
  try {
    const { image, prompt, aspectRatio } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image is required for video generation' });
    }
    const result = await startVideoGeneration(image, prompt, aspectRatio || '16:9');
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/gemini/video:', error);
    res.status(500).json({ error: error.message || 'Failed to start video generation' });
  }
});

apiRouter.post('/gemini/video-status', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'OperationName is required' });
    }
    const result = await checkVideoStatus(operationName);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/gemini/video-status:', error);
    res.status(500).json({ error: error.message || 'Failed to check video status' });
  }
});

apiRouter.post('/gemini/video-download', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'OperationName is required' });
    }
    const buffer = await downloadVideoBuffer(operationName);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'inline; filename="gusto-celebration.mp4"');
    res.send(buffer);
  } catch (error: any) {
    console.error('Error in /api/gemini/video-download:', error);
    res.status(500).json({ error: error.message || 'Failed to download video' });
  }
});
