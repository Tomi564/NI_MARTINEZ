import { RouteSpinner } from "@/components/shared/RouteSpinner";

export default function Loading() {
  return (
    <div
      className="flex min-h-[55vh] flex-col items-center justify-center bg-[var(--color-gray-bg)]"
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <RouteSpinner size={64} />
      <p className="mt-4 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-text-secondary">
        Cargando…
      </p>
    </div>
  );
}
