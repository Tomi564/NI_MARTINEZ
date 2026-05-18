"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CSSProperties } from "react";

const selectArrowDataUri = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M2 2L6 6L10 2' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>`,
);

const selectArrowStyle: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,${selectArrowDataUri}")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "12px 8px",
};

const anchos = ["155", "165", "175", "185", "195", "205", "215", "225", "235", "245", "255", "265", "275"] as const;
const perfiles = ["40", "45", "50", "55", "60", "65", "70", "75", "80"] as const;
const rodados = ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22"] as const;

const LABEL_CLASS =
  "mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-on-dark)]";
const SELECT_CLASS =
  "min-w-[80px] cursor-pointer appearance-none rounded-[4px] border border-[var(--color-navy-border)] bg-[var(--color-navy-surface)] px-3 py-[10px] text-[14px] font-bold text-white";

type BuscadorCompactoProps = {
  defaultAncho?: string;
  defaultPerfil?: string;
  defaultRodado?: string;
};

export default function BuscadorCompacto({
  defaultAncho = "185",
  defaultPerfil = "65",
  defaultRodado = "15",
}: BuscadorCompactoProps) {
  const router = useRouter();
  const [ancho, setAncho] = useState(defaultAncho);
  const [perfil, setPerfil] = useState(defaultPerfil);
  const [rodado, setRodado] = useState(defaultRodado);

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
      <div className="flex flex-wrap gap-3">
        <SelectGroup label="Ancho" value={ancho} onChange={setAncho} options={anchos} />
        <Separator>/</Separator>
        <SelectGroup label="Perfil" value={perfil} onChange={setPerfil} options={perfiles} />
        <Separator>R</Separator>
        <SelectGroup label="Rodado" value={rodado} onChange={setRodado} options={rodados} />
      </div>
      <button
        type="button"
        onClick={() => router.push(`/neumaticos/${ancho}-${perfil}-R${rodado}`)}
        className="inline-flex h-[44px] shrink-0 items-center gap-2 rounded-[4px] bg-orange px-6 text-[12px] font-extrabold uppercase tracking-[0.07em] text-white transition-colors duration-150 hover:bg-[var(--color-orange-hover)]"
      >
        <SearchIcon />
        Buscar
      </button>
    </div>
  );
}

function SelectGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="flex flex-col">
      <label className={LABEL_CLASS}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={SELECT_CLASS}
        style={selectArrowStyle}
      >
        {options.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}

function Separator({ children }: { children: string }) {
  return (
    <div className="self-end pb-[10px] text-[18px] font-black text-[var(--color-buscador-separator)]">
      {children}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <line x1="16.65" y1="16.65" x2="22" y2="22" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
