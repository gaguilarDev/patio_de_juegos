"use client";

import { useEffect, useState } from "react";

type Petal = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
};

export default function MarigoldFall() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: 18 }, (_, id) => ({
        id,
        left: Math.random() * 100,
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 7,
        size: 9 + Math.random() * 9,
        color: Math.random() > 0.45 ? "#ffb703" : "#e85d04",
      })),
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 0.72,
            background: petal.color,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}
