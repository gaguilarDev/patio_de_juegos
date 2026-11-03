"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SudokuGame from "./games/SudokuGame";
import SudokuVictory from "./shared/SudokuVictory";

const ANIM_DURATION = 2;

export default function ValentineGame() {
  const [showVictory, setShowVictory] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGameComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowVictory(true);
    }, ANIM_DURATION * 1000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-10 py-16">
      {!showVictory ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: ANIM_DURATION }}
          className="w-full"
        >
          <SudokuGame onComplete={handleGameComplete} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIM_DURATION }}
          className="w-full"
        >
          <SudokuVictory />
        </motion.div>
      )}
    </div>
  );
}
