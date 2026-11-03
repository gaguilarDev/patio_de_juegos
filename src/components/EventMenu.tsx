"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { EventConfig } from "@/config/events";
import AmbientScene from "./shared/AmbientScene";
import BackLink from "./shared/BackLink";
import PapelPicado from "./shared/PapelPicado";

type EventMenuProps = {
  title: string;
  subtitle: string;
  items: EventConfig[];
  backHref?: string;
  backLabel?: string;
};

const sections = [
  {
    id: "juegos",
    kicker: "Para jugar",
    title: "Juegos",
    detail: "Memoria, palabras y sudoku",
    layout: "grid" as const,
    match: (badge: string) => badge === "Juego",
  },
  {
    id: "cuestionario",
    kicker: "Para responder",
    title: "Cuestionario",
    detail: "Un juego que también hace preguntas",
    layout: "feature" as const,
    match: (badge: string) => badge.toLowerCase().includes("cuestionario"),
  },
  {
    id: "experiencia",
    kicker: "Para abrir",
    title: "Experiencia",
    detail: "Una página aparte, fuera del juego",
    layout: "feature" as const,
    match: (badge: string) => badge === "Experiencia",
  },
];

export default function EventMenu({
  title,
  subtitle,
  items,
  backHref,
  backLabel,
}: EventMenuProps) {
  const groups = sections
    .map((section) => ({
      ...section,
      items: items.filter((item) => section.match(item.badge)),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="bg-ofrenda relative min-h-screen px-4 pb-16 pt-16">
      <AmbientScene />
      <PapelPicado />
      {backHref && backLabel ? (
        <BackLink href={backHref} label={backLabel} />
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 16 }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <header className="mb-12 text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.32em] text-amber-200/80">
            Ofrenda
          </p>
          <h1 className="font-script text-6xl text-amber-50 sm:text-7xl">
            {title}
          </h1>
          <p className="mt-3 text-lg text-amber-50/75">{subtitle}</p>
        </header>

        <div className="space-y-12">
          {groups.map((group, groupIndex) => (
            <section key={group.id} aria-labelledby={`seccion-${group.id}`}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-amber-200/20 pb-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
                    {String(groupIndex + 1).padStart(2, "0")} · {group.kicker}
                  </p>
                  <h2
                    id={`seccion-${group.id}`}
                    className="font-serif text-3xl text-amber-50"
                  >
                    {group.title}
                  </h2>
                </div>
                <p className="text-sm text-amber-50/60">{group.detail}</p>
              </div>

              <div
                className={
                  group.layout === "grid"
                    ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid gap-5"
                }
              >
                {group.items.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={groupIndex * 3 + index}
                    wide={group.layout === "feature"}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function EventCard({
  event,
  index,
  wide,
}: {
  event: EventConfig;
  index: number;
  wide: boolean;
}) {
  const card = (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 14,
        delay: 0.06 + index * 0.06,
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      className="ofrenda-card group h-full"
    >
      <div
        className={
          wide
            ? "relative flex h-full flex-col items-center gap-6 p-7 sm:flex-row sm:items-center sm:p-8"
            : "relative flex h-full flex-col items-center p-7 text-center"
        }
      >
        <motion.div
          aria-hidden="true"
          className={wide ? "text-6xl sm:text-7xl" : "mb-4 text-6xl"}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        >
          {event.emoji}
        </motion.div>

        <div
          className={
            wide
              ? "flex flex-1 flex-col items-center sm:items-start"
              : "flex flex-1 flex-col items-center"
          }
        >
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="chip-ofrenda">{event.date}</span>
            <span className="chip-quiet">{event.badge}</span>
          </div>
          <h3 className="text-2xl font-bold text-amber-50">{event.title}</h3>
          <p className={`mt-2 max-w-md text-amber-50/70 ${wide ? "" : "mb-5"}`}>
            {event.subtitle}
          </p>
          {wide ? null : (
            <span className="btn-ofrenda mt-auto">
              {event.href ? "Abrir" : "Jugar"}
            </span>
          )}
        </div>
        {wide ? (
          <span className="btn-ofrenda shrink-0">
            {event.href ? "Abrir" : "Jugar"}
          </span>
        ) : null}
      </div>
    </motion.article>
  );

  const className =
    "block h-full rounded-[1.6rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200";

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
