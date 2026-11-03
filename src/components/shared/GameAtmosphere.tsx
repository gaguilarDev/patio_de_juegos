import AmbientScene from "./AmbientScene";
import PapelPicado from "./PapelPicado";

export default function GameAtmosphere() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/ofrenda/altar.jpg)" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[#12080c]/55" />
      <AmbientScene />
      <PapelPicado />
    </>
  );
}
