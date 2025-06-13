
import { GoogleGenAI, GenerateContentResponse, Part, Chat } from "@google/genai";
import { GEMINI_API_MODEL } from '../constants';
import { GeminiResponse } from "../types";

const getApiKey = (): string | undefined => {
  return process.env.API_KEY;
};

// Helper function to simplify error messages
function simplifyErrorMessage(originalError: any, context: 'api' | 'chat'): string {
  let userFriendlyMessage = "Our computer friend is having a little think and got stuck. Maybe try again in a jiffy!";
  const genericOops = "Oopsie! ";
  const tryLater = "Let's try again in a little bit, okay?";

  if (originalError && originalError.message) {
    const msg = originalError.message.toLowerCase();

    if (msg.includes("api key not found") || msg.includes("api_key") || msg.includes("permission denied") || msg.includes("forbidden") || msg.includes("unauthorized") || msg.includes("401") || msg.includes("403")) {
      userFriendlyMessage = `${genericOops}The secret code to talk to our helper isn't quite right. A grown-up might need to check it!`;
    } else if (msg.includes("deadline exceeded") || msg.includes("timeout")) {
      userFriendlyMessage = `${genericOops}Our helper took too long to think! ${tryLater}`;
    } else if (msg.includes("internal server error") || msg.includes("500") || msg.includes("server error")) {
      userFriendlyMessage = `${genericOops}Our helper's computer has a tummy ache. ${tryLater}`;
    } else if (msg.includes("service unavailable") || msg.includes("503")) {
      userFriendlyMessage = `${genericOops}Our helper is super busy right now or taking a nap. ${tryLater}`;
    } else if (msg.includes("bad request") || msg.includes("400") || msg.includes("invalid argument") || msg.includes("invalid content")) {
        userFriendlyMessage = `${genericOops}Hmm, our helper didn't quite understand that. Can you try asking a different way?`;
    } else if (msg.includes("quota") || msg.includes("resource exhausted") || msg.includes("429")) {
        userFriendlyMessage = `${genericOops}Whoa, that's a lot of questions! Our helper needs a tiny break. ${tryLater}`;
    } else if (msg.includes("network error") || msg.includes("failed to fetch") || msg.includes("unavailable")) {
      userFriendlyMessage = `${genericOops}We couldn't send your message to our helper. Is the internet playing hide and seek? ${tryLater}`;
    } else if (msg.includes("[google.rpc.errorinfo]")) { // Specific Google API error details
      if (msg.includes("billing account")) {
        userFriendlyMessage = `${genericOops}There's a little problem with the grown-up's piggy bank for our helper. They might need to check it.`;
      } else if (msg.includes("api not enabled")) {
        userFriendlyMessage = `${genericOops}Our helper isn't allowed to play this game yet. A grown-up might need to switch it on!`;
      }
    } else if (msg.includes("model not found") || msg.includes("404")){
        userFriendlyMessage = `${genericOops}We couldn't find the right helper brain for this. Maybe try again later?`;
    }
  }
  
  // Append context if it's a chat error and not already too specific
  if (context === 'chat' && userFriendlyMessage === "Our computer friend is having a little think and got stuck. Maybe try again in a jiffy!") {
    userFriendlyMessage = `${genericOops}The chat had a little problem. ${tryLater}`;
  }

  return userFriendlyMessage;
}


export const callGeminiAPI = async (prompt: string, isJsonOutput: boolean = false): Promise<GeminiResponse> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { error: simplifyErrorMessage({ message: "API Key not found" }, 'api') };
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

    if (isJsonOutput && textOutput) {
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = textOutput.match(fenceRegex);
      if (match && match[2]) {
        textOutput = match[2].trim();
      }
      try {
        jsonParsedOutput = JSON.parse(textOutput);
      } catch (e) {
        console.error("Failed to parse JSON response from Gemini:", e);
        // Provide the simplified error for parsing failure too.
        return { error: simplifyErrorMessage({ message: `Failed to understand the helper's special message.` }, 'api') };
      }
    }
    
    return { text: !isJsonOutput ? textOutput : undefined, json: jsonParsedOutput };

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    const simplifiedError = simplifyErrorMessage(error, 'api');
    return { error: simplifiedError };
  }
};

export const callGeminiAPIWithAudioAndText = async (
  textPrompt: string,
  audioBase64: string,
  audioMimeType: string,
  systemInstruction?: string
): Promise<GeminiResponse> => {
  const apiKey = getApiKey();
  if (!apiKey) {
     return { error: simplifyErrorMessage({ message: "API Key not found" }, 'api') };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const textPart: Part = { text: textPrompt };
    const audioPart: Part = {
      inlineData: {
        mimeType: audioMimeType,
        data: audioBase64,
      },
    };

    const config: any = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_API_MODEL, 
      contents: { parts: [textPart, audioPart] },
      ...(Object.keys(config).length > 0 && { config })
    });
    
    return { text: response.text };

  } catch (error: any) {
    console.error("Error calling Gemini API with audio:", error);
    const simplifiedError = simplifyErrorMessage(error, 'api');
    return { error: simplifiedError };
  }
};


// --- New functions for AI Tutor Stream (Chat) ---

let globalAiInstance: GoogleGenAI | null = null;

const getAiInstance = (): GoogleGenAI => {
  if (!globalAiInstance) {
    const apiKey = getApiKey();
    if (!apiKey) {
      // This error will be caught by the calling function and simplified
      throw new Error("API Key not found for AI Tutor Stream.");
    }
    globalAiInstance = new GoogleGenAI({ apiKey });
  }
  return globalAiInstance;
};

export const createChatSession = (systemInstruction: string): Chat => {
  const ai = getAiInstance(); // This might throw if API key is missing
  return ai.chats.create({
    model: GEMINI_API_MODEL,
    config: {
      systemInstruction: systemInstruction,
    },
  });
};

export const sendChatMessageStream = async (
  chat: Chat,
  messageParts: (string | Part)[],
  onChunk: (chunkText: string) => void,
  onEnd: () => void,
  onError: (errorMessage: string) => void
): Promise<void> => {
  try {
    const result = await chat.sendMessageStream({ message: messageParts });
    let receivedContent = false;
    for await (const chunk of result) {
      if (chunk.text) {
        receivedContent = true;
        onChunk(chunk.text);
      }
    }
    // If the stream ends without any content, but also no error from the SDK.
    // This could be a valid empty response or an issue the SDK didn't flag as an error.
    if (!receivedContent) {
        // console.warn("Chat stream ended without any text chunks.");
        // Depending on desired behavior, could treat as an error or just let it be.
        // For now, let onEnd handle it, but if AI consistently returns nothing, this could be a point of interest.
    }
    onEnd();
  } catch (error: any) {
    console.error("Error sending chat message stream:", error);
    const simplifiedError = simplifyErrorMessage(error, 'chat');
    onError(simplifiedError);
    onEnd(); // Ensure loading state is cleared
  }
};
