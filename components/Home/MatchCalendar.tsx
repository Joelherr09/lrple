"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin } from "lucide-react";

import PartidoFechaBoton from "./PartidoFechaBoton";
import { formatChileanDate } from "@/lib/date-utils";

interface Props {
  matches: any[];
}

export default function MatchCalendar({ matches }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const groupedMatches = useMemo(() => {
    const grouped: Record<string, any[]> = {};

    matches.forEach((match) => {
      // Usamos la fecha normalizada que creamos en app/page.tsx
      const dateKey = match.fechaNormalizada || match.fecha.split("T")[0];
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(match);
    });

    return grouped;
  }, [matches]);

  const allDates = useMemo(() => Object.keys(groupedMatches).sort(), [groupedMatches]);

  // ==================== DEFAULT DATE (Próxima fecha) ====================
  useEffect(() => {
    if (allDates.length > 0 && !selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalizar hoy

      const defaultDate = allDates.find((date) => {
        const matchDate = new Date(date);
        return matchDate >= today;
      }) || allDates[allDates.length - 1];

      setSelectedDate(defaultDate);
    }
  }, [allDates, selectedDate]);

  const selectedMatches = groupedMatches[selectedDate] || [];

  // ==================== VISIBLES (5 fechas centradas) ====================
  const getVisibleDates = (): string[] => {
    if (allDates.length <= 5) return allDates;

    const currentIndex = allDates.indexOf(selectedDate);
    let start = currentIndex - 2;

    if (start < 0) start = 0;
    if (start + 5 > allDates.length) start = allDates.length - 5;

    return allDates.slice(start, start + 5);
  };

  const visibleDates = getVisibleDates();

  const currentIndex = allDates.indexOf(selectedDate);
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < allDates.length - 1;

  const goToPrevious = () => {
    if (currentIndex > 0) setSelectedDate(allDates[currentIndex - 1]);
  };

  const goToNext = () => {
    if (currentIndex < allDates.length - 1) setSelectedDate(allDates[currentIndex + 1]);
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#0D0D0D] via-[#131313] to-[#1A1A1A]" />
      <div className="absolute left-0 top-0 h-[240px] w-[240px] rounded-full bg-[#D4B23E]/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[40px] border border-white/10 px-4 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:px-8 lg:py-12">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4B23E]/20 bg-[#D4B23E]/10 px-4 py-2">
              <CalendarDays className="h-4 w-4 text-[#D4B23E]" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D4B23E]">
                Calendario Oficial
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase leading-none text-white lg:text-6xl">
              Partidos
            </h2>
          </div>
        </div>

        {/* NAVEGADOR DE FECHAS */}
        <div className="mb-10 flex items-center justify-center gap-4">
          <button
            onClick={goToPrevious}
            disabled={!canGoLeft}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white disabled:opacity-40 hover:bg-white/10 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-3">
            {visibleDates.map((date) => (
              <PartidoFechaBoton
                key={date}
                date={date}
                isActive={selectedDate === date}
                onClick={() => setSelectedDate(date)}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={!canGoRight}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white disabled:opacity-40 hover:bg-white/10 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* FECHA SELECCIONADA */}
        <div className="mb-8 text-center">
          <p className="text-2xl font-black text-white">
            {formatChileanDate(selectedDate, "long")}
          </p>
        </div>

        {/* PARTIDOS */}
        <div className="grid gap-4 lg:grid-cols-2">
          {selectedMatches.length > 0 ? (
            selectedMatches.map((match: any) => (
              <div
                key={match.id}
                className="group overflow-hidden rounded-[26px] border border-white/10 bg-[#171717]/95 transition hover:-translate-y-1 hover:border-[#D4B23E]/25 hover:bg-[#1D1D1D]"
              >
                <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${
                    match.category.toLowerCase().includes("damas")
                      ? "bg-[#D4B23E]/15 text-[#F3D97A]"
                      : "bg-[#005C1F]/20 text-[#7EE2A8]"
                  }`}>
                    {match.categoryShort}
                  </span>

                  <div className="flex items-center gap-2 text-[#D4B23E]">
                    <Clock3 className="h-4 w-4" />
                    <p className="text-sm font-black">
                      {formatChileanDate(match.fecha, "time")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 px-4 py-5">
                  {/* Local */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image src={match.equipo_local.logo_url} alt="" width={44} height={44} className="rounded-full" />
                      <div>
                        <p className="font-black text-white">{match.equipo_local.nombre}</p>
                        <p className="text-xs text-gray-400">{match.equipo_local.siglas}</p>
                      </div>
                    </div>
                    <div className="text-4xl font-black text-white">{match.sets_local}</div>
                  </div>

                  {/* Visita */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image src={match.equipo_visita.logo_url} alt="" width={44} height={44} className="rounded-full" />
                      <div>
                        <p className="font-black text-white">{match.equipo_visita.nombre}</p>
                        <p className="text-xs text-gray-400">{match.equipo_visita.siglas}</p>
                      </div>
                    </div>
                    <div className="text-4xl font-black text-white">{match.sets_visita}</div>
                  </div>
                </div>

                <div className="border-t border-white/5 bg-black/30 px-4 py-3 text-sm text-gray-300 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#D4B23E]" />
                  {match.cancha}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-2 py-20 text-center text-gray-500">No hay partidos programados para esta fecha.</p>
          )}
        </div>
      </div>
    </section>
  );
}