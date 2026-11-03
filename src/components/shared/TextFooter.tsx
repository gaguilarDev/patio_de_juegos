import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function TextFooter() {
  return (
    <>
      {/* Left Text */}
      <h1
        className={`absolute bottom-5 left-10 -translate-y-1/2 text-5xl font-bold leading-tight text-amber-50 ${playfairDisplay.className}`}
      >
        <span className="text-amber-200/70">Empareja</span> <br /> las fotos
      </h1>

      {/* Right Text */}
      <h1
        className={`absolute bottom-5 right-10 -translate-y-1/2 text-right text-5xl font-bold leading-tight text-amber-50 ${playfairDisplay.className}`}
      >
        para revelar <br />{" "}
        <span className="text-amber-200/70">la sorpresa</span>
      </h1>
    </>
  );
}
