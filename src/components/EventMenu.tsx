"use client";

import { motion } from "framer-motion";
import { events, EventConfig } from "@/config/events";
import SnowFall from "./shared/SnowFall";

type EventMenuProps = {
  onSelectEvent: (eventId: string) => void;
};

export default function EventMenu({ onSelectEvent }: EventMenuProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative px-4">
      <SnowFall />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl w-full"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-4">
            Celebraciones Especiales 💖
          </h1>
          <p className="text-xl text-white/80">
            Selecciona qué fecha quieres celebrar
          </p>
        </motion.div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onSelect={() =>
                event.href
                  ? window.location.assign(event.href)
                  : onSelectEvent(event.id)
              }
            />
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center text-white/60 text-sm mt-12"
        >
          Cada fecha tiene su propia sorpresa especial ✨
        </motion.p>
      </motion.div>
    </div>
  );
}

type EventCardProps = {
  event: EventConfig;
  index: number;
  onSelect: () => void;
};

function EventCard({ event, index, onSelect }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className="cursor-pointer"
    >
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl hover:shadow-pink-500/20">
        {/* Emoji */}
        <div className="text-center mb-6">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="text-8xl"
          >
            {event.emoji}
          </motion.div>
        </div>

        {/* Date Badge */}
        <div className="flex justify-center mb-4">
          <div className={`bg-gradient-to-r ${event.color} px-4 py-2 rounded-full`}>
            <p className="text-white font-semibold text-sm">
              📅 {event.date}
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          {event.title}
        </h2>

        {/* Subtitle */}
        <p className="text-white/70 text-center mb-6">
          {event.subtitle}
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {event.href ? "Abrir ✨" : "Celebrar 🎉"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
