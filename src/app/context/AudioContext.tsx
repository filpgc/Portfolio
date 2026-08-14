"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
} from "react";

type AudioContextValue = {
  markAsActive: (audio: HTMLAudioElement) => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const activeAudioRef = useRef<HTMLAudioElement>(null);

  function markAsActive(audio: HTMLAudioElement) {
    if (activeAudioRef.current !== audio) {
      activeAudioRef.current?.pause();
      activeAudioRef.current = audio;
    }
  }

  return <AudioContext value={{ markAsActive }}>{children}</AudioContext>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }

  return context;
}
