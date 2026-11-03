"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicPlayer from "../shared/MusicPlayer";

type WordScrambleGameProps = {
  onComplete: () => void;
};

const WORDS = [
  "nan",
  "nanpache",
  "gus",
  "extraterrestre",
  "tetela",
  "arequipa",
  "segundo",
  "mesario",
  "amor",
  "lofiu",
];

// Function to scramble a word
const scrambleWord = (word: string): string => {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  const scrambled = letters.join("");
  // Make sure the scrambled word is different from the original
  return scrambled === word ? scrambleWord(word) : scrambled;
};

export default function WordScrambleGame({
  onComplete,
}: WordScrambleGameProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null,
  );
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  // Initialize scrambled word
  useEffect(() => {
    if (currentWordIndex < WORDS.length) {
      setScrambledWord(scrambleWord(WORDS[currentWordIndex]));
    }
  }, [currentWordIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedInput = userInput.toLowerCase().trim();
    const correctWord = WORDS[currentWordIndex].toLowerCase();

    if (normalizedInput === correctWord) {
      setFeedback("correct");
      setCompletedWords([...completedWords, WORDS[currentWordIndex]]);

      setTimeout(() => {
        if (currentWordIndex + 1 < WORDS.length) {
          setCurrentWordIndex(currentWordIndex + 1);
          setUserInput("");
          setFeedback(null);
        } else {
          // All words completed!
          onComplete();
        }
      }, 1000);
    } else {
      setFeedback("incorrect");
      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  };

  const handleSkip = () => {
    setScrambledWord(scrambleWord(WORDS[currentWordIndex]));
    setUserInput("");
    setFeedback(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <MusicPlayer audioSrc="/music/background3.mp3" autoPlay={true} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            🔤 Descifra las Palabras
          </h1>
          <p className="text-xl text-white/80">
            Descubre las palabras especiales de nuestra historia
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70 text-sm">Progreso</span>
            <span className="text-white font-semibold">
              {completedWords.length} / {WORDS.length}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(completedWords.length / WORDS.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#ffb703] to-[#9d0208]"
            />
          </div>
        </motion.div>

        {/* Game Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="ofrenda-card p-8 backdrop-blur-xl"
        >
          {/* Scrambled Word */}
          <div className="text-center mb-8">
            <p className="text-white/60 text-sm mb-4">Palabra mezclada:</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={scrambledWord}
                initial={{ scale: 0.8, opacity: 0, rotateX: -90 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-[#ffe08a] to-[#e85d04] bg-clip-text text-6xl font-bold tracking-wider text-transparent"
              >
                {scrambledWord}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="word-input"
                className="block text-white/70 text-sm mb-2"
              >
                Tu respuesta:
              </label>
              <input
                id="word-input"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full rounded-xl border-2 border-white/20 bg-white/5 px-6 py-4 text-center text-xl text-white transition-all duration-300 focus:border-amber-400 focus:outline-none"
                placeholder="Escribe la palabra..."
                autoComplete="off"
                autoFocus
              />
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-center py-3 rounded-xl ${
                    feedback === "correct"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {feedback === "correct"
                    ? "¡Correcto! 🎉"
                    : "Intenta de nuevo 💭"}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={!userInput.trim() || feedback === "correct"}
                className="btn-ofrenda min-w-0 flex-1 px-6 py-4 text-base normal-case tracking-normal disabled:cursor-not-allowed"
              >
                Verificar
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
              >
                🔄 Mezclar
              </button>
            </div>
          </form>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center text-white/50 text-sm mt-6"
          >
            💡 Pista: Son palabras especiales de nuestra historia juntos
          </motion.p>
        </motion.div>

        {/* Completed Words */}
        {completedWords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6"
          >
            <p className="text-white/60 text-sm text-center mb-3">
              Palabras descubiertas:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {completedWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="chip-ofrenda"
                >
                  {word} ✓
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
