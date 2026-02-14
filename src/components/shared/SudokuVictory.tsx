"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import MusicPlayer from "./MusicPlayer";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

// Floating heart component
const FloatingHeart = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100;
  const randomDuration = 3 + Math.random() * 4;
  const randomSize = 20 + Math.random() * 30;
  const hearts = ["💕", "💖", "💗", "💝", "💓", "💞", "❤️", "🩷"];
  const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];

  return (
    <motion.div
      initial={{ y: "100vh", x: `${randomX}vw`, opacity: 0 }}
      animate={{
        y: "-20vh",
        opacity: [0, 1, 1, 0],
        rotate: [0, 360],
        scale: [0.8, 1, 1, 0.8],
      }}
      transition={{
        duration: randomDuration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute pointer-events-none"
      style={{ fontSize: `${randomSize}px` }}
    >
      {randomHeart}
    </motion.div>
  );
};

// Confetti particle component
const ConfettiParticle = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100;
  const randomRotation = Math.random() * 360;
  const randomDuration = 2 + Math.random() * 3;
  const colors = ["#f43f5e", "#e11d48", "#be123c", "#fda4af", "#fb7185", "#ff6b9d"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const shapes = ["⭐", "✨", "🌟", "💫", "🌹"];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

  return (
    <motion.div
      initial={{ y: -20, x: `${randomX}vw`, opacity: 1, rotate: randomRotation }}
      animate={{
        y: "100vh",
        rotate: randomRotation + 720,
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: delay,
        repeat: Infinity,
        ease: "easeIn",
      }}
      className="absolute pointer-events-none text-2xl"
      style={{ color: randomColor }}
    >
      {randomShape}
    </motion.div>
  );
};

export default function SudokuVictory() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const message = [
    "¡Lo lograste, mi amor! ❤️",
    "",
    "Resolviste el Sudoku con la misma inteligencia",
    "y paciencia con la que cuidas nuestro amor.",
    "",
    "Cada número que pusiste correctamente es como",
    "cada momento especial que compartimos:",
    "encaja perfectamente en el rompecabezas de mi vida.",
    "",
    "Gracias por ser mi mejor compañera y por",
    "hacer que todo tenga sentido para mí.",
    "",
    "Este es solo el primero de muchos",
    "San Valentín que celebraremos juntos.",
    "",
    "Te amo infinitamente 💖",
    "",
    "Feliz San Valentín, mi Nanpache hermosa",
    "",
    "- Gus, tu enamorado 🌹",
  ];

  // Typewriter effect
  useEffect(() => {
    if (currentLineIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + message[currentLineIndex] + "\n");
        setCurrentLineIndex(currentLineIndex + 1);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative px-4 overflow-hidden">
      <MusicPlayer audioSrc="/music/winner4.mp3" autoPlay={true} />

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <FloatingHeart key={`heart-${i}`} delay={i * 0.3} />
        ))}
      </div>

      {/* Confetti Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 35 }).map((_, i) => (
          <ConfettiParticle key={`confetti-${i}`} delay={i * 0.2} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 max-w-4xl w-full"
      >
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.h1
            className={`text-7xl font-bold text-white mb-4 ${playfairDisplay.className}`}
            animate={{
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 20px rgba(244, 63, 94, 0.5)",
                "0 0 40px rgba(244, 63, 94, 0.8)",
                "0 0 20px rgba(244, 63, 94, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ¡Lo Lograste! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl text-white/90"
          >
            El amor no tiene enigmas para nosotros
          </motion.p>
        </motion.div>

        {/* Message Card with Typewriter Effect */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 relative overflow-hidden"
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                "0 0 20px rgba(244, 63, 94, 0.3)",
                "0 0 40px rgba(244, 63, 94, 0.6)",
                "0 0 20px rgba(244, 63, 94, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative min-h-[500px] flex items-center justify-center">
            <pre className="text-white text-lg leading-relaxed whitespace-pre-wrap font-sans text-center">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-6 bg-rose-400 ml-1"
              />
            </pre>
          </div>
        </motion.div>

        {/* Decorative animated hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex justify-center gap-4 mt-8"
        >
          {["❤️", "💕", "💖", "💗", "💝"].map((heart, index) => (
            <motion.span
              key={index}
              className="text-5xl"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              {heart}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
