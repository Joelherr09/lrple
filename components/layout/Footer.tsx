import Link from "next/link";
import Image from "next/image";

import {
  Trophy,
  Volleyball,
  Heart,
  Code,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#0a0a0a] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#D4B23E]/10 blur-3xl" />

        <div className="absolute bottom-[-160px] right-[-120px] h-[320px] w-[320px] rounded-full bg-[#005C1F]/20 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,178,62,0.08),transparent_28%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 lg:px-6">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-5">
              <Image
                src="/logos/asvoli.jpg"
                alt="ASVOLI"
                width={70}
                height={70}
                className="rounded-full border border-white/10"
              />

              <div className="h-12 w-px bg-white/10" />

              <Image
                src="/logos/PanaderiaLaEstrella.jpg"
                alt="Panadería La Estrella"
                width={70}
                height={70}
                className="rounded-full border border-white/10"
              />
            </div>

            <div className="mt-7">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#D4B23E]">
                Asociación de Vóleibol Limarí
              </p>

              <h2 className="mt-3 text-3xl font-black uppercase leading-none lg:text-4xl">
                Liga Regional
                <br />
                Panadería La Estrella
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#9CA3AF]">
                Plataforma oficial de la competencia regional.
                Resultados, calendario, standings y cobertura
                digital impulsada por 4Volei.
              </p>
            </div>
          </div>

          {/* NAVEGACIÓN */}
          <div>
            <h3 className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-white">
              Navegación
            </h3>

            <div className="flex flex-col gap-3">
              {[
                {
                  href: "#partidos",
                  label: "Partidos",
                },
                {
                  href: "#standings",
                  label: "Standings",
                },
                {
                  href: "/",
                  label: "Inicio",
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-[#9CA3AF] transition hover:text-white"
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-[#D4B23E] opacity-0 transition group-hover:opacity-100" />

                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* COMUNIDAD */}
          <div>
            <h3 className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-white">
              Comunidad
            </h3>

            {/* INFO */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#7c7c7c]">
                <Heart
                  size={13}
                  className="text-[#D4B23E]"
                />

                <span>
                  Datos deportivos gestionados por
                </span>

                <Link
                  href="https://4volei.vercel.app"
                  target="_blank"
                  className="font-semibold text-[#D4B23E] transition hover:text-[#ffe38b]"
                >
                  4Volei
                </Link>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#7c7c7c]">
                <Code size={13} />

                <span>
                  Desarrollo y tecnología por
                </span>

                <Link
                  href="https://www.joelherr.site/"
                  target="_blank"
                  className="font-semibold text-white transition hover:text-[#D4B23E]"
                >
                  Joel Herrera
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative z-10 border-t border-white/5 bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center lg:flex-row lg:px-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#666]">
            © 2026 Liga Regional Panadería La Estrella
          </p>

          <p className="text-[11px] uppercase tracking-[0.22em] text-[#666]">
            Vóleibol regional con infraestructura digital
          </p>
        </div>
      </div>
    </footer>
  );
}