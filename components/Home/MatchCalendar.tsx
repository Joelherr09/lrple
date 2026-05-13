"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import {
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";

import PartidoFechaBoton from "./PartidoFechaBoton";

interface Props {
  matches: any[];
}

export default function MatchCalendar({
  matches,
}: Props) {
  const scrollRef =
    useRef<HTMLDivElement>(null);

  const activeButtonRef =
    useRef<HTMLDivElement>(null);

  const groupedMatches = useMemo(() => {
    const grouped: Record<string, any[]> = {};

    matches.forEach((match) => {
      const dateKey =
        match.fecha.split("T")[0];

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      grouped[dateKey].push(match);
    });

    return grouped;
  }, [matches]);

  function formatMatchTime(
    dateString: string
  ) {
    return new Intl.DateTimeFormat(
      "es-CL",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Santiago",
      }
    ).format(new Date(dateString));
  }

  const availableDates = Object.keys(
    groupedMatches
  ).sort();

  const today = new Date();

  const defaultDate =
    availableDates.find((date) => {
      return (
        new Date(`${date}T00:00:00`) >=
        today
      );
    }) ||
    availableDates[
      availableDates.length - 1
    ];

  const [selectedDate, setSelectedDate] =
    useState(defaultDate);

  const selectedMatches =
    groupedMatches[selectedDate] || [];

  /* CENTER ACTIVE DATE */
  useEffect(() => {
    if (
      scrollRef.current &&
      activeButtonRef.current
    ) {
      const container =
        scrollRef.current;

      const activeEl =
        activeButtonRef.current;

      const scrollPosition =
        activeEl.offsetLeft -
        container.offsetWidth / 2 +
        activeEl.offsetWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [selectedDate]);

  return (
    <section className="relative">
      {/* BG */}
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#0D0D0D] via-[#131313] to-[#1A1A1A]" />

      {/* GOLD LIGHT */}
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

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#A1A1AA] lg:text-base">
              Fixture oficial de la Liga
              Regional Panadería La
              Estrella.
            </p>
          </div>

          <button className="group flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:border-[#D4B23E]/40 hover:bg-[#D4B23E] hover:text-black">
            Ver Calendario

            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>

        {/* DATE SELECTOR */}
        <div
          ref={scrollRef}
          className="mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          <div className="flex min-w-max gap-3 px-1">
            {availableDates.map((date) => (
              <div
                key={date}
                ref={
                  selectedDate === date
                    ? activeButtonRef
                    : null
                }
              >
                <PartidoFechaBoton
                  date={date}
                  isActive={
                    selectedDate === date
                  }
                  onClick={() =>
                    setSelectedDate(date)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* MATCHES */}
        <div className="grid gap-4 lg:grid-cols-2">
          {selectedMatches.map(
            (match: any) => (
              <div
                key={match.id}
                className="group overflow-hidden rounded-[26px] border border-white/10 bg-[#171717]/95 transition duration-300 hover:-translate-y-1 hover:border-[#D4B23E]/25 hover:bg-[#1D1D1D]"
              >
                {/* TOP */}
                <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
                        match.category
                          .toLowerCase()
                          .includes(
                            "damas"
                          )
                          ? "bg-[#D4B23E]/15 text-[#F3D97A]"
                          : "bg-[#005C1F]/20 text-[#7EE2A8]"
                      }`}
                    >
                      {match.categoryShort}
                    </span>

                    <span
                      className={`h-2 w-2 rounded-full ${
                        match.estado ===
                        "finalizado"
                          ? "bg-[#22C55E]"
                          : "bg-[#F59E0B]"
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[#D4B23E]">
                    <Clock3 className="h-4 w-4" />

                    <p className="text-sm font-black">
                      {formatMatchTime(
                        match.fecha
                      )}
                    </p>
                  </div>
                </div>

                {/* BODY */}
                <div className="space-y-4 px-4 py-4">
                  {/* LOCAL */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Image
                        src={
                          match.equipo_local
                            .logo_url
                        }
                        alt={
                          match.equipo_local
                            .nombre
                        }
                        width={42}
                        height={42}
                        className="rounded-full border border-white/10 object-cover"
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black uppercase text-white lg:text-base">
                          {
                            match.equipo_local
                              .nombre
                          }
                        </p>

                        <p className="text-xs font-semibold uppercase tracking-wide text-[#8B8B8B]">
                          {
                            match.equipo_local
                              .siglas
                          }
                        </p>
                      </div>
                    </div>

                    <div className="min-w-[44px] text-center text-3xl font-black text-white lg:text-4xl">
                      {match.sets_local}
                    </div>
                  </div>

                  {/* VISITA */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Image
                        src={
                          match.equipo_visita
                            .logo_url
                        }
                        alt={
                          match.equipo_visita
                            .nombre
                        }
                        width={42}
                        height={42}
                        className="rounded-full border border-white/10 object-cover"
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black uppercase text-white lg:text-base">
                          {
                            match.equipo_visita
                              .nombre
                          }
                        </p>

                        <p className="text-xs font-semibold uppercase tracking-wide text-[#8B8B8B]">
                          {
                            match.equipo_visita
                              .siglas
                          }
                        </p>
                      </div>
                    </div>

                    <div className="min-w-[44px] text-center text-3xl font-black text-white lg:text-4xl">
                      {match.sets_visita}
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center gap-2 border-t border-white/5 bg-black/20 px-4 py-3">
                  <MapPin className="h-4 w-4 text-[#D4B23E]" />

                  <p className="truncate text-xs font-semibold text-[#C7C7C7]">
                    {match.cancha}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}