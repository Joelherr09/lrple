"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Shield, Trophy } from "lucide-react";

interface Props {
  tournaments: any[];
}

export default function StandingsSection({ tournaments }: Props) {
  const [filter, setFilter] = useState<"all" | "men" | "women">("all");

  const filteredTournaments =
    filter === "all"
      ? tournaments
      : tournaments.filter((t) => t.type === filter);

  return (
    <section className="relative overflow-hidden md:rounded-[40px] border border-white/10 bg-[#0F172A] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
      {/* BG EFFECT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,178,62,0.14),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(0,92,31,0.22),transparent_30%)]" />

      <div className="relative z-10 px-0 py-8 md:px-8 md:py-12">
        {/* HEADER */}
        <div className="mb-8 px-5 md:px-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4B23E]/20 bg-[#D4B23E]/10 px-4 py-2">
            <Trophy className="h-4 w-4 text-[#D4B23E]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D4B23E]">
              Tabla Oficial
            </span>
          </div>

          <h2 className="text-4xl font-black uppercase leading-none text-white md:text-6xl">
            Posiciones
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#9CA3AF]">
            Posiciones oficiales de cada categoría
          </p>

          {/* FILTERS */}
          <div className="mt-8 flex flex-wrap gap-3">
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
        <div className="space-y-10 px-5 md:px-0">
          {filteredTournaments.map((tournament) => {
            const standings = tournament.data.standings || [];

            // Agrupar por grupo
            const groupedByGroup = standings.reduce((acc: any, team: any) => {
              const groupKey = team.grupo || "Único";
              if (!acc[groupKey]) acc[groupKey] = [];
              acc[groupKey].push(team);
              return acc;
            }, {});

            // Ordenar los grupos correctamente (A → B → C...)
            const groupEntries = Object.entries(groupedByGroup).sort(([a], [b]) => {
              if (a === "Único") return 1;
              if (b === "Único") return -1;
              return a.localeCompare(b); // Orden alfabético
            });

            return (
              <div
                key={tournament.data.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#131D2E]/90 backdrop-blur-sm"
              >
                {/* TOURNAMENT HEADER */}
                <div className="flex items-center justify-between border-b border-white/5 px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                        tournament.type === "women" ? "bg-pink-500/15" : "bg-blue-500/15"
                      }`}
                    >
                      <Shield
                        className={`h-5 w-5 ${
                          tournament.type === "women" ? "text-pink-400" : "text-blue-400"
                        }`}
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-black uppercase text-white">
                        {tournament.name}
                      </h3>
                      <p className="text-xs text-[#7C8799]">
                        {standings.length} equipos
                      </p>
                    </div>
                  </div>

                  <button className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition hover:border-[#D4B23E] hover:bg-[#D4B23E] hover:text-black">
                    Ver todo
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* GROUPS */}
                {groupEntries.map(([groupName, groupTeams]) => (
                  <div key={groupName} className="border-b border-white/5 last:border-b-0">
                    {/* Group Header */}
                    {groupName !== "Único" && (
                      <div className="bg-black/40 px-5 py-3 border-b border-white/5">
                        <p className="text-sm font-black uppercase tracking-widest text-[#D4B23E]">
                          Grupo {groupName}
                        </p>
                      </div>
                    )}

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                      <div className="min-w-[520px] md:min-w-full">
                        {/* HEADER */}
                        <div className="grid grid-cols-[38px_0.5fr_52px_48px_60px] border-b border-white/5 bg-black/30 px-4 py-3 text-[10px] font-black uppercase tracking-[0.5px] text-[#8B98AE] md:grid-cols-[48px_1.8fr_70px_60px_85px_70px_95px_70px]">
                          <div className="text-center">#</div>
                          <div>Equipo</div>
                          <div className="text-center">Pts</div>
                          <div className="text-center">PJ</div>
                          <div className="text-center">Sets</div>

                          <div className="hidden md:block text-center">PG</div>
                          <div className="hidden md:block text-center">SG/SP</div>
                          <div className="hidden md:block text-center">DIF</div>
                        </div>

                        {/* ROWS */}
                        {(groupTeams as any[]).map((team, index) => (
                          <div
                            key={team.equipo_id}
                            className="grid grid-cols-[38px_0.5fr_52px_48px_60px] items-center border-b border-white/5 px-4 py-3 transition hover:bg-white/[0.03] md:grid-cols-[48px_1.8fr_70px_60px_85px_70px_95px_70px]"
                          >
                            <div className="flex justify-center">
                              <div
                                className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black md:h-8 md:w-8 ${
                                  index === 0
                                    ? "bg-[#D4B23E] text-black"
                                    : index === 1
                                    ? "bg-[#CBD5E1] text-black"
                                    : index === 2
                                    ? "bg-amber-700 text-white"
                                    : "bg-white/10 text-white"
                                }`}
                              >
                                {index + 1}
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 pr-2">
                              <Image
                                src={team.logo_url}
                                alt={team.nombre}
                                width={28}
                                height={28}
                                className="h-7 w-7 rounded-full border border-white/20 object-cover md:h-9 md:w-9"
                              />
                              <div className="min-w-0">
                                <p className="truncate text-sm font-black text-white">
                                  {team.siglas}
                                </p>
                                <p className="truncate text-[11px] text-[#8B98AE] md:text-xs">
                                  {team.nombre}
                                </p>
                              </div>
                            </div>

                            <div className="text-center text-lg font-black text-white">
                              {team.pts}
                            </div>
                            <div className="text-center text-sm font-bold text-[#D1D5DB]">
                              {team.pj}
                            </div>
                            <div className="text-center text-sm font-bold text-[#D1D5DB]">
                              {team.sg}/{team.sp}
                            </div>

                            <div className="hidden md:block text-center text-sm font-bold text-[#D1D5DB]">
                              {team.pg}
                            </div>
                            <div className="hidden md:block text-center text-sm font-bold text-[#D1D5DB]">
                              {team.sg}/{team.sp}
                            </div>
                            <div
                              className={`hidden md:block text-center text-sm font-black ${
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
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}