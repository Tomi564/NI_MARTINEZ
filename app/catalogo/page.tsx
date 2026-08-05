import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo | Neumáticos Importados",
  description: "Nuestro catálogo completo estará disponible próximamente.",
};

export default function CatalogoPage() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-[var(--color-navy)] px-6 text-center">
      <div className="mb-6 opacity-20">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <circle cx="40" cy="40" r="36" stroke="white" strokeWidth="4" />
          <circle cx="40" cy="40" r="24" stroke="white" strokeWidth="3" />
          <circle cx="40" cy="40" r="8" fill="white" />
          <line x1="40" y1="4" x2="40" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="64" x2="40" y2="76" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <line x1="4" y1="40" x2="16" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <line x1="64" y1="40" x2="76" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div
        className="mb-5 inline-flex items-center gap-2"
        style={{
          background: "rgba(232,78,15,0.15)",
          border: "1px solid rgba(232,78,15,0.3)",
          borderRadius: 3,
          padding: "5px 14px",
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#E84E0F" }} />
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#E84E0F",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          En preparación
        </span>
      </div>

      <h1 className="mb-4 font-condensed text-[32px] font-black uppercase leading-none text-white md:text-[48px]">
        Catálogo <span style={{ color: "#E84E0F" }}>próximamente</span>
      </h1>

      <p className="mb-8 max-w-[400px] text-[14px] leading-relaxed text-[#8FAABB]">
        Estamos cargando nuestro stock completo de neumáticos. En breve vas a poder ver todos
        nuestros productos con precios y disponibilidad en tiempo real.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-[3px] bg-[var(--color-orange)] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-white transition-colors hover:bg-[var(--color-orange-hover)]"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
