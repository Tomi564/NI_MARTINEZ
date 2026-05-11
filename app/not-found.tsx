import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-6">
      <svg
        aria-hidden
        width="400"
        height="400"
        viewBox="0 0 340 340"
        className="pointer-events-none absolute opacity-[0.05]"
      >
        <circle
          cx="170"
          cy="170"
          r="140"
          stroke="white"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="170"
          cy="170"
          r="100"
          stroke="white"
          strokeWidth="7"
          fill="none"
        />
        <circle
          cx="170"
          cy="170"
          r="55"
          stroke="white"
          strokeWidth="5"
          fill="none"
        />
        <circle cx="170" cy="170" r="20" fill="white" />
      </svg>

      <div className="relative z-[1] max-w-md text-center">
        <p className="font-condensed text-[120px] font-black leading-none text-orange">404</p>
        <h1 className="mt-2 font-condensed text-[24px] font-black uppercase text-white">
          Página no encontrada
        </h1>
        <p className="mb-6 mt-2 font-sans text-[14px] font-normal text-text-secondary">
          El neumático que buscás no está en la ruta.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-w-[180px] justify-center rounded border-2 border-orange bg-orange px-6 py-3 font-sans text-[13px] font-bold text-white"
          >
            Volver al inicio
          </Link>
          <Link
            href="/catalogo"
            className="inline-flex min-w-[180px] justify-center rounded border-2 border-white bg-transparent px-6 py-3 font-sans text-[13px] font-bold text-white"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
