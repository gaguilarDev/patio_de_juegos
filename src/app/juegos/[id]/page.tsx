import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GameScreen from "@/components/games/GameScreen";
import { games, getPlayableGame, type PlayableGameId } from "@/config/events";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return games.filter((game) => !game.href).map((game) => ({ id: game.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = getPlayableGame((await params).id);
  if (!game) return { title: "Patio de juegos" };
  return {
    title: `${game.title} · Patio de juegos`,
    description: game.subtitle,
  };
}

export default async function JuegoPage({ params }: Props) {
  const game = getPlayableGame((await params).id);
  if (!game) notFound();
  return <GameScreen id={game.id as PlayableGameId} />;
}
