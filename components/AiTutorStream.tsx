import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AiTutorStreamContentBlock, ChatMessage } from '../types';
import { createChatSession, sendChatMessageStream } from '../services/geminiService';
import { Chat, Part } from '@google/genai';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import { SparklesIcon, MicrophoneIcon, PaperAirplaneIcon } from '../constants'; // Changed SpeakerWaveIcon to MicrophoneIcon
import AudioPlayButton from './AudioPlayButton';

interface AiTutorStreamProps {
  block: AiTutorStreamContentBlock;
}

const AiTutorStream: React.FC<AiTutorStreamProps> = ({ block }) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInputText, setUserInputText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatInstanceRef = useRef<Chat | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      chatInstanceRef.current = createChatSession(block.initialSystemPrompt);
      setChatHistory([]); // Clear history when block (and thus system prompt) changes
    } catch (e: any) {
      setError(`Failed to initialize AI Tutor: ${e.message}`);
    }
  }, [block.initialSystemPrompt]);

  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const addMessageToHistory = (message: Omit<ChatMessage, 'id'>) => {
    setChatHistory(prev => [...prev, { ...message, id: Date.now().toString() + Math.random().toString(16) }]);
  };
  
  const updateLastAiMessage = (chunkText: string) => {
    setChatHistory(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage && lastMessage.sender === 'ai' && !lastMessage.isError) {
        return [
          ...prev.slice(0, -1),
          { ...lastMessage, text: (lastMessage.text || '') + chunkText, isThinking: false }
        ];
      }
      return prev; // Should not happen if we add a thinking message first
    });
  };

  const handleSend = async (messageParts: (string | Part)[], userMessageText?: string, userAudioUrl?: string) => {
    if (!chatInstanceRef.current) {
      setError("Chat session not initialized.");
      return;
    }
    if (userMessageText || userAudioUrl) {
      addMessageToHistory({ sender: 'user', text: userMessageText, audioUrl: userAudioUrl });
    }
    
    setUserInputText('');
    setIsLoadingAiResponse(true);
    setError(null);

    // Add a temporary "thinking" message for AI
    const thinkingMessageId = Date.now().toString();
    setChatHistory(prev => [...prev, { id: thinkingMessageId, sender: 'ai', text: '', isThinking: true }]);

    await sendChatMessageStream(
      chatInstanceRef.current,
      messageParts,
      (chunkText) => { // onChunk
        setChatHistory(prev => {
          const lastMsgIndex = prev.findIndex(msg => msg.id === thinkingMessageId);
          if (lastMsgIndex !== -1) {
            const updatedHistory = [...prev];
            updatedHistory[lastMsgIndex] = {
              ...updatedHistory[lastMsgIndex],
              text: (updatedHistory[lastMsgIndex].text || '') + chunkText,
              isThinking: false, // Mark as not thinking once first chunk arrives
            };
            return updatedHistory;
          }
          return prev; // Should not happen
        });
      },
      () => { // onEnd
        setIsLoadingAiResponse(false);
        // Ensure the thinking state is removed if no chunks were received (e.g. empty response)
        setChatHistory(prev => prev.map(msg => msg.id === thinkingMessageId ? { ...msg, isThinking: false } : msg));
      },
      (errorMessage) => { // onError
        setError(errorMessage);
        setChatHistory(prev => prev.map(msg => msg.id === thinkingMessageId ? { ...msg, text: `Error: ${errorMessage}`, isError: true, isThinking: false } : msg));
        setIsLoadingAiResponse(false);
      }
    );
  };

  const handleSendTextMessage = () => {
    if (!userInputText.trim()) return;
    handleSend([{ text: userInputText }], userInputText.trim());
  };

  const startRecording = async () => {
    setError(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = reader.result?.toString().split(',')[1];
            const audioUrl = reader.result as string; // For local playback
            if (base64Audio) {
              const audioPart: Part = { inlineData: { mimeType: 'audio/webm', data: base64Audio } };
              const instructionPart: Part = { text: "User sent an audio message. Transcribe it, then respond to their utterance in Japanese based on our ongoing conversation and your role as a Japanese tutor. Provide Romaji and English translations as per your system instructions." };
              handleSend([instructionPart, audioPart], "[My Voice Message]", audioUrl);
            } else {
              setError("Could not process audio data.");
            }
          };
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setError("Could not access microphone. Please check permissions.");
        setIsRecording(false);
      }
    } else {
      setError("Audio recording is not supported by your browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="glassmorphic-card p-4 sm:p-6 my-6 font-sans text-gray-100 flex flex-col max-h-[70vh]">
      <h4 className="text-lg font-semibold text-sky-300 mb-3 flex items-center flex-shrink-0">
        <SparklesIcon className="h-6 w-6 mr-2 text-yellow-400" />
        {block.title || 'AI Tutor Stream'} 
      </h4>
      
      <div className="flex-grow overflow-y-auto mb-4 p-2 space-y-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
        {chatHistory.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-xl shadow-md ${
              msg.sender === 'user' 
                ? 'bg-sky-600/80 text-white rounded-br-none' 
                : (msg.isError ? 'bg-red-700/70 text-red-100 rounded-bl-none' : 'bg-slate-600/70 text-gray-200 rounded-bl-none')
            }`}>
              {msg.audioUrl && msg.sender === 'user' && (
                <div className="mb-1">
                  <audio controls src={msg.audioUrl} className="w-full h-10"></audio>
                  <p className="text-xs text-sky-200 italic">{msg.text}</p>
                </div>
              )}
              {msg.text && !msg.audioUrl && <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</div>}
              {msg.sender === 'ai' && msg.isThinking && <LoadingSpinner />}
              {msg.sender === 'ai' && !msg.isError && !msg.isThinking && msg.text && (
                 <AudioPlayButton textToSpeak={msg.text.replace(/<[^>]*>/g, '')} className="mt-1 text-sky-400 hover:text-sky-200" />
              )}
            </div>
          </div>
        ))}
        <div ref={chatMessagesEndRef} />
      </div>

      {error && <ErrorDisplay message={error} />}

      <div className="flex-shrink-0 mt-auto pt-2 border-t border-slate-700/50">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={userInputText}
            onChange={(e) => setUserInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoadingAiResponse && handleSendTextMessage()}
            placeholder={block.placeholderText || "Type in Japanese or English..."}
            className="flex-grow p-3 bg-slate-700/60 border border-slate-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow font-japanese"
            disabled={isLoadingAiResponse || isRecording}
            lang="ja"
          />
          <button
            onClick={handleSendTextMessage}
            disabled={isLoadingAiResponse || isRecording || !userInputText.trim()}
            className="p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors disabled:bg-slate-500"
            aria-label="Send text message"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoadingAiResponse}
            className={`p-3 rounded-lg transition-colors text-white ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-green-500 hover:bg-green-600'
            } disabled:bg-slate-500`}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            <MicrophoneIcon className="h-5 w-5" /> {/* Changed Icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiTutorStream;