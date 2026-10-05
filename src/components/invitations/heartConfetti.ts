import confetti from "canvas-confetti";

// Heart path and confetti.shapeFromPath usage come from the canvas-confetti docs (MIT).
const HEART_PATH =
  "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z";

export function heartBurst(colors: string[]) {
  const heart = confetti.shapeFromPath({ path: HEART_PATH });
  const base = { shapes: [heart], colors, scalar: 2.2, ticks: 260, gravity: 0.7, disableForReducedMotion: true };
  confetti({ ...base, particleCount: 60, spread: 90, origin: { x: 0.5, y: 0.6 }, startVelocity: 45 });
  setTimeout(() => {
    confetti({ ...base, particleCount: 35, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } });
    confetti({ ...base, particleCount: 35, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } });
  }, 350);
}

export function heartRain(colors: string[], ms = 3500) {
  const heart = confetti.shapeFromPath({ path: HEART_PATH });
  const end = Date.now() + ms;
  (function tick() {
    confetti({
      shapes: [heart], colors, scalar: 1.8, particleCount: 2, angle: 270, spread: 120,
      startVelocity: 12, gravity: 0.5, ticks: 400, origin: { x: Math.random(), y: -0.1 },
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(tick);
  })();
}
