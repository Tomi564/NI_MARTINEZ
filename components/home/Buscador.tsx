"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

type ActiveTab = "medida" | "vehiculo";

const selectArrowDataUri = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M2 2L6 6L10 2' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>`,
);

const selectArrowStyle: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,${selectArrowDataUri}")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "12px 8px",
};

const anchos = ["155","165","175","185","195","205","215","225","235","245","255","265","275"] as const;
const perfiles = ["40","45","50","55","60","65","70","75","80"] as const;
const rodados = ["13","14","15","16","17","18","19","20","21","22"] as const;

const marcasAuto = [
  "Seleccioná","Toyota","Volkswagen","Ford","Chevrolet",
  "Renault","Peugeot","Fiat","Honda","Hyundai","Nissan","Citroën","Jeep",
] as const;

const modeloToyota = ["Corolla","Hilux","RAV4","Yaris","Land Cruiser"] as const;
const years = Array.from({ length: 16 }, (_, idx) => String(2010 + idx));

const LABEL_CLASS = "mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-on-dark)]";
const SELECT_CLASS = "min-w-[80px] cursor-pointer appearance-none rounded-[4px] border border-[var(--color-navy-border)] bg-[var(--color-navy-surface)] px-3 py-[10px] text-[14px] font-bold text-white";

export default function Buscador() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<ActiveTab>("medida");
  const [ancho, setAncho] = useState("185");
  const [perfil, setPerfil] = useState("65");
  const [rodado, setRodado] = useState("15");
  const [marcaAuto, setMarcaAuto] = useState("Seleccioná");
  const [modelo, setModelo] = useState("Seleccioná modelo");
  const [anio, setAnio] = useState(years[0] ?? "2010");

  const modeloOptions = useMemo<string[]>(() => {
    if (marcaAuto === "Toyota") return [...modeloToyota];
    return ["Seleccioná modelo"];
  }, [marcaAuto]);

  return (
    <section className="w-full border-t-[3px] border-b-[3px] border-[var(--color-orange)] bg-[var(--color-navy)]">
      <div className="mx-auto max-w-[1280px] px-6 py-8 md:px-8 md:py-10">
        <h2 className="mb-5 font-condensed text-[20px] font-black uppercase tracking-[0.04em] text-white md:text-[22px]">
          Encontrá tu <span className="text-orange">NEUMÁTICO</span>
        </h2>

        <div className="mb-5 flex">
          <TabButton active={activeTab === "medida"} onClick={() => setActiveTab("medida")} side="left">
            <RuleIcon />
            Por Medida
          </TabButton>
          <TabButton active={activeTab === "vehiculo"} onClick={() => setActiveTab("vehiculo")} side="right">
            <AutoIcon />
            Por Vehículo
          </TabButton>
        </div>

        {activeTab === "medida" ? (
          <div>
            <div className="flex flex-wrap gap-3">
              <SelectGroup label="Ancho" value={ancho} onChange={setAncho} options={anchos} />
              <Separator>/</Separator>
              <SelectGroup label="Perfil" value={perfil} onChange={setPerfil} options={perfiles} />
              <Separator>R</Separator>
              <SelectGroup label="Rodado" value={rodado} onChange={setRodado} options={rodados} />
            </div>
            <SearchButton
              onClick={() =>
                router.push(`/neumaticos/${ancho}-${perfil}-R${rodado}`)
              }
            />
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-3">
              <SelectGroup
                label="Marca de auto"
                value={marcaAuto}
                onChange={(v) => {
                  setMarcaAuto(v);
                  if (v !== "Toyota") setModelo("Seleccioná modelo");
                  else setModelo("Corolla");
                }}
                options={marcasAuto}
              />
              <SelectGroup label="Modelo" value={modelo} onChange={setModelo} options={modeloOptions} />
              <SelectGroup label="Año" value={anio} onChange={setAnio} options={years} />
            </div>
            <SearchButton
              onClick={() =>
                router.push(`/catalogo?marca_auto=${encodeURIComponent(marcaAuto)}&modelo=${encodeURIComponent(modelo)}&anio=${encodeURIComponent(anio)}`)
              }
            />
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <InfoIcon />
          <p className="text-[10px] leading-[1.5] text-[var(--color-text-on-dark-muted)]">
            ¿No sabés tu medida? La encontrás en el flanco del neumático o en el manual del vehículo.
          </p>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  side,
  children,
}: {
  active: boolean;
  onClick: () => void;
  side: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex flex-1 items-center justify-center gap-2 border py-[9px] text-[11px] font-bold uppercase tracking-[0.08em] transition-colors",
        side === "left" ? "rounded-l-[4px] border-r-0" : "rounded-r-[4px]",
        active
          ? "border-orange bg-orange text-white"
          : "border-[var(--color-navy-border)] bg-[var(--color-navy-surface)] text-[var(--color-text-on-dark)] hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
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
  options: readonly string[] | string[];
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
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  );
}

function Separator({ children }: { children: string }) {
  return (
    <div
      className="self-end pb-[10px] text-[18px] font-black"
      style={{ color: "var(--color-buscador-separator)" }}
    >
      {children}
    </div>
  );
}

function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex h-[44px] items-center gap-2 rounded-[4px] bg-orange px-6 text-[12px] font-extrabold uppercase tracking-[0.07em] text-white transition-colors duration-150 hover:bg-[var(--color-orange-hover)]"
    >
      <SearchIcon />
      Buscar neumáticos
    </button>
  );
}

function RuleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 17L17 3L21 7L7 21L3 17Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 6L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AutoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 13L5 7C5.3 6.4 5.9 6 6.6 6H17.4C18.1 6 18.7 6.4 19 7L21 13" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="7.5" cy="17.2" r="1.6" fill="currentColor" />
      <circle cx="16.5" cy="17.2" r="1.6" fill="currentColor" />
    </svg>
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

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-[var(--color-text-on-dark-muted)]">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}
