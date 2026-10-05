"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import SnowFall from "@/components/shared/SnowFall";
import { THEME_STYLES } from "@/components/invitations/themes";
import type { CardTheme } from "@/lib/cards";

const field =
  "w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition";

export default function CrearInvitacion() {
  const [theme, setTheme] = useState<CardTheme>("rosa");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setPassword(sessionStorage.getItem("invitaciones-pass") ?? "");
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const body = new FormData(e.currentTarget);
    body.set("theme", theme);
    try {
      const res = await fetch("/api/cards", { method: "POST", body, headers: { "x-admin-password": password } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error al crear la invitación");
      sessionStorage.setItem("invitaciones-pass", password);
      setLink(`${window.location.origin}${json.url}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative min-h-screen bg-black px-4 py-12 flex justify-center">
      <SnowFall />
      <Link
        href="/"
        className="fixed top-5 left-5 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-white font-medium transition"
      >
        ← Menú
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-xl"
      >
        <header className="text-center mb-8 mt-8">
          <p className="text-5xl mb-3">💌</p>
          <h1 className="font-script text-6xl text-pink-300">Carta de invitación</h1>
          <p className="text-white/70 mt-2">Elige una canción, escribe tu mensaje y comparte el enlace.</p>
        </header>

        {link ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 text-center"
          >
            <p className="text-2xl text-white font-semibold mb-1">¡Tu invitación está lista! 🎉</p>
            <p className="text-white/70 mb-5">Envía este enlace a quien quieras sorprender.</p>
            <input readOnly value={link} onFocus={(e) => e.target.select()} className={`${field} text-center text-sm`} />
            <div className="flex flex-wrap gap-3 justify-center mt-5">
              <button onClick={copy} className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold">
                {copied ? "¡Copiado! ✓" : "Copiar enlace"}
              </button>
              <a href={link} target="_blank" className="px-6 py-3 rounded-xl bg-white/15 text-white font-semibold hover:bg-white/25 transition">
                Ver invitación
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Tengo una invitación para ti 💌 ${link}`)}`}
                target="_blank"
                className="px-6 py-3 rounded-xl bg-emerald-500/80 text-white font-semibold hover:bg-emerald-500 transition"
              >
                WhatsApp
              </a>
            </div>
            <button onClick={() => { setLink(""); setFileName(""); }} className="mt-6 text-white/60 underline text-sm">
              Crear otra
            </button>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-white/70">Para (opcional)</span>
                <input name="to" maxLength={60} placeholder="Mi amor" className={`${field} mt-1`} />
              </label>
              <label className="block">
                <span className="text-sm text-white/70">De (opcional)</span>
                <input name="from" maxLength={60} placeholder="Tu nombre" className={`${field} mt-1`} />
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-white/70">Título</span>
              <input name="title" required maxLength={80} placeholder="Te invito a una cena especial" className={`${field} mt-1`} />
            </label>

            <label className="block">
              <span className="text-sm text-white/70">Mensaje</span>
              <textarea name="message" required rows={6} maxLength={2000} placeholder="Escribe aquí lo que quieres decirle…" className={`${field} mt-1 resize-y`} />
            </label>

            <div>
              <span className="text-sm text-white/70">Canción (mp3, m4a, ogg o wav · máx. 20 MB)</span>
              <label className="mt-1 flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-white/30 hover:border-pink-400 px-4 py-4 transition">
                <span className="text-2xl">🎵</span>
                <span className="text-white/80 truncate">{fileName || "Elegir archivo de audio"}</span>
                <input
                  name="audio"
                  type="file"
                  required
                  accept="audio/*"
                  className="sr-only"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </label>
            </div>

            <div>
              <span className="text-sm text-white/70">Estilo</span>
              <div className="grid grid-cols-3 gap-3 mt-1">
                {(Object.keys(THEME_STYLES) as CardTheme[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setTheme(k)}
                    aria-pressed={theme === k}
                    className={`rounded-xl p-[2px] transition ${theme === k ? "ring-2 ring-white scale-[1.03]" : "opacity-70 hover:opacity-100"}`}
                    style={{ background: THEME_STYLES[k].bg }}
                  >
                    <span className="block rounded-[10px] py-4 text-xs sm:text-sm text-white font-medium">
                      <span className="block h-2 w-8 mx-auto mb-2 rounded-full" style={{ background: THEME_STYLES[k].accent }} />
                      {THEME_STYLES[k].label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="text-sm text-white/70">Contraseña de creación</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className={`${field} mt-1`}
              />
            </label>

            {error && <p role="alert" className="text-rose-300 text-sm">{error}</p>}

            <button
              disabled={busy}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg shadow-lg disabled:opacity-60 hover:shadow-pink-500/30 transition"
            >
              {busy ? "Creando…" : "Crear invitación ✨"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
