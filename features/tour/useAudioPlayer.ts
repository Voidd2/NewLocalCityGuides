'use client';
import { useRef, useState, useCallback, useEffect } from 'react';

export interface AudioPlayerState {
  playing: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  url: string | null;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    playing: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    url: null,
  });

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      const audio = audioRef.current;
      audio.addEventListener('timeupdate', () => {
        setState((s) => ({
          ...s,
          currentTime: audio.currentTime,
          progress: audio.duration ? audio.currentTime / audio.duration : 0,
        }));
      });
      audio.addEventListener('durationchange', () => {
        setState((s) => ({ ...s, duration: audio.duration }));
      });
      audio.addEventListener('ended', () => setState((s) => ({ ...s, playing: false })));
    }
    return audioRef.current;
  }, []);

  const load = useCallback(
    (url: string) => {
      const audio = getAudio();
      if (audio.src !== url) {
        audio.src = url;
        audio.load();
        setState((s) => ({ ...s, url, currentTime: 0, progress: 0, duration: 0, playing: false }));
      }
    },
    [getAudio]
  );

  const play = useCallback(async () => {
    const audio = getAudio();
    await audio.play();
    setState((s) => ({ ...s, playing: true }));
  }, [getAudio]);

  const pause = useCallback(() => {
    const audio = getAudio();
    audio.pause();
    setState((s) => ({ ...s, playing: false }));
  }, [getAudio]);

  const seek = useCallback(
    (progress: number) => {
      const audio = getAudio();
      if (audio.duration) audio.currentTime = audio.duration * progress;
    },
    [getAudio]
  );

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  return { state, load, play, pause, seek };
}
