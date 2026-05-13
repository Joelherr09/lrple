"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Shield,
  Trophy,
} from "lucide-react";

interface Props {
  tournaments: any[];
}

export default function StandingsSection({
  tournaments,
}: Props) {
  const [filter, setFilter] = useState<
    "all" | "men" | "women"
  >("all");

  const filteredTournaments =
    filter === "all"
      ? tournaments
      : tournaments.filter(
          (t) => t.type === filter
        );

  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0F172A] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
      {/* BG EFFECT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,178,62,0.14),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(0,92,31,0.22),transparent_30%)]" />

      <div className="relative z-10 px-4 py-10 lg:px-8 lg:py-12">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4B23E]/20 bg-[#D4B23E]/10 px-4 py-2">
              <Trophy className="h-4 w-4 text-[#D4B23E]" />

              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D4B23E]">
                Tabla Oficial
              </span>
            </div>

            <h2 className="text-4xl font-black uppercase leading-none text-white lg:text-6xl">
              Standings
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#9CA3AF] lg:text-base">
              Posiciones oficiales de cada categoría de la
              Liga Regional Panadería La Estrella.
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.15em] transition ${
                filter === "all"
                  ? "bg-white text-[#111827]"
                  : "border border-white/10 bg-white/5 text-[#D1D5DB] hover:border-white/20 hover:bg-white/10"
              }`}
            >
              Todas
            </button>

            <button
              onClick={() => setFilter("men")}
              className={`rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.15em] transition ${
                filter === "men"
                  ? "bg-blue-500 text-white"
                  : "border border-white/10 bg-white/5 text-[#D1D5DB] hover:border-blue-400/30 hover:bg-blue-500/10"
              }`}
            >
              Varones
            </button>

            <button
              onClick={() => setFilter("women")}
              className={`rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.15em] transition ${
                filter === "women"
                  ? "bg-pink-500 text-white"
                  : "border border-white/10 bg-white/5 text-[#D1D5DB] hover:border-pink-400/30 hover:bg-pink-500/10"
              }`}
            >
              Damas
            </button>
          </div>
        </div>

        {/* TABLES */}
        <div className="space-y-10">
          {filteredTournaments.map((tournament) => (
            <div
              key={tournament.data.id}
              className="overflow-hidden rounded-[30px] border border-white/10 bg-[#131D2E]/90 backdrop-blur-sm"
            >
              {/* TOURNAMENT HEADER */}
              <div className="flex flex-col gap-4 border-b border-white/5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      tournament.type === "women"
                        ? "bg-pink-500/15"
                        : "bg-blue-500/15"
                    }`}
                  >
                    <Shield
                      className={`h-6 w-6 ${
                        tournament.type === "women"
                          ? "text-pink-400"
                          : "text-blue-400"
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase text-white lg:text-2xl">
                      {tournament.name}
                    </h3>

                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7C8799]">
                      {
                        tournament.data.standings.length
                      }{" "}
                      equipos participantes
                    </p>
                  </div>
                </div>

                <button className="group inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-[#D4B23E]/30 hover:bg-[#D4B23E] hover:text-[#111827]">
                  Ver Tabla

                  <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">
                {/* HEADER */}
                <div className="grid min-w-[760px] grid-cols-[60px_1.4fr_80px_80px_100px_90px_110px_90px] border-b border-white/5 bg-black/10 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#8B98AE]">
                  <div>#</div>
                  <div>Equipo</div>
                  <div className="text-center">
                    Pts
                  </div>
                  <div className="text-center">
                    PJ
                  </div>
                  <div className="text-center">
                    Sets
                  </div>
                  <div className="text-center">
                    PG
                  </div>
                  <div className="text-center">
                    SG/SP
                  </div>
                  <div className="text-center">
                    DIF
                  </div>
                </div>

                {/* ROWS */}
                {tournament.data.standings.map(
                  (
                    team: any,
                    index: number
                  ) => (
                    <div
                      key={team.equipo_id}
                      className="grid min-w-[760px] grid-cols-[60px_1.4fr_80px_80px_100px_90px_110px_90px] items-center border-b border-white/5 px-5 py-4 transition hover:bg-white/[0.03]"
                    >
                      {/* POSITION */}
                      <div>
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black ${
                            index === 0
                              ? "bg-[#D4B23E] text-[#111827]"
                              : index === 1
                              ? "bg-[#CBD5E1] text-[#111827]"
                              : index === 2
                              ? "bg-[#B45309] text-white"
                              : "bg-white/5 text-white"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </div>

                      {/* TEAM */}
                      <div className="flex items-center gap-3">
                        <Image
                          src={team.logo_url}
                          alt={team.nombre}
                          width={42}
                          height={42}
                          className="rounded-full border border-white/10 object-cover"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-black uppercase text-white lg:text-base">
                            {team.siglas}
                          </p>

                          <p className="truncate text-xs text-[#8B98AE] lg:text-sm">
                            {team.nombre}
                          </p>
                        </div>
                      </div>

                      {/* STATS */}
                      <div className="text-center text-xl font-black text-white">
                        {team.pts}
                      </div>

                      <div className="text-center text-sm font-bold text-[#D1D5DB]">
                        {team.pj}
                      </div>

                      <div className="text-center text-sm font-bold text-[#D1D5DB]">
                        {team.sg}/{team.sp}
                      </div>

                      <div className="text-center text-sm font-bold text-[#D1D5DB]">
                        {team.pg}
                      </div>

                      <div className="text-center text-sm font-bold text-[#D1D5DB]">
                        {team.sg}/{team.sp}
                      </div>

                      <div
                        className={`text-center text-sm font-black ${
                          team.dif > 0
                            ? "text-[#22C55E]"
                            : team.dif < 0
                            ? "text-[#EF4444]"
                            : "text-[#D1D5DB]"
                        }`}
                      >
                        {team.dif > 0 ? "+" : ""}
                        {team.dif}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}