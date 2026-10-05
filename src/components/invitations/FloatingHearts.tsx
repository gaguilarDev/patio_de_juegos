"use client";

import { useEffect, useRef } from "react";

// Heart outline from the canvas-confetti docs (MIT), 400x400 box.
const HEART_PATH =
  "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z";

type Kind = "heart" | "petal" | "star";
type P = { x: number; y: number; s: number; v: number; sway: number; phase: number; rot: number; vr: number; c: string; a: number; kind: Kind };

export default function FloatingHearts({ colors, stars = false }: { colors: string[]; stars?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const HEART = new Path2D(HEART_PATH);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, t = 0;
    let parts: P[] = [];

    const spawn = (anywhere: boolean): P => {
      const r = Math.random();
      const kind: Kind = stars && r < 0.35 ? "star" : r < 0.6 ? "petal" : "heart";
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 40,
        s: kind === "star" ? 1 + Math.random() * 2.5 : 8 + Math.random() * 22,
        v: 0.25 + Math.random() * 0.9,
        sway: 10 + Math.random() * 30,
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.02,
        c: colors[Math.floor(Math.random() * colors.length)],
        a: 0.25 + Math.random() * 0.55,
        kind,
      };
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(70, (w * h) / 16000) * (reduce ? 0.4 : 1));
      parts = Array.from({ length: n }, () => spawn(true));
    };

    const frame = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (!reduce) p.y -= p.kind === "star" ? p.v * 0.15 : p.v;
        p.rot += p.vr;
        ctx.save();
        ctx.globalAlpha = p.kind === "star" ? p.a * (0.5 + 0.5 * Math.sin(t * 2 + p.phase)) : p.a;
        ctx.fillStyle = p.c;
        ctx.translate(p.x + Math.sin(t * p.v + p.phase) * p.sway, p.y);
        if (p.kind === "heart") {
          const k = p.s / 400;
          ctx.rotate(Math.sin(t + p.phase) * 0.3);
          ctx.scale(k, k);
          ctx.translate(-200, -200);
          ctx.fill(HEART);
        } else if (p.kind === "petal") {
          ctx.rotate(p.rot);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.s * 0.55, p.s * 0.28, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.shadowColor = p.c;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(0, 0, p.s, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
        if (p.y < -50) parts[i] = spawn(false);
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [colors, stars]);

  return <canvas ref={ref} aria-hidden className="fixed inset-0 w-full h-full pointer-events-none" />;
}
