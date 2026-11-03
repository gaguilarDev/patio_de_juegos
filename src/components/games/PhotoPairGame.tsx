"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// 18 images
const images = [
  "/game-photos/1.png",
  "/game-photos/2.png",
  "/game-photos/3.png",
  "/game-photos/4.png",
  "/game-photos/5.png",
  "/game-photos/6.png",
  "/game-photos/7.png",
  "/game-photos/8.png",
  "/game-photos/9.png",
  "/game-photos/10.png",
  "/game-photos/11.png",
  "/game-photos/12.png",
  "/game-photos/13.png",
  "/game-photos/14.png",
  "/game-photos/15.png",
  "/game-photos/16.png",
  "/game-photos/17.png",
  "/game-photos/18.png",
];

// Create 18 pairs of images (36 images in total)
const imagePairs = images.flatMap((image) => [image, image]);

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type ValentinesProposalProps = {
  handleShowProposal: () => void;
};

export default function PhotoPairGame({
  handleShowProposal,
}: ValentinesProposalProps) {
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Shuffle the images when the component mounts
    setImages(shuffleArray([...imagePairs]));
  }, []);

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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleClick = (index: number) => {
    // Prevent clicks while checking or if already selected/matched
    if (
      isChecking ||
      selected.includes(index) ||
      matched.includes(index) ||
      selected.length >= 2
    )
      return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    // Check if we have two cards selected
    if (newSelected.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = newSelected;

      if (images[firstIndex] === images[secondIndex]) {
        // Match found
        setTimeout(() => {
          setMatched((prev) => [...prev, firstIndex, secondIndex]);
          setSelected([]);
          setIsChecking(false);
        }, 600);
      } else {
        // No match - show cards for 1 second, then show red effect, then flip back
        setTimeout(() => {
          setIncorrect([firstIndex, secondIndex]);
          setTimeout(() => {
            setIncorrect([]);
            setSelected([]);
            setIsChecking(false);
          }, 600); // Red effect duration
        }, 1000); // Time to see the cards before red effect
      }
    }
  };

  // Check if game is won
  useEffect(() => {
    if (matched.length === imagePairs.length) {
      // Detener la música
      if (audioRef.current) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      }
      handleShowProposal();
    }
  }, [matched, handleShowProposal]);

  return (
    <>
      {/* Audio player */}
      <audio ref={audioRef} src="/music/background.mp3" loop preload="auto" />

      {/* Music controls */}
      <div
        className="fixed top-5 right-5 z-50 flex items-center gap-2"
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
              background: `linear-gradient(to right, rgb(236 72 153) 0%, rgb(236 72 153) ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`,
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

      <div className="grid grid-cols-9 gap-2">
        {/* Image preload */}
        <div className="hidden">
          {images.map((image, i) => (
            <Image key={i} src={image} alt="" width={80} height={80} priority />
          ))}
        </div>

        {heartLayout.flat().map((index, i) =>
          index !== null ? (
            <motion.div
              key={i}
              className="w-20 h-20 relative cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={() => handleClick(index)}
              style={{ perspective: "1000px" }} // Add perspective for 3D effect
            >
              {/* Back of the card */}
              {!selected.includes(index) && !matched.includes(index) && (
                <motion.div
                  className="w-full h-full bg-gray-300 rounded-md absolute"
                  initial={{ rotateY: 0 }}
                  animate={{
                    rotateY:
                      selected.includes(index) || matched.includes(index)
                        ? 180
                        : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ backfaceVisibility: "hidden" }}
                />
              )}

              {/* Front of the card (image) */}
              {(selected.includes(index) || matched.includes(index)) && (
                <motion.div
                  className="w-full h-full absolute"
                  initial={{ rotateY: -180 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src={images[index]}
                    alt={`Imagen ${index + 1}`}
                    fill
                    className="rounded-md object-cover"
                  />
                </motion.div>
              )}

              {/* Incorrect animation */}
              {incorrect.includes(index) && (
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full bg-red-500 rounded-md"></div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <div key={i} className="w-20 h-20"></div>
          ),
        )}
      </div>
    </>
  );
}
