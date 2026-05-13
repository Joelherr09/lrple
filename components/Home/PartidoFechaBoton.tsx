// components/PartidoFechaBoton.tsx

"use client";

interface PartidoFechaBotonProps {
  date: string;
  isActive: boolean;
  onClick: () => void;
}

const DAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

const MONTHS = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

export default function PartidoFechaBoton({
  date,
  isActive,
  onClick,
}: PartidoFechaBotonProps) {
  const parsedDate = new Date(date);

  const dayName = DAYS[parsedDate.getDay()];
  const dayNumber = parsedDate.getDate();
  const monthName = MONTHS[parsedDate.getMonth()];

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex min-w-[84px] snap-start flex-col items-center justify-center
        rounded-2xl border px-4 py-3 transition-all duration-200
        ${
          isActive
            ? "border-[#FF4D00] bg-[#FF4D00] text-white shadow-lg"
            : "border-[#e5e5e5] bg-white text-[#111] hover:border-[#d4d4d4] hover:bg-[#fafafa]"
        }
      `}
    >
      {/* DAY */}
      <span
        className={`
          text-xs font-bold uppercase tracking-[0.15em]
          ${
            isActive
              ? "text-white/80"
              : "text-[#888]"
          }
        `}
      >
        {dayName}
      </span>

      {/* NUMBER */}
      <span className="mt-1 text-3xl font-black leading-none">
        {dayNumber}
      </span>

      {/* MONTH */}
      <span
        className={`
          mt-1 text-xs font-semibold uppercase tracking-[0.12em]
          ${
            isActive
              ? "text-white/80"
              : "text-[#777]"
          }
        `}
      >
        {monthName}
      </span>
    </button>
  );
}