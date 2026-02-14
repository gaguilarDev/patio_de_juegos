"use client";

import { useState } from "react";
import EventMenu from "@/components/EventMenu";
import BirthdayGame from "@/components/BirthdayGame";
import MesarioGame from "@/components/MesarioGame";
import Mesario2Game from "@/components/Mesario2Game";
import ValentineGame from "@/components/ValentineGame";
import { EventType } from "@/config/events";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const handleSelectEvent = (eventId: string) => {
    setSelectedEvent(eventId as EventType);
  };

  const handleBackToMenu = () => {
    setSelectedEvent(null);
  };

  // Show event menu if no event selected
  if (!selectedEvent) {
    return <EventMenu onSelectEvent={handleSelectEvent} />;
  }

  // Show selected event game
  if (selectedEvent === 'cumpleanos') {
    return (
      <div>
        <BackButton onClick={handleBackToMenu} />
        <BirthdayGame />
      </div>
    );
  }

  if (selectedEvent === 'mesario') {
    return (
      <div>
        <BackButton onClick={handleBackToMenu} />
        <MesarioGame />
      </div>
    );
  }

  if (selectedEvent === 'mesario2') {
    return (
      <div>
        <BackButton onClick={handleBackToMenu} />
        <Mesario2Game />
      </div>
    );
  }

  if (selectedEvent === 'sanvalentin') {
    return (
      <div>
        <BackButton onClick={handleBackToMenu} />
        <ValentineGame />
      </div>
    );
  }

  return null;
}

type BackButtonProps = {
  onClick: () => void;
};

function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-5 left-5 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-white font-medium transition-all duration-300 flex items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Volver al Menú
    </button>
  );
}
