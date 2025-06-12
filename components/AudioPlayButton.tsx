import React, { useState, useCallback } from 'react';
import { SpeakerWaveIcon } from '../constants';

interface AudioPlayButtonProps {
  textToSpeak: string;
  lang?: string; // ISO language code, e.g., 'ja-JP'
  className?: string;
}

const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({ textToSpeak, lang = 'ja-JP', className }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = useCallback(() => {
    if (!textToSpeak || typeof window.speechSynthesis === 'undefined') {
      console.warn('Speech synthesis not supported or no text to speak.');
      alert('Sorry, your browser does not support text-to-speech, or there is no audio for this item.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang;

    // Attempt to find a Japanese voice
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find(voice => voice.lang === lang || voice.lang.startsWith('ja'));
    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    } else {
        console.warn(`No Japanese voice found for lang ${lang}. Using default voice.`);
    }
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setIsPlaying(false);
      alert(`Could not play audio: ${event.error}`);
    };

    window.speechSynthesis.speak(utterance);
  }, [textToSpeak, lang]);

  // Ensure voices are loaded (some browsers load them asynchronously)
  useState(() => {
    if (typeof window.speechSynthesis !== 'undefined' && window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            // Voices loaded, component will re-render if needed or next click will use them
        };
    }
  });


  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent card clicks or other parent actions
        playAudio();
      }}
      className={`p-1.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors ${isPlaying ? 'text-sky-200 animate-pulse' : 'text-sky-300'} ${className}`}
      aria-label={`Listen to ${textToSpeak}`}
      title={`Listen to "${textToSpeak}"`}
    >
      <SpeakerWaveIcon className="h-5 w-5" />
    </button>
  );
};

export default AudioPlayButton;