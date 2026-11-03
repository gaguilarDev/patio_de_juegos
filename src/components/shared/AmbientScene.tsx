"use client";

import MarigoldFall from "./MarigoldFall";

export default function AmbientScene() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="ambient-orb ambient-orb-pink" />
      <div className="ambient-orb ambient-orb-violet" />
      <div className="ambient-orb ambient-orb-amber" />
      <MarigoldFall />
    </div>
  );
}
