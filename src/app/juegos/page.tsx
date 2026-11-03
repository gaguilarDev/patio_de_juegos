import type { Metadata } from "next";
import EventMenu from "@/components/EventMenu";
import { games } from "@/config/events";

export const metadata: Metadata = {
  title: "Juegos y cuestionarios · Patio de juegos",
  description:
    "Memoria, palabras, rompecabezas, trivia y sudoku para cada fecha.",
};

export default function JuegosPage() {
  return (
    <EventMenu
      title="Juegos y cuestionarios"
      subtitle="Las fechas están separadas: primero los juegos, después el cuestionario y al final la experiencia."
      items={games}
      backHref="/"
      backLabel="Volver al patio"
    />
  );
}
