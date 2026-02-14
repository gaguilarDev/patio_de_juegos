"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SudokuGame from "./games/SudokuGame";
import SudokuVictory from "./shared/SudokuVictory";
import SnowFall from "./shared/SnowFall";

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
    <div className="flex items-center justify-center min-h-screen bg-black relative px-10">
      <SnowFall />
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
