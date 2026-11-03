"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { EventConfig } from "@/config/events";
import AmbientScene from "./shared/AmbientScene";
import BackLink from "./shared/BackLink";

type EventMenuProps = {
  title: string;
  subtitle: string;
  items: EventConfig[];
  backHref?: string;
  backLabel?: string;
};

export default function EventMenu({
  title,
  subtitle,
  items,
  backHref,
  backLabel,
}: EventMenuProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black px-4 py-16">
      <AmbientScene />
      {backHref && backLabel ? (
        <BackLink href={backHref} label={backLabel} />
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 16 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <header className="mb-12 text-center">
          <h1 className="font-script text-6xl text-white sm:text-7xl">
            {title}
          </h1>
          <p className="mt-3 text-lg text-white/75">{subtitle}</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function EventCard({ event, index }: { event: EventConfig; index: number }) {
  const card = (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 14,
        delay: 0.08 + index * 0.07,
      }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.985 }}
      className="group h-full"
    >
      <div className="relative h-full overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl transition duration-300 group-hover:border-white/40 group-hover:shadow-pink-500/20">
        <span className="card-shine" />
        <div className="relative text-center">
          <motion.div
            aria-hidden="true"
            className="mb-5 text-7xl"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.25,
            }}
          >
            {event.emoji}
          </motion.div>

          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <span
              className={`rounded-full bg-gradient-to-r ${event.color} px-4 py-1.5 text-sm font-semibold text-white`}
            >
              {event.date}
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm text-white/90">
              {event.badge}
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white">{event.title}</h2>
          <p className="mb-6 mt-2 text-white/70">{event.subtitle}</p>

          <span
            className={`inline-flex rounded-xl bg-gradient-to-r ${event.color} px-8 py-3 font-semibold text-white shadow-lg`}
          >
            {event.href ? "Abrir" : "Jugar"}
          </span>
        </div>
      </div>
    </motion.article>
  );

  const className =
    "block h-full rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300";

  if (event.href) {
    return (
      <a href={event.href} className={className}>
        {card}
      </a>
    );
  }

  return (
    <Link href={`/juegos/${event.id}`} className={className}>
      {card}
    </Link>
  );
}
