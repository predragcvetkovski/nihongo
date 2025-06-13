import React, { useState, useRef, useCallback } from 'react';
import { PronunciationPracticeContentBlock, GeminiResponse } from '../types';
import { callGeminiAPIWithAudioAndText } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import { SpeakerWaveIcon, SparklesIcon } from '../constants'; 
import AudioPlayButton from './AudioPlayButton';


interface PronunciationPracticeProps {
  block: PronunciationPracticeContentBlock;
}

const PronunciationPractice: React.FC<PronunciationPracticeProps> = ({ block }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const defaultSystemInstruction = "You are a helpful Japanese pronunciation coach. The user was asked to pronounce a specific Japanese phrase. Based on their audio, provide a direct transcription of what they said, and then give concise, constructive, and encouraging feedback on their pronunciation compared to the target phrase. Focus on clarity, accuracy of sounds, and intonation if possible. Keep feedback to 2-3 short bullet points or a brief paragraph.";

  const startRecording = async () => {
    setError(null);
    setGeminiResponse(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          setIsLoading(true);
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); 
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = reader.result?.toString().split(',')[1];
            if (base64Audio) {
              const textPromptForContext = `The user is attempting to pronounce the Japanese phrase: "${block.targetPhraseJapanese}" (Romaji: ${block.targetPhraseRomaji}). Please analyze their audio.`;
              const response = await callGeminiAPIWithAudioAndText(
                textPromptForContext,
                base64Audio,
                'audio/webm', 
                block.geminiSystemInstruction || defaultSystemInstruction
              );
              if (response.error) {
                setError(response.error);
              } else {
                setGeminiResponse(response);
              }
            } else {
              setError("Could not process audio data.");
            }
            setIsLoading(false);
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
  
  const formatGeminiTextResponse = (text: string | undefined): React.ReactNode => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, index) => {
      let styledLine = line;
      if (line.toLowerCase().startsWith("transcription:")) {
        styledLine = `🎤 <strong class="font-semibold text-sky-300">Transcription:</strong> ${line.substring("transcription:".length).trim()}`;
      } else if (line.toLowerCase().startsWith("feedback:")) {
        styledLine = `💡 <strong class="font-semibold text-yellow-300">Feedback:</strong>`;
      } else if (line.trim().startsWith("-")) {
         styledLine = `<span class="ml-4">${line}</span>`; 
      }
      return <p key={index} dangerouslySetInnerHTML={{ __html: styledLine }} className="mb-1 text-gray-200" />;
    });
  };


  return (
    <div className="glassmorphic-card p-6 my-6 font-sans text-gray-100">
      <h4 className="text-lg font-semibold text-sky-300 mb-3 flex items-center">
        <SpeakerWaveIcon className="h-6 w-6 mr-2 text-blue-400" />
        {block.title || 'Pronunciation Practice'}
      </h4>
      <div className="p-3 bg-slate-800/40 rounded-lg mb-4 border border-slate-700">
        <p className="text-sm text-gray-300">{block.instructionText}</p>
      </div>
      
      <div className="my-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600 text-center">
        <p className="text-gray-300 text-md mb-1">Target Phrase:</p>
        <p className="text-3xl font-bold text-gray-50 font-japanese" lang="ja">{block.targetPhraseJapanese}
          <AudioPlayButton textToSpeak={block.targetPhraseJapanese} className="ml-2 inline-block align-middle text-sky-300 hover:text-sky-200" />
        </p>
        <p className="text-md text-sky-400">{block.targetPhraseRomaji}</p>
      </div>

      <div className="flex flex-col items-center space-y-4 mt-4">
        {!isRecording && !isLoading && (
          <button
            onClick={startRecording}
            className="w-full max-w-xs flex items-center justify-center bg-green-600 hover:bg-green-700 border border-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <SparklesIcon className="h-5 w-5 mr-2" /> Start Recording
          </button>
        )}
        {isRecording && (
          <button
            onClick={stopRecording}
            className="w-full max-w-xs flex items-center justify-center bg-red-600 hover:bg-red-700 border border-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <SpeakerWaveIcon className="h-5 w-5 mr-2 animate-pulse" /> Stop Recording
          </button>
        )}
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorDisplay message={error} />}

      {geminiResponse && geminiResponse.text && (
        <div className="mt-5 p-4 bg-slate-700/60 rounded-lg border border-slate-600">
          <h5 className="text-md font-semibold text-sky-300 mb-2">AI Feedback:</h5>
          <div className="text-gray-200 whitespace-pre-wrap leading-relaxed p-3 bg-black/30 rounded-md">
            {formatGeminiTextResponse(geminiResponse.text)}
          </div>
        </div>
      )}
    </div>
  );
};

export default PronunciationPractice;