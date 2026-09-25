import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || '';

export const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function runComplexAnalysis(prompt: string, contextData?: any) {
  const content = contextData 
    ? `Analyze the following payroll and business data with extreme precision:\nContext: ${JSON.stringify(contextData)}\n\nPrompt: ${prompt}`
    : prompt;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: content,
    config: {
      systemInstruction: 'You are Gusto\'s Chief Compliance & Payroll Optimization AI. You provide clear, actionable, high-value financial, tax credit, and HR insights for small business founders.',
    },
  });

  return {
    text: response.text || 'Analysis completed with no text output.',
    model: 'gemini-3.1-pro-preview'
  };
}

export async function runQuickCalculation(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: prompt,
    config: {
      systemInstruction: 'You are a lightning-fast Gusto payroll math and compensation estimation assistant. Provide instant calculations, withholding breakdowns, and concise bullet answers.',
    },
  });

  return {
    text: response.text || '',
    model: 'gemini-3.1-flash-lite'
  };
}

export async function runGeneralTask(prompt: string, role = 'general') {
  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: prompt,
    config: {
      systemInstruction: 'You are Gusto\'s friendly and empathetic People Advisory assistant. Provide supportive, professional guidance on workplace policies, employee benefits, onboarding, and contractor relations.',
    },
  });

  return {
    text: response.text || '',
    model: 'gemini-3.5-flash'
  };
}

export async function runMultiTurnChat(
  messages: Array<{ role: 'user' | 'model'; text: string }>,
  modelType: 'complex' | 'general' | 'fast' = 'general',
  roleSystemInstruction?: string
) {
  let model = 'gemini-3.5-flash';
  if (modelType === 'complex') {
    model = 'gemini-3.1-pro-preview';
  } else if (modelType === 'fast') {
    model = 'gemini-3.1-flash-lite';
  }

  const systemInstruction =
    roleSystemInstruction ||
    "You are Gusto Copilot, an intelligent, empathetic AI partner for small business owners and HR managers. You assist with payroll scheduling, salary planning, tax compliance, benefits, PTO policies, and employee relations. Always give concise, accurate, and constructive answers formatted with clean Markdown headings and bullet points.";

  const contents = messages.map((msg) => ({
    role: msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.text }],
  }));

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction,
    },
  });

  return {
    text: response.text || '',
    model,
  };
}

export async function runMapsGroundingSearch(query: string, location?: { lat: number; lng: number }) {
  const config: any = {
    tools: [{ googleMaps: {} }],
  };

  if (location && location.lat && location.lng) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: location.lat,
          longitude: location.lng,
        },
      },
    };
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: query,
    config,
  });

  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  // Extract all relevant map places & review snippets
  const mapSources: Array<{ title: string; uri: string; snippet?: string }> = [];
  for (const chunk of chunks) {
    if (chunk.maps) {
      const rawSnippet = chunk.maps.placeAnswerSources?.reviewSnippets?.[0];
      const snippetText = typeof rawSnippet === 'string'
        ? rawSnippet
        : (rawSnippet as any)?.content || (rawSnippet as any)?.snippet || (rawSnippet as any)?.text || undefined;

      mapSources.push({
        title: chunk.maps.title || 'Google Maps Location',
        uri: chunk.maps.uri || '',
        snippet: snippetText,
      });
    }
  }

  return {
    text: response.text || '',
    mapSources,
    model: 'gemini-3.5-flash'
  };
}

export async function generateSpeechTTS(text: string, voice = 'Kore', style?: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash-tts',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text,
            speechMetadata: {
              style: style || 'Clear, warm, professional executive spokesperson for Gusto payroll and team updates',
            },
          },
        ],
      },
    ],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voice },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  return {
    audioData: base64Audio || null,
    model: 'gemini-3.8-flash-tts',
  };
}

export async function startVideoGeneration(base64Image: string, prompt?: string, aspectRatio: '16:9' | '9:16' = '16:9') {
  // Strip data URL header if present
  let cleanBase64 = base64Image;
  let mimeType = 'image/jpeg';
  if (base64Image.includes(';base64,')) {
    const parts = base64Image.split(';base64,');
    cleanBase64 = parts[1];
    mimeType = parts[0].replace('data:', '') || 'image/jpeg';
  }

  // Model selection: Try 'veo-3.1-fast-generate-preview' or 'veo-3.1-lite-generate-preview'
  let operation;
  try {
    operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'A joyful small business celebration video with dynamic motion and smiling team members',
      image: {
        imageBytes: cleanBase64,
        mimeType,
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio,
      },
    });
  } catch (err: any) {
    console.warn('veo-3.1-fast-generate-preview fallback to veo-3.1-lite-generate-preview:', err?.message);
    operation = await ai.models.generateVideos({
      model: 'veo-3.1-lite-generate-preview',
      prompt: prompt || 'A joyful small business celebration video with dynamic motion and smiling team members',
      image: {
        imageBytes: cleanBase64,
        mimeType,
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio,
      },
    });
  }

  return {
    operationName: operation.name,
  };
}

export async function checkVideoStatus(operationName: string) {
  const op = new GenerateVideosOperation();
  op.name = operationName;
  const updated = await ai.operations.getVideosOperation({ operation: op });
  return {
    done: Boolean(updated.done),
    error: updated.error || null,
  };
}

export async function downloadVideoBuffer(operationName: string) {
  const op = new GenerateVideosOperation();
  op.name = operationName;
  const updated = await ai.operations.getVideosOperation({ operation: op });
  const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
  if (!uri) {
    throw new Error('Video generation has not completed or URI is not available.');
  }

  const videoRes = await fetch(uri, {
    headers: { 'x-goog-api-key': apiKey },
  });

  if (!videoRes.ok) {
    throw new Error(`Failed to download video from upstream: ${videoRes.statusText}`);
  }

  const arrayBuffer = await videoRes.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
