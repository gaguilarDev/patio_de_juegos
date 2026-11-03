import type { Metadata } from "next";
import CartasRoom from "@/components/cartas/CartasRoom";

export const metadata: Metadata = {
  title: "Cartas · Patio de juegos",
  description: "Invitaciones con canción y mensaje para compartir.",
};

export default function CartasPage() {
  return <CartasRoom />;
}
