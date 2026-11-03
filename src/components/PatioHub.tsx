"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AmbientScene from "@/components/shared/AmbientScene";
import PapelPicado from "@/components/shared/PapelPicado";

const portals = [
  {
    href: "/juegos",
    emoji: "🎮",
    kicker: "Celebrar",
    title: "Juegos y cuestionarios",
    text: "Memoria, palabras, rompecabezas, trivia y sudoku. Cada fecha tiene el suyo.",
    action: "Entrar a jugar",
    accents: ["💕", "🎂", "❤️", "🔮"],
  },
  {
    href: "/cartas",
    emoji: "💌",
    kicker: "Escribir",
    title: "Cartas",
    text: "Invitaciones con tu canción, tu mensaje y un enlace para compartir.",
    action: "Entrar a las cartas",
    accents: ["🎵", "✨", "🌹", "💌"],
  },
] as const;

export default function PatioHub() {
  return (
    <div className="bg-ofrenda relative flex min-h-screen items-center justify-center px-4 py-16">
      <AmbientScene />
      <PapelPicado />

      <div className="relative z-10 w-full max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-amber-200/80">
            Patio de juegos
          </p>
          <h1 className="font-script text-6xl text-amber-50 sm:text-7xl">
            Elige un rincón
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-amber-50/75">
            Entra a jugar una fecha, o escribe una invitación con música.
          </p>
        </motion.header>

        <div className="grid gap-6 md:grid-cols-2">
          {portals.map((portal, index) => (
            <motion.div
              key={portal.href}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 15,
                delay: 0.12 + index * 0.12,
              }}
            >
              <Link
                href={portal.href}
                className="group block h-full rounded-[1.6rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
              >
                <motion.article
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="ofrenda-card h-full p-8"
                >
                  <div className="relative">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <motion.span
                        aria-hidden="true"
                        className="text-7xl"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.4,
                        }}
                      >
                        {portal.emoji}
                      </motion.span>
                      <span className="chip-ofrenda text-xs uppercase tracking-wider">
                        {portal.kicker}
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-amber-50">
                      {portal.title}
                    </h2>
                    <p className="mt-3 min-h-16 text-amber-50/75">
                      {portal.text}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <span className="btn-ofrenda">
                        {portal.action}
                        <span aria-hidden="true">→</span>
                      </span>
                      <span className="flex gap-1 text-2xl" aria-hidden="true">
                        {portal.accents.map((accent) => (
                          <span
                            key={accent}
                            className="opacity-80 transition duration-300 group-hover:-translate-y-1"
                          >
                            {accent}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
