"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type CatalogoSearchParams = {
  ancho?: string;
  perfil?: string;
  rodado?: string;
  marca?: string;
  tipo?: string;
  medida?: string;
  badge?: string;
  precio_min?: string;
  precio_max?: string;
  orden?: string;
};

const PRECIO_SLIDER_MAX = 300_000;

function parsePrecioFromFilter(value: string | undefined, fallback: number): number {
  if (value === undefined || value === "") return fallback;
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(Math.max(n, 0), PRECIO_SLIDER_MAX);
}

type SectionState = {
  medida: boolean;
  marca: boolean;
  tipo: boolean;
  precio: boolean;
};

const anchos = ["155","165","175","185","195","205","215","225","235","245","255","265","275"];
const perfiles = ["40","45","50","55","60","65","70","75","80"];
const rodados = ["13","14","15","16","17","18","19","20","21","22"];
const marcas = ["Pirelli","Dunlop","Bridgestone","Goodyear","Corven","Michelin","Continental","Hankook","Maxxis","Fate"];
const tipos = ["Todos","Autos","SUV y 4x4","Comerciales","Motos"];

export default function Filtros({ initialFilters }: { initialFilters: CatalogoSearchParams }) {
  const router = useRouter();
  const pathname = usePathname();

  const [ancho, setAncho] = useState(initialFilters.ancho ?? "185");
  const [perfil, setPerfil] = useState(initialFilters.perfil ?? "65");
  const [rodado, setRodado] = useState(initialFilters.rodado ?? "15");
  const [marca, setMarca] = useState(initialFilters.marca ?? "");
  const [tipo, setTipo] = useState(initialFilters.tipo ?? "Todos");
  const [precioMin, setPrecioMin] = useState(() => parsePrecioFromFilter(initialFilters.precio_min, 0));
  const [precioMax, setPrecioMax] = useState(() =>
    parsePrecioFromFilter(initialFilters.precio_max, PRECIO_SLIDER_MAX),
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sections, setSections] = useState<SectionState>({
    medida: true,
    marca: true,
    tipo: true,
    precio: false,
  });

  useEffect(() => {
    setPrecioMin(parsePrecioFromFilter(initialFilters.precio_min, 0));
    setPrecioMax(parsePrecioFromFilter(initialFilters.precio_max, PRECIO_SLIDER_MAX));
  }, [initialFilters.precio_min, initialFilters.precio_max]);

  const hasActiveFilters = useMemo(
    () =>
      Boolean(
        initialFilters.ancho || initialFilters.perfil || initialFilters.rodado ||
        initialFilters.marca || initialFilters.tipo || initialFilters.medida || initialFilters.badge ||
        initialFilters.precio_min || initialFilters.precio_max,
      ),
    [initialFilters],
  );

  const updateParams = (next: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged: Record<string, string | undefined> = { ...initialFilters, ...next };
    Object.entries(merged).forEach(([key, value]) => {
      if (value && value !== "Todos") params.set(key, value);
    });
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setMobileOpen(false);
  };

  const clearFilters = () => {
    router.push(pathname);
    setMobileOpen(false);
  };

  const panelProps = {
    sections, setSections, hasActiveFilters, clearFilters,
    ancho, perfil, rodado, marca, tipo, precioMin, precioMax,
    setAncho, setPerfil, setRodado, setMarca, setTipo, setPrecioMin, setPrecioMax,
    applyMedida: () =>
      updateParams({ ancho, perfil, rodado, medida: undefined }),
    applyMarca: (value: string) => updateParams({ marca: value || undefined }),
    applyTipo: (value: string) => updateParams({ tipo: value === "Todos" ? undefined : value.toLowerCase() }),
    applyPrecio: () => {
      const lo = Math.min(precioMin, precioMax);
      const hi = Math.max(precioMin, precioMax);
      const isFullRange = lo <= 0 && hi >= PRECIO_SLIDER_MAX;
      updateParams(
        isFullRange
          ? { precio_min: undefined, precio_max: undefined }
          : { precio_min: String(lo), precio_max: String(hi) },
      );
    },
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-24 right-4 z-40 rounded-full bg-navy px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-lg md:hidden"
      >
        Filtros
      </button>

      <aside className="hidden w-[220px] shrink-0 md:block">
        <Panel {...panelProps} />
      </aside>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ duration: 0.22 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-auto rounded-t-[12px] bg-gray-bg p-5 md:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="font-condensed text-[16px] font-black uppercase text-text-primary">Filtros</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary"
                  aria-label="Cerrar filtros"
                >
                  ✕
                </button>
              </div>
              <Panel {...panelProps} />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

type PanelProps = {
  sections: SectionState;
  setSections: Dispatch<SetStateAction<SectionState>>;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  ancho: string; perfil: string; rodado: string;
  marca: string; tipo: string;
  precioMin: number; precioMax: number;
  setAncho: (v: string) => void; setPerfil: (v: string) => void; setRodado: (v: string) => void;
  setMarca: (v: string) => void; setTipo: (v: string) => void;
  setPrecioMin: (v: number) => void; setPrecioMax: (v: number) => void;
  applyMedida: () => void;
  applyMarca: (v: string) => void;
  applyTipo: (v: string) => void;
  applyPrecio: () => void;
};

function Panel(props: PanelProps) {
  const formatARS = (v: number) => `$${v.toLocaleString("es-AR")}`;

  return (
    <div className="rounded-[6px] border border-gray-border bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-condensed text-[15px] font-black uppercase text-text-primary">Filtros</h2>
        {props.hasActiveFilters ? (
          <button
            type="button"
            onClick={props.clearFilters}
            className="text-[10px] font-bold uppercase tracking-[0.08em] text-orange hover:opacity-70"
          >
            Limpiar todo
          </button>
        ) : null}
      </div>

      <FilterSection
        title="Por Medida"
        open={props.sections.medida}
        onToggle={() => props.setSections((s) => ({ ...s, medida: !s.medida }))}
      >
        <div className="space-y-2">
          <SelectField label="Ancho" value={props.ancho} onChange={props.setAncho} options={anchos} />
          <SelectField label="Perfil" value={props.perfil} onChange={props.setPerfil} options={perfiles} />
          <SelectField label="Rodado" value={props.rodado} onChange={props.setRodado} options={rodados} />
          <button
            type="button"
            onClick={props.applyMedida}
            className="mt-1 w-full rounded-[4px] bg-orange py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--color-orange-hover)]"
          >
            Aplicar medida
          </button>
        </div>
      </FilterSection>

      <FilterSection
        title="Por Marca"
        open={props.sections.marca}
        onToggle={() => props.setSections((s) => ({ ...s, marca: !s.marca }))}
      >
        <div className="space-y-1.5">
          {marcas.map((item) => {
            const checked = props.marca.toLowerCase() === item.toLowerCase();
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  const next = checked ? "" : item.toLowerCase();
                  props.setMarca(next);
                  props.applyMarca(next);
                }}
                className="flex w-full items-center gap-2 text-left"
              >
                <span
                  className={`flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[2px] border border-orange ${
                    checked ? "bg-orange" : "bg-transparent"
                  }`}
                >
                  {checked ? (
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <path d="M2 5L4.5 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : null}
                </span>
                <span className="text-[11px] font-medium text-text-primary">{item}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection
        title="Tipo de vehículo"
        open={props.sections.tipo}
        onToggle={() => props.setSections((s) => ({ ...s, tipo: !s.tipo }))}
      >
        <div className="space-y-1.5">
          {tipos.map((item) => {
            const checked = props.tipo === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  props.setTipo(item);
                  props.applyTipo(item);
                }}
                className="flex w-full items-center gap-2 text-left"
              >
                <span
                  className={`flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border border-orange ${
                    checked ? "bg-orange" : "bg-transparent"
                  }`}
                >
                  {checked ? <span className="h-[5px] w-[5px] rounded-full bg-white" /> : null}
                </span>
                <span className="text-[11px] font-medium text-text-primary">{item}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection
        title="Rango de precio"
        open={props.sections.precio}
        onToggle={() => props.setSections((s) => ({ ...s, precio: !s.precio }))}
      >
        <p className="mb-2 text-[11px] text-text-secondary">
          {formatARS(props.precioMin)} — {formatARS(props.precioMax)}
        </p>
        <input
          type="range" min={0} max={PRECIO_SLIDER_MAX} step={5000}
          value={props.precioMin}
          onChange={(e) => props.setPrecioMin(Number(e.target.value))}
          className="w-full accent-orange"
        />
        <input
          type="range" min={0} max={PRECIO_SLIDER_MAX} step={5000}
          value={props.precioMax}
          onChange={(e) => props.setPrecioMax(Number(e.target.value))}
          className="w-full accent-orange"
        />
        <button
          type="button"
          onClick={props.applyPrecio}
          className="mt-2 w-full rounded-[4px] bg-orange py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--color-orange-hover)]"
        >
          Aplicar precio
        </button>
      </FilterSection>
    </div>
  );
}

function FilterSection({
  title, open, onToggle, children,
}: {
  title: string; open: boolean; onToggle: () => void; children: ReactNode;
}) {
  return (
    <div className="mb-4 border-b border-gray-border pb-4 last:mb-0 last:border-b-0 last:pb-0">
      <button
        type="button"
        onClick={onToggle}
        className="mb-2 flex w-full items-center justify-between text-left"
      >
        <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-text-primary">{title}</h3>
        <span className="text-[14px] font-bold text-text-secondary">{open ? "−" : "+"}</span>
      </button>
      {open ? children : null}
    </div>
  );
}

function SelectField({
  label, value, options, onChange,
}: {
  label: string; value: string; options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-0.5 block text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[3px] border border-gray-border bg-gray-bg px-3 py-2 text-[12px] font-semibold text-text-primary focus:border-orange focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
