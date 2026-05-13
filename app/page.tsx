// app/page.tsx

import Image from "next/image";
import Link from "next/link";

import MatchCalendar from "@/components/Home/MatchCalendar";
import StandingsSection from "@/components/Home/StandingsSection";

const tournamentConfigs = [
  {
    name: "TC Varones",
    url: "https://4volei.vercel.app/api/public/tournaments?id=17d76966-b9ae-40ba-8dc8-935399c73f5e&standings=true",
    type: "men",
    shortName: "TC V",
  },
  {
    name: "Sub 17 Varones",
    url: "https://4volei.vercel.app/api/public/tournaments?id=3409eea3-ebb0-4bb9-a435-cd6864495002&standings=true",
    type: "men",
    shortName: "S17 V",
  },
  {
    name: "TC Damas",
    url: "https://4volei.vercel.app/api/public/tournaments?id=d50f19ff-f2b3-4145-84e2-045c7851e2a4&standings=true",
    type: "women",
    shortName: "TC D",
  },
  {
    name: "Sub 16 Damas",
    url: "https://4volei.vercel.app/api/public/tournaments?id=ccbcca56-98bd-44ce-9135-f0d530b169e4&standings=true",
    type: "women",
    shortName: "S16 D",
  },
  {
    name: "Sub 14 Damas",
    url: "https://4volei.vercel.app/api/public/tournaments?id=79dedf84-7acc-4a81-b68a-4ff2c03c4c55&standings=true",
    type: "women",
    shortName: "S14 D",
  },
  {
    name: "Sub 12 Damas",
    url: "https://4volei.vercel.app/api/public/tournaments?id=9fcd8b98-328f-4e6d-a98e-0c5cf79aa104&standings=true",
    type: "women",
    shortName: "S12 D",
  },
];

async function getTournament(url: string) {
  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Error fetching tournament");
  }

  return res.json();
}


export default async function HomePage() {
  const tournaments = await Promise.all(
    tournamentConfigs.map(async (config) => {
      const response = await getTournament(config.url);

      return {
        ...config,
        data: response.data,
      };
    })
  );

const allMatches = tournaments
  .flatMap((tournament) =>
    tournament.data.partidos.map((match: any) => {
      const fechaOriginal = match.fecha;

      // Normalizamos la fecha a hora de Chile de forma segura
      let fechaNormalizada: string;

      if (fechaOriginal) {
        const date = new Date(fechaOriginal);
        
        // Forzamos la fecha según zona horaria de Santiago
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "America/Santiago",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };

        const formatter = new Intl.DateTimeFormat("es-CL", options);
        const parts = formatter.formatToParts(date);
        
        const year = parts.find(p => p.type === "year")?.value;
        const month = parts.find(p => p.type === "month")?.value;
        const day = parts.find(p => p.type === "day")?.value;

        fechaNormalizada = `${year}-${month}-${day}`;
      } else {
        fechaNormalizada = fechaOriginal.split("T")[0];
      }

      return {
        ...match,
        category: tournament.name,
        categoryShort: tournament.shortName,
        tournamentType: tournament.type,
        fechaNormalizada,        // ← Esta es la clave
        fechaOriginal,
      };
    })
  )
  .sort((a, b) => new Date(a.fechaOriginal).getTime() - new Date(b.fechaOriginal).getTime());

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0b0b] text-white">
<section className="relative isolate overflow-hidden border-b border-white/10">
  {/* BG */}
  <div className="absolute inset-0 overflow-hidden">
    <Image
      src="/logos/PanaderiaLaEstrella.jpg"
      alt="Background"
      fill
      priority
      className="object-cover opacity-[0.06] blur-[2px]"
    />

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,178,62,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(0,92,31,0.24),transparent_26%)]" />

    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-[#0b0b0b]" />
  </div>

  {/* LIGHTS */}
  <div className="absolute -left-32 top-[-100px] h-[260px] w-[260px] rounded-full bg-[#D4B23E]/20 blur-3xl" />

  <div className="absolute -right-32 bottom-[-120px] h-[260px] w-[260px] rounded-full bg-[#005C1F]/25 blur-3xl" />

  <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:py-12 lg:px-6 lg:py-10">
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      {/* LEFT */}
      <div className="max-w-4xl">
        {/* BADGE */}
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4B23E]" />

          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#d0d0d0]">
            Asociación de Vóleibol Limarí
          </p>
        </div>

        {/* LOGOS */}
        <div className="mb-6 flex items-center gap-4">
          <Image
            src="/logos/asvoli.jpg"
            alt="Asvoli"
            width={64}
            height={64}
            className="rounded-full border border-white/15 shadow-2xl"
          />

          <div className="h-10 w-px bg-white/10" />

          <Image
            src="/logos/PanaderiaLaEstrella.jpg"
            alt="Panadería La Estrella"
            width={64}
            height={64}
            className="rounded-full border border-white/15 shadow-2xl"
          />
        </div>

        {/* TITLE */}
        <h1 className="max-w-5xl text-4xl font-black uppercase leading-[0.92] tracking-[-2px] sm:text-5xl lg:text-5xl xl:text-[76px]">
          <span className="block">
            Liga Regional
          </span>

          <span className="mt-1 block bg-gradient-to-r from-[#D4B23E] via-[#ffe38b] to-[#D4B23E] bg-clip-text text-transparent">
            Panadería La Estrella
          </span>
        </h1>

        {/* TEXT */}
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#c7c7c7] lg:text-lg">
          Calendario oficial, standings y cobertura
          digital de la competencia organizada por la
          Asociación de Vóleibol Limarí.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#partidos"
            className="group relative overflow-hidden rounded-full bg-[#D4B23E] px-7 py-3.5 text-center text-xs font-black uppercase tracking-[0.22em] text-[#111111] transition duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(212,178,62,0.28)]"
          >
            <span className="relative z-10">
              Ver Partidos
            </span>

            <div className="absolute inset-0 translate-y-full bg-white/20 transition duration-300 group-hover:translate-y-0" />
          </Link>

          <Link
            href="#standings"
            className="rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-center text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur-xl transition duration-300 hover:border-[#D4B23E]/30 hover:bg-white/[0.08]"
          >
            Tabla de Posiciones
          </Link>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[520px]">
        {/* GLOW */}
        <div className="absolute inset-0 scale-90 rounded-full bg-[#D4B23E]/20 blur-3xl" />

        {/* CARD */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-square overflow-hidden rounded-[22px]">
            <Image
              src="/galeria/liga.jpg"
              alt="Liga Regional"
              fill
              priority
              className="object-cover transition duration-700 hover:scale-105"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* FLOATING BADGE */}
            <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4B23E]">
                Liga Oficial
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                Temporada 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ================= PARTIDOS ================= */}
      <section
        id="partidos"
        className="relative border-y border-white/5 bg-[#111111]"
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#D4B23E]/10 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[240px] w-[240px] rounded-full bg-[#005C1F]/20 blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 lg:px-6 lg:py-24">
          <MatchCalendar matches={allMatches} />
        </div>
      </section>

      {/* ================= STANDINGS ================= */}
      <section
        id="standings"
        className="relative overflow-hidden border-y border-white/5 bg-[#151515]"
      >
        {/* BG */}
        <div className="absolute inset-0">
          <div className="absolute left-[-100px] top-[-100px] h-[280px] w-[280px] rounded-full bg-[#005C1F]/15 blur-3xl" />

          <div className="absolute bottom-[-100px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[#D4B23E]/10 blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-0 md:px-5 py-16 lg:px-6 lg:py-24">
          <StandingsSection tournaments={tournaments} />
        </div>
      </section>

      {/* ================= SPONSORS ================= */}
      <section className="relative bg-[#0b0b0b] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,178,62,0.12),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-6">
          <div className="mb-14 text-center">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#D4B23E]">
              Sponsors Oficiales
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase tracking-[-2px] lg:text-6xl">
              Partners
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                image: "/logos/PanaderiaLaEstrella.jpg",
                title: "Sponsor Principal",
              },
              {
                image: "/logos/muni-ovalle.jpg",
                title: "Municipalidad de Ovalle",
              },
              {
                image: "/logos/muni-puni.jpg",
                title: "Municipalidad de Punitaqui",
              },
            ].map((sponsor, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#D4B23E]/30 hover:bg-white/[0.05]"
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4B23E]/10 via-transparent to-[#005C1F]/20" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <Image
                    src={sponsor.image}
                    alt={sponsor.title}
                    width={220}
                    height={220}
                    className="object-contain transition duration-500 group-hover:scale-105"
                  />

                  <p className="mt-6 text-center text-lg font-black uppercase tracking-wide text-white">
                    {sponsor.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}