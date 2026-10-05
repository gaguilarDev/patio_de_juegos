import type { CardTheme } from "@/lib/cards";

export interface ThemeStyle {
  label: string;
  bg: string;
  paper: string;
  ink: string;
  accent: string;
  accentSoft: string;
  particles: string[];
  stars: boolean;
}

export const THEME_STYLES: Record<CardTheme, ThemeStyle> = {
  rosa: {
    label: "Rosa pasión",
    bg: "radial-gradient(ellipse at 50% 0%, #7a1236 0%, #3b0a22 55%, #1a0510 100%)",
    paper: "linear-gradient(160deg, #fff7f3 0%, #ffe4e8 100%)",
    ink: "#4a1424",
    accent: "#c2185b",
    accentSoft: "#f8bbd0",
    particles: ["#ff4d6d", "#ff758f", "#ffb3c1", "#ff85a1", "#e63962"],
    stars: false,
  },
  dorado: {
    label: "Oro elegante",
    bg: "radial-gradient(ellipse at 50% 0%, #2b2110 0%, #14100a 60%, #070605 100%)",
    paper: "linear-gradient(160deg, #fffaf0 0%, #f6e7c1 100%)",
    ink: "#3a2c0f",
    accent: "#b8860b",
    accentSoft: "#f1d58a",
    particles: ["#f4d06f", "#e9b949", "#fff1b8", "#d4a017", "#ffe08a"],
    stars: true,
  },
  noche: {
    label: "Noche estrellada",
    bg: "radial-gradient(ellipse at 50% 0%, #2a1b5e 0%, #120b33 55%, #05030f 100%)",
    paper: "linear-gradient(160deg, #f6f3ff 0%, #e3dcff 100%)",
    ink: "#241a4d",
    accent: "#7c4dff",
    accentSoft: "#d1c4ff",
    particles: ["#b39ddb", "#ff80ab", "#e1bee7", "#82b1ff", "#f8bbd0"],
    stars: true,
  },
};
