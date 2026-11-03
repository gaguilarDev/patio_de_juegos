"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PhotoPairGame from "./games/PhotoPairGame";
import ValentinesProposal from "./games/ValentinesProposal";
import TextFooter from "./shared/TextFooter";

const ANIM_DURATION = 2;

export default function MesarioGame() {
  const [showValentinesProposal, setShowValentinesProposal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleShowProposal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowValentinesProposal(true);
    }, ANIM_DURATION * 1000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-10 py-16">
      {!showValentinesProposal ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: ANIM_DURATION }}
        >
          <PhotoPairGame handleShowProposal={handleShowProposal} />
          <TextFooter />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIM_DURATION }}
        >
          <ValentinesProposal />
        </motion.div>
      )}
    </div>
  );
}
