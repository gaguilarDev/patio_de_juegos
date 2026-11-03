const FLAGS = [
  "#e85d04",
  "#9d0208",
  "#7b2cbf",
  "#ffb703",
  "#c9184a",
  "#fb8500",
];

export default function PapelPicado() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-30 flex h-7"
      aria-hidden="true"
    >
      {Array.from({ length: 24 }, (_, index) => (
        <span
          key={index}
          className="h-full flex-1"
          style={{
            background: FLAGS[index % FLAGS.length],
            clipPath: "polygon(0 0, 100% 0, 100% 58%, 50% 100%, 0 58%)",
          }}
        />
      ))}
    </div>
  );
}
