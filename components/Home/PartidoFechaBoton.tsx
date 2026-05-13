// components/PartidoFechaBoton.tsx

"use client";

import { formatChileanDate } from "@/lib/date-utils";

interface PartidoFechaBotonProps {
  date: string;
  isActive: boolean;
  onClick: () => void;
}

const DAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export default function PartidoFechaBoton({
  date,
  isActive,
  onClick,
}: PartidoFechaBotonProps) {
  // Seguridad extra
  if (!date) {
    return <div className="min-w-[88px] h-[120px] rounded-2xl bg-red-500/10">Error</div>;
  }

  const [year, month, day] = date.split("-").map(Number);

  const parsedDate = new Date(year, month - 1, day);

  const dayName = DAYS[parsedDate.getDay()] || "—";
  const dayNumber = parsedDate.getDate();
  const monthName = MONTHS[parsedDate.getMonth()] || "—";

  return (
    <button
      onClick={onClick}
      title={formatChileanDate(date, "long")}
      className={`
        group relative flex min-w-[88px] snap-start flex-col items-center justify-center
        rounded-2xl border px-4 py-3.5 transition-all duration-200 active:scale-[0.97]
        ${isActive
          ? "border-[#D4B23E] bg-[#D4B23E] text-white shadow-lg shadow-[#D4B23E]/30"
          : "border-[#e5e5e5] bg-white text-[#111] hover:border-[#d4d4d4] hover:bg-[#fafafa] hover:shadow"
        }
      `}
    >
      <span className={`text-xs font-bold uppercase tracking-[0.15em] ${isActive ? "text-white/80" : "text-[#888]"}`}>
        {dayName}
      </span>

      <span className="mt-1 text-3xl font-black leading-none tracking-tighter">
        {dayNumber}
      </span>

      <span className={`mt-1 text-xs font-semibold uppercase tracking-[0.12em] ${isActive ? "text-white/80" : "text-[#777]"}`}>
        {monthName}
      </span>
    </button>
  );
}