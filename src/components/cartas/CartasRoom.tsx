"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { THEME_STYLES } from "@/components/invitations/themes";
import AmbientScene from "@/components/shared/AmbientScene";
import BackLink from "@/components/shared/BackLink";
import PapelPicado from "@/components/shared/PapelPicado";
import type { CardTheme } from "@/lib/cards";

const themes = Object.keys(THEME_STYLES) as CardTheme[];

export default function CartasRoom() {
  return (
    <div className="bg-ofrenda relative flex min-h-screen items-center justify-center px-4 py-16">
      <AmbientScene />
      <PapelPicado />
      <BackLink href="/" label="Volver al patio" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 16 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <header className="mb-8 text-center">
          <motion.p
            aria-hidden="true"
            className="mb-3 text-6xl"
            animate={{ y: [0, -8, 0], rotate: [0, -4, 4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            💌
          </motion.p>
          <h1 className="font-script text-6xl text-amber-50 sm:text-7xl">
            Cartas
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-amber-50/75">
            Este cuarto es solo para invitaciones. Elige un estilo, adjunta una
            canción y comparte el enlace.
          </p>
        </header>

        <motion.article
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 90,
            damping: 16,
          }}
          className="ofrenda-card p-6 sm:p-8"
        >
          <span className="card-shine" />
          <div className="grid gap-4 sm:grid-cols-3">
            {themes.map((theme, index) => (
              <motion.div
                key={theme}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.08 }}
                className="rounded-2xl p-4 text-center"
                style={{ background: THEME_STYLES[theme].bg }}
              >
                <span
                  className="mx-auto mb-3 block h-1.5 w-10 rounded-full"
                  style={{ background: THEME_STYLES[theme].accent }}
                />
                <p className="font-serif text-lg text-white">
                  {THEME_STYLES[theme].label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="text-amber-50/70">
              La carta que crees abre en su propia página, con música y el
              mensaje que escribiste.
            </p>
            <Link
              href="/invitaciones"
              className="btn-ofrenda focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
            >
              Crear una carta
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.article>
      </motion.div>
    </div>
  );
}
