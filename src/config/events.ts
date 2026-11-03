export type PlayableGameId =
  "mesario" | "mesario2" | "cumpleanos" | "sanvalentin";
export type GameId = PlayableGameId | "ochomeses";

export interface EventConfig {
  id: GameId;
  date: string;
  title: string;
  subtitle: string;
  emoji: string;
  /** Paradas del gradiente de Tailwind, por ejemplo "from-pink-500 to-rose-500". */
  color: string;
  badge: string;
  /** Si existe, la tarjeta abre esta ruta en vez de /juegos/[id]. */
  href?: string;
}

export const games: EventConfig[] = [
  {
    id: "mesario",
    date: "27/12/2025",
    title: "Nuestro Primer Mes",
    subtitle: "Un juego de memoria con nuestras fotos",
    emoji: "💕",
    color: "from-pink-500 to-rose-500",
    badge: "Juego",
  },
  {
    id: "mesario2",
    date: "27/02/2026",
    title: "Nuestro Segundo Mes",
    subtitle: "Ordena las palabras y descubre el mensaje",
    emoji: "💝",
    color: "from-red-500 to-pink-500",
    badge: "Juego",
  },
  {
    id: "cumpleanos",
    date: "21/01/2026",
    title: "Tu Cumpleaños",
    subtitle: "Un rompecabezas y un cuestionario sobre nosotros",
    emoji: "🎂",
    color: "from-purple-500 to-pink-500",
    badge: "Juego y cuestionario",
  },
  {
    id: "sanvalentin",
    date: "14/02/2026",
    title: "San Valentín",
    subtitle: "Un sudoku para nuestro primer 14 de febrero",
    emoji: "❤️",
    color: "from-rose-500 to-red-500",
    badge: "Juego",
  },
  {
    id: "ochomeses",
    date: "27/08/2026",
    title: "Geometría del Alma",
    subtitle: "Nuestros 8 mesesotes",
    emoji: "🔮",
    color: "from-violet-500 to-fuchsia-500",
    badge: "Experiencia",
    href: "/regalo/index.html",
  },
];

export function getPlayableGame(id: string): EventConfig | undefined {
  return games.find((game) => game.id === id && !game.href);
}
