import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCard, toPublic } from "@/lib/cards";
import InvitationViewer from "@/components/invitations/InvitationViewer";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const card = await getCard((await params).id);
  if (!card) return { title: "Invitación" };
  return {
    title: card.title,
    description: card.to ? `Una invitación especial para ${card.to} 💌` : "Tienes una invitación especial 💌",
    robots: { index: false },
  };
}

export default async function InvitationPage({ params }: Props) {
  const card = await getCard((await params).id);
  if (!card) notFound();
  return <InvitationViewer card={toPublic(card)} />;
}
