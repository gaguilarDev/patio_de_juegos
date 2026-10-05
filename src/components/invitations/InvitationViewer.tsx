"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PublicCard } from "@/lib/cards";
import FloatingHearts from "./FloatingHearts";
import { heartBurst, heartRain } from "./heartConfetti";
import { THEME_STYLES } from "./themes";

type Stage = "sealed" | "opening" | "open";

const HEART_PATH =
  "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z";

export default function InvitationViewer({ card }: { card: PublicCard }) {
  const t = THEME_STYLES[card.theme];
  const [stage, setStage] = useState<Stage>("sealed");
  const [playing, setPlaying] = useState(false);
  const [typed, setTyped] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const open = useCallback(() => {
    if (stage !== "sealed") return;
    setStage("opening");
    // Playing inside the click handler satisfies browser autoplay rules.
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    heartBurst(t.particles);
    setTimeout(() => setStage("open"), 1500);
    setTimeout(() => heartRain(t.particles), 2000);
  }, [stage, t.particles]);

  useEffect(() => {
    if (stage !== "open") return;
    let id: ReturnType<typeof setInterval>;
    const delay = setTimeout(() => {
      id = setInterval(() => setTyped((n) => Math.min(n + 1, card.message.length)), 38);
    }, 1400);
    return () => {
      clearTimeout(delay);
      clearInterval(id);
    };
  }, [stage, card.message.length]);

  const toggleAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else {
      a.pause();
      setPlaying(false);
    }
  };

  const done = typed >= card.message.length;

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-5 py-10" style={{ background: t.bg }}>
      <audio ref={audioRef} src={`/api/cards/${card.id}/audio`} loop preload="auto" />
      <FloatingHearts colors={t.particles} stars={t.stars} />
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />

      <AnimatePresence mode="wait">
        {stage !== "open" ? (
          <motion.button
            key="envelope"
            onClick={open}
            aria-label="Abrir invitación"
            className="relative z-10 flex flex-col items-center gap-10 cursor-pointer focus:outline-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <Envelope opening={stage === "opening"} paper={t.paper} accent={t.accent} soft={t.accentSoft} />
            <div className="text-center">
              {card.to && <p className="font-script text-4xl sm:text-5xl text-white/95 mb-3">Para {card.to}</p>}
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="font-sans text-xs sm:text-sm tracking-[0.35em] uppercase text-white/75"
              >
                Toca para abrir
              </motion.p>
            </div>
          </motion.button>
        ) : (
          <motion.article
            key="card"
            className="relative z-10 w-full max-w-xl rounded-[28px] p-[1.5px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            style={{ background: `linear-gradient(135deg, ${t.accentSoft}, ${t.accent}, ${t.accentSoft})` }}
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-[27px] px-7 sm:px-12 py-12 text-center overflow-hidden" style={{ background: t.paper, color: t.ink }}>
              <Corner className="top-3 left-3" color={t.accent} />
              <Corner className="top-3 right-3 rotate-90" color={t.accent} />
              <Corner className="bottom-3 right-3 rotate-180" color={t.accent} />
              <Corner className="bottom-3 left-3 -rotate-90" color={t.accent} />

              <motion.div
                className="mx-auto mb-5 w-14 h-14"
                animate={{ scale: [1, 1.18, 1, 1.12, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.6 }}
              >
                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.25)]">
                  <path fill={t.accent} d={HEART_PATH} />
                </svg>
              </motion.div>

              <motion.h1
                className="font-script text-5xl sm:text-6xl leading-tight mb-6 break-words"
                style={{ color: t.accent }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9 }}
              >
                {card.title}
              </motion.h1>

              <div className="flex items-center justify-center gap-3 mb-6" aria-hidden>
                <span className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${t.accent})` }} />
                <span style={{ color: t.accent }}>✦</span>
                <span className="h-px w-16" style={{ background: `linear-gradient(270deg, transparent, ${t.accent})` }} />
              </div>

              <p className="font-serif text-lg sm:text-xl leading-relaxed whitespace-pre-wrap min-h-[6rem]" aria-label={card.message}>
                {card.message.slice(0, typed)}
                {!done && <span className="inline-block w-[2px] h-[1.1em] align-middle ml-0.5 animate-pulse" style={{ background: t.accent }} />}
              </p>

              {card.from && (
                <motion.p
                  className="font-script text-3xl sm:text-4xl mt-8"
                  style={{ color: t.accent }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: done ? 1 : 0 }}
                  transition={{ duration: 1.2 }}
                >
                  — {card.from}
                </motion.p>
              )}
            </div>
          </motion.article>
        )}
      </AnimatePresence>

      {stage === "open" && (
        <motion.button
          onClick={toggleAudio}
          aria-label={playing ? "Pausar música" : "Reproducir música"}
          className="fixed bottom-5 right-5 z-20 w-14 h-14 rounded-full backdrop-blur-md bg-white/15 border border-white/30 flex items-center justify-center text-white"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <span className={`absolute inset-1 rounded-full border-2 border-dashed border-white/40 ${playing ? "animate-[spin_6s_linear_infinite]" : ""}`} />
          <span className="relative text-xl">{playing ? "♪" : "▶"}</span>
        </motion.button>
      )}
    </main>
  );
}

function Corner({ className, color }: { className: string; color: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={`absolute w-8 h-8 opacity-60 ${className}`} fill="none" stroke={color} strokeWidth="1.5">
      <path d="M2 38V14C2 7 7 2 14 2h24" />
      <path d="M8 38V16c0-5 3-8 8-8h22" opacity=".5" />
    </svg>
  );
}

function Envelope({ opening, paper, accent, soft }: { opening: boolean; paper: string; accent: string; soft: string }) {
  return (
    <motion.div
      className="relative w-[min(78vw,340px)] aspect-[3/2]"
      animate={opening ? { scale: 1.08 } : { y: [0, -8, 0] }}
      transition={opening ? { duration: 0.6 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ perspective: 900 }}
    >
      <div className="absolute inset-0 rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]" style={{ background: paper }} />
      {/* letter peeking out */}
      <motion.div
        className="absolute left-[8%] right-[8%] top-[6%] h-[70%] rounded-md bg-white"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,.15)" }}
        animate={opening ? { y: "-45%" } : { y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
      />
      {/* front pocket */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: paper, clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)", filter: "brightness(.96)" }}
        />
      </div>
      {/* flap */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[55%] origin-top"
        style={{ background: paper, clipPath: "polygon(0 0, 100% 0, 50% 100%)", filter: "brightness(.9)", backfaceVisibility: "hidden" }}
        animate={{ rotateX: opening ? 180 : 0 }}
        transition={{ duration: 0.8 }}
      />
      {/* wax seal */}
      <motion.div
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${soft}, ${accent} 60%)`,
          boxShadow: "0 6px 14px rgba(0,0,0,.45), inset 0 -3px 6px rgba(0,0,0,.25)",
        }}
        animate={opening ? { scale: 0, opacity: 0, rotate: 40 } : { scale: [1, 1.08, 1] }}
        transition={opening ? { duration: 0.4 } : { duration: 1.6, repeat: Infinity }}
      >
        <svg viewBox="0 0 400 400" className="w-7 h-7">
          <path fill="rgba(255,255,255,.9)" d={HEART_PATH} />
        </svg>
      </motion.div>
    </motion.div>
  );
}
