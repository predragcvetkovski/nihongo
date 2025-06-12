
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_API_MODEL } from '../constants';
import { GeminiResponse } from "../types";

const getApiKey = (): string | undefined => {
  // In a real build setup (Vite, CRA), environment variables are prefixed.
  // e.g., process.env.REACT_APP_API_KEY or process.env.VITE_API_KEY
  // For this exercise, we directly use process.env.API_KEY as per instructions.
  return process.env.API_KEY;
};

export const callGeminiAPI = async (prompt: string, isJsonOutput: boolean = false): Promise<GeminiResponse> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { error: "API Key not found. Please ensure it's set in your environment variables." };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const generationConfig = isJsonOutput ? { responseMimeType: "application/json" } : {};

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_API_MODEL,
        contents: prompt,
        ...(Object.keys(generationConfig).length > 0 && { config: generationConfig })
    });

    let textOutput = response.text;
    let jsonParsedOutput: any = null;

    if (isJsonOutput) {
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = textOutput.match(fenceRegex);
      if (match && match[2]) {
        textOutput = match[2].trim();
      }
      try {
        jsonParsedOutput = JSON.parse(textOutput);
      } catch (e) {
        console.error("Failed to parse JSON response from Gemini:", e);
        return { error: `Failed to parse JSON response: ${ (e as Error).message }. Raw response: ${textOutput}` };
      }
    }
    
    return { text: !isJsonOutput ? textOutput : undefined, json: jsonParsedOutput };

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    // Try to get a more specific error message if available
    const message = error.message || (error.toString ? error.toString() : "An unknown error occurred with the Gemini API.");
    return { error: message };
  }
};
