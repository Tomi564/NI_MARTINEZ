import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Neumáticos Importados",
  description: "Política de privacidad de Neumáticos Importados.",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-bg">
      <header className="w-full border-b-[3px] border-orange bg-navy">
        <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
          <nav className="mb-2 flex flex-wrap items-center gap-1 text-[11px] text-[var(--color-text-on-dark)]">
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span className="opacity-40">→</span>
            <span className="text-white/60">Política de Privacidad</span>
          </nav>
          <h1 className="font-condensed text-[28px] font-black uppercase text-white md:text-[32px]">
            Política de Privacidad
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
        <p className="font-sans text-[14px] text-text-secondary">Próximamente</p>
      </div>
    </div>
  );
}
