'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  autoPlay?: boolean;
}

export default function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => setReady(true);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  useEffect(() => {
    if (!autoPlay || !ready) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    audio.play().catch(() => setPlaying(false));
  }, [autoPlay, ready]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.4;
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  return (
    <>
      {/* Place your song at /public/wedding-song.mp3 */}
      <audio ref={audioRef} src="/wedding-song.mp3" loop preload="auto" />

      <button
        onClick={toggle}
        aria-label={playing ? 'Mute music' : 'Play music'}
        title={playing ? 'Mute music' : 'Play music'}
        className="fixed bottom-5 right-5 z-[900] w-12 h-12 rounded-full flex items-center justify-center bg-[#6b1f2e]/95 hover:bg-[#6b1f2e] border border-[#c9a86a]/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 soft-pulse"
      >
        {/* Vinyl disc — spins while playing */}
        <span
          className={`absolute inset-0 m-auto w-9 h-9 rounded-full bg-[#1a0a10] flex items-center justify-center ${
            playing ? 'vinyl-spin' : ''
          }`}
        >
          <span className="absolute inset-1 rounded-full border border-[#c9a86a]/30" />
          <span className="absolute inset-2.5 rounded-full border border-[#c9a86a]/20" />
        </span>

        {/* Icon overlay — always visible */}
        <span className="relative z-10 flex items-center justify-center text-[#c9a86a]">
          {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </span>
      </button>
    </>
  );
}