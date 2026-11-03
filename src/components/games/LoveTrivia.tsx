"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MusicPlayer from "../shared/MusicPlayer";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type LoveTriviaProps = {
  onComplete: () => void;
};

const questions: Question[] = [
  {
    question: "¿Cuáles de las siguientes películas NO hemos visto juntos?",
    options: [
      "Apocalipsis Zombie",
      "El Barrendero",
      "La Reina de las Lágrimas",
      "El Libro de la Selva",
      "El Libro de la Vida",
    ],
    correctAnswer: 3, // El Libro de la Selva
  },
  {
    question: "¿Cuándo es mi cumpleaños?",
    options: [
      "29/08/1998",
      "29/06/1998",
      "29/07/1998",
      "29/05/1998",
      "21/01/1998",
    ],
    correctAnswer: 0, // 29/08/1998
  },
  {
    question: "¿Cuál apodo NO te he dicho?",
    options: [
      "Nanpache",
      "Nan de las Nieves de Tetela",
      "Amor",
      "Nancharanda",
      "Nan de Tetela",
    ],
    correctAnswer: 3, // Nancharanda
  },
  {
    question: "¿Cuánto te quiero?",
    options: ["Poquito", "Poco", "Mucho", "Muchísimo", "Nanchísimo"],
    correctAnswer: 4, // Nanchísimo
  },
  {
    question: "¿Cuándo cumpliremos otro mes?",
    options: [
      "23/01/2026",
      "27/01/2025",
      "29/01/2026",
      "22/01/2026",
      "27/01/2026",
    ],
    correctAnswer: 4, // 27/01/2026
  },
];

export default function LoveTrivia({ onComplete }: LoveTriviaProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswerClick = (answerIndex: number) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // All questions answered
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    }, 2000);
  };

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;
  const isComplete = currentQuestion === questions.length - 1 && showFeedback;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <MusicPlayer audioSrc="/music/background.mp3" autoPlay={true} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-white/80 text-sm">
              Correctas: {correctAnswers}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-[#ffb703] to-[#9d0208]"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="ofrenda-card p-8 backdrop-blur-md"
          >
            {/* Question */}
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentQ.correctAnswer;

                let bgColor = "bg-white/10 hover:bg-white/20";
                if (showFeedback) {
                  if (isCorrectAnswer) {
                    bgColor = "bg-green-500/50 ring-2 ring-green-400";
                  } else if (isSelected && !isCorrect) {
                    bgColor = "bg-red-500/50 ring-2 ring-red-400";
                  }
                }

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-xl text-left text-white font-medium transition-all duration-300 ${bgColor} ${
                      !showFeedback ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showFeedback && isCorrectAnswer && (
                        <span className="text-2xl">✓</span>
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <span className="text-2xl">✗</span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback message */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-center"
                >
                  {isCorrect ? (
                    <p className="text-green-400 text-xl font-semibold">
                      ¡Correcto! 💕
                    </p>
                  ) : (
                    <p className="text-red-400 text-xl font-semibold">
                      Casi... pero te quiero igual 😊
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Completion message */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center"
          >
            <h3 className="text-4xl font-bold text-white mb-2">
              ¡Trivia Completada! 🎉
            </h3>
            <p className="text-white/80 text-lg">
              Preparando tu sorpresa final...
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
