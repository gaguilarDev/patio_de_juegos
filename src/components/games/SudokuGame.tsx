"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicPlayer from "../shared/MusicPlayer";

type Difficulty = "easy" | "intermediate";

type SudokuPuzzle = {
  initial: number[][];
  solution: number[][];
};

const PUZZLES: Record<Difficulty, SudokuPuzzle> = {
  easy: {
    initial: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]
  },
  intermediate: {
    initial: [
      [0, 2, 0, 6, 0, 8, 0, 0, 0],
      [5, 8, 0, 0, 0, 9, 7, 0, 0],
      [0, 0, 0, 0, 4, 0, 0, 0, 0],
      [3, 7, 0, 0, 0, 0, 5, 0, 0],
      [6, 0, 0, 0, 0, 0, 0, 0, 4],
      [0, 0, 8, 0, 0, 0, 0, 1, 3],
      [0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 9, 8, 0, 0, 0, 3, 6],
      [0, 0, 0, 3, 0, 6, 0, 9, 0]
    ],
    solution: [
      [1, 2, 3, 6, 7, 8, 9, 4, 5],
      [5, 8, 4, 2, 3, 9, 7, 6, 1],
      [9, 6, 7, 1, 4, 5, 3, 2, 8],
      [3, 7, 2, 4, 6, 1, 5, 8, 9],
      [6, 9, 1, 5, 8, 3, 2, 7, 4],
      [4, 5, 8, 7, 9, 2, 6, 1, 3],
      [8, 3, 6, 9, 2, 4, 1, 5, 7],
      [2, 1, 9, 8, 5, 7, 4, 3, 6],
      [7, 4, 5, 3, 1, 6, 8, 9, 2]
    ]
  }
};

type Question = {
  question: string;
  options: string[];
  correct: number;
};

const QUESTIONS: Question[] = [
  {
    question: "¿Cuál es mi apodo favorito para ti?",
    options: ["Bebé", "Nanpache", "Amor", "Tetela"],
    correct: 1
  },
  {
    question: "¿En qué ciudad nos conocimos?",
    options: ["Lima", "Arequipa", "Cusco", "Tetela"],
    correct: 1
  },
  {
    question: "¿En qué fecha es nuestro primer mesario?",
    options: ["27 de enero", "14 de febrero", "27 de diciembre", "25 de diciembre"],
    correct: 2
  },
  {
    question: "¿Cómo me haces sentir cada día?",
    options: ["Triste", "Normal", "Feliz", "Cansado"],
    correct: 2
  },
  {
    question: "¿Qué es lo que más me gusta de ti?",
    options: ["Tu risa", "Tus ojos", "Tu forma de ser", "Todo de ti"],
    correct: 3
  },
  {
    question: "¿Cuál es nuestra palabra especial?",
    options: ["Siempre", "Amor", "Lofiu", "Eterno"],
    correct: 0
  }
];

type SudokuGameProps = {
  onComplete: () => void;
};

export default function SudokuGame({ onComplete }: SudokuGameProps) {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [grid, setGrid] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [helpSuccess, setHelpSuccess] = useState(false);

  useEffect(() => {
    if (difficulty) {
      setGrid(PUZZLES[difficulty].initial.map(row => [...row]));
    }
  }, [difficulty]);

  const handleCellClick = (row: number, col: number) => {
    if (difficulty && PUZZLES[difficulty].initial[row][col] === 0) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberInput = (num: number) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = num;
      setGrid(newGrid);

      // Check if complete
      if (checkWin(newGrid)) {
        onComplete();
      }
    }
  };

  const checkWin = (currentGrid: number[][]) => {
    if (!difficulty) return false;
    const solution = PUZZLES[difficulty].solution;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentGrid[i][j] !== solution[i][j]) return false;
      }
    }
    return true;
  };

  const handleHelp = () => {
    const randomQuestion = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setCurrentQuestion(randomQuestion);
    setShowHelp(true);
  };

  const handleAnswer = (index: number) => {
    if (currentQuestion && index === currentQuestion.correct) {
      setHelpSuccess(true);
      // Reveal a random missing number
      revealRandomNumber();
      setTimeout(() => {
        setShowHelp(false);
        setHelpSuccess(false);
      }, 2000);
    } else {
      // Incorrect answer
      alert("¡Vuelve a intentarlo, mi amor! ❤️");
    }
  };

  const revealRandomNumber = () => {
    if (!difficulty) return;
    const solution = PUZZLES[difficulty].solution;
    const emptyCells: [number, number][] = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0 || grid[i][j] !== solution[i][j]) {
          emptyCells.push([i, j]);
        }
      }
    }

    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = solution[row][col];
      setGrid(newGrid);
      
      if (checkWin(newGrid)) {
        onComplete();
      }
    }
  };

  if (!difficulty || grid.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] text-white">
        <h2 className="text-4xl font-bold mb-8 text-rose-500">¿Qué tan difícil quieres el desafío?</h2>
        <div className="flex gap-6">
          <button
            onClick={() => setDifficulty("easy")}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            Fácil 😊
          </button>
          <button
            onClick={() => setDifficulty("intermediate")}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            Intermedio 😏
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <MusicPlayer audioSrc="/music/background4.mp3" autoPlay={true} />
      
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center bg-[#111111] p-8 sm:p-20 rounded-[3rem] border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative">
        {/* Sudoku Grid Container */}
        <div className="bg-white p-1 rounded-sm shadow-2xl select-none mx-auto overflow-hidden">
          <table className="border-collapse border-[3px] border-gray-900 table-fixed">
            <tbody>
              {grid.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((cellValue, colIndex) => {
                    const isInitial = PUZZLES[difficulty].initial[rowIndex][colIndex] !== 0;
                    const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
                    
                    // Borders: Thick every 3rd cell
                    const isBoldRight = (colIndex + 1) % 3 === 0 && colIndex !== 8;
                    const isBoldBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;
                    
                    const solve = PUZZLES[difficulty].solution[rowIndex][colIndex];
                    const isCorrect = cellValue !== 0 && cellValue === solve;
                    const isWrong = cellValue !== 0 && cellValue !== solve;

                    return (
                      <td
                        key={`cell-${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        style={{
                          width: 'clamp(36px, 8vw, 56px)',
                          height: 'clamp(36px, 8vw, 56px)',
                          padding: 0
                        }}
                        className={`
                          relative text-xl sm:text-2xl font-bold cursor-pointer
                          transition-all duration-150 text-center
                          border-[1px] border-gray-300
                          ${isBoldRight ? "border-r-[4px] border-r-gray-900" : ""}
                          ${isBoldBottom ? "border-b-[4px] border-b-gray-900" : ""}
                          ${isInitial ? "bg-gray-100 text-gray-900" : "bg-white"}
                          ${!isInitial && isCorrect ? "text-blue-600" : ""}
                          ${!isInitial && isWrong ? "text-red-500" : ""}
                          ${isSelected ? "z-10 ring-[3px] sm:ring-[4px] ring-rose-400 ring-inset bg-rose-50" : ""}
                          hover:bg-rose-50/50 select-none
                        `}
                      >
                        {cellValue !== 0 ? cellValue : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-8 w-full max-w-[340px]">
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                className="h-16 sm:h-20 bg-white/5 hover:bg-rose-500/20 border border-white/10 rounded-2xl text-white text-3xl font-bold backdrop-blur-sm transition-all shadow-md active:scale-95 flex items-center justify-center hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:border-rose-500/40"
              >
                {num}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleHelp}
              className="py-6 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl text-white font-bold text-xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 border-b-4 border-rose-800 active:border-b-0 active:translate-y-1"
            >
              <span className="text-2xl">💡</span> Necesito ayuda
            </button>

            <button
              onClick={() => onComplete()}
              className="py-4 px-6 bg-white/5 hover:bg-white/15 border border-white/20 rounded-2xl text-white font-semibold transition-all flex items-center justify-center gap-2 hover:border-white/40"
            >
              🎉 Revelar sorpresa
            </button>
          </div>
          
          <button
            onClick={() => setDifficulty(null)}
            className="text-white/40 hover:text-white transition-colors text-sm text-center"
          >
            Cambiar dificultad
          </button>
        </div>
      </div>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl overflow-hidden relative"
            >
              {helpSuccess ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl mb-4"
                  >
                    💖
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Correcto, mi amor!</h3>
                  <p className="text-gray-600">Revelando un número para ayudarte...</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Responde esto para obtener ayuda ✨
                  </h3>
                  <p className="text-xl text-gray-700 mb-8 text-center font-medium">
                    {currentQuestion?.question}
                  </p>
                  <div className="space-y-3">
                    {currentQuestion?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full py-4 px-6 text-left border-2 border-gray-100 rounded-2xl hover:border-rose-400 hover:bg-rose-50 transition-all text-gray-700 font-medium"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="mt-8 text-gray-400 hover:text-gray-600 w-full text-center"
                  >
                    Cerrar
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
