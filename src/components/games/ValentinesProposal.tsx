import { useState, useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

// 18 images repeated to make 36
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

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 80;
    const randomLeft = Math.random() * 80;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  useEffect(() => {
    if (step < 2) {
      // Change step after 5 seconds
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  // Auto-play winner music when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch((error) => {
        console.log("Error al reproducir audio:", error);
      });
    }
  }, [volume]);

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

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(3);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Audio player for winner music */}
      <audio ref={audioRef} src="/music/winner.mp3" loop preload="auto" />

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

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h2
            key="step-0"
            className={`text-4xl font-semibold mb-4 ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ¡Felicidades! Has completado el juego.
          </motion.h2>
        )}
        {step === 1 && (
          <motion.h2
            key="step-1"
            className={`text-4xl font-semibold mb-4 ${playfairDisplay.className}`}
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ¡Tengo una sorpresa para ti!
          </motion.h2>
        )}
        {step === 2 && (
          <motion.div
            key="step-2"
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            {/* Image Grid Background */}
            <div className="absolute inset-0 grid grid-cols-6 opacity-10">
              {images.slice(0, 36).map((src, index) => (
                <div key={index} className="relative h-full">
                  <Image
                    src={src}
                    alt={`Memory ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <h2
              className={`text-5xl font-semibold mb-8 ${playfairDisplay.className}`}
            >
              ¿Quieres celebrar nuestro primer mes juntos?
            </h2>
            <Image
              src="/sad_hamster.png"
              alt="Sad Hamster"
              width={200}
              height={200}
            />
            <div className="flex space-x-4 mt-10">
              <button
                className="btn-ofrenda px-6 py-3 text-base normal-case tracking-normal"
                onClick={handleYesClick}
              >
                ¡Sí, claro! 🥰
              </button>
              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-95 transition-all duration-300 shadow-lg"
                style={
                  position
                    ? {
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                      }
                    : {}
                }
                onMouseEnter={() => setPosition(getRandomPosition())}
              >
                No quiero 😢
              </button>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step-3"
            className={`text-4xl font-semibold mb-4 flex flex-col justify-center items-center ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ¡Gracias por aceptar, te amo mucho! 💕
            <p className="text-sm mt-4">¡Feliz primer mes juntos! 💌</p>
            <Image
              src="/hamster_jumping.gif"
              alt="Hamster Feliz"
              width={200}
              height={200}
              unoptimized
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="absolute w-full h-full">
          <Fireworks
            options={{
              autoresize: true,
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
