import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Hook universal untuk memutar dan mengontrol musik latar undangan
 * @param {string} musicUrl - URL file audio .mp3
 * @returns {{ isPlaying: boolean, togglePlay: () => void, play: () => void, pause: () => void }}
 */
export function useMusicPlayer(musicUrl) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!musicUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
    } else {
      audioRef.current.src = musicUrl;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicUrl]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return { isPlaying, togglePlay, play, pause };
}
