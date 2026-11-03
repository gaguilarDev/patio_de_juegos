"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

type MusicPlayerProps = {
  audioSrc: string;
  autoPlay?: boolean;
  loop?: boolean;
};

export default function MusicPlayer({
  audioSrc,
  autoPlay = false,
  loop = true,
}: MusicPlayerProps) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(autoPlay);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (autoPlay) {
        audioRef.current.play().catch((error) => {
          console.log("Error al reproducir audio:", error);
        });
      }
    }
  }, [volume, autoPlay]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Error al reproducir audio:", error);
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop={loop} preload="auto" />

      <div
        className="fixed right-5 top-9 z-50 flex items-center gap-2"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {/* Volume slider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: showVolumeSlider ? 120 : 0,
            opacity: showVolumeSlider ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, rgb(232 93 4) 0%, rgb(232 93 4) ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`,
            }}
          />
        </motion.div>

        {/* Music toggle button */}
        <button
          onClick={toggleMusic}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300"
          aria-label="Toggle music"
        >
          {isMusicPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
