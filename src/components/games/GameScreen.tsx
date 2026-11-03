"use client";

import { motion } from "framer-motion";
import BirthdayGame from "@/components/BirthdayGame";
import Mesario2Game from "@/components/Mesario2Game";
import MesarioGame from "@/components/MesarioGame";
import ValentineGame from "@/components/ValentineGame";
import BackLink from "@/components/shared/BackLink";
import type { PlayableGameId } from "@/config/events";

const screens = {
  mesario: MesarioGame,
  mesario2: Mesario2Game,
  cumpleanos: BirthdayGame,
  sanvalentin: ValentineGame,
} as const;

export default function GameScreen({ id }: { id: PlayableGameId }) {
  const Screen = screens[id];

  return (
    <>
      <BackLink href="/juegos" label="Volver a juegos" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Screen />
      </motion.div>
    </>
  );
}
