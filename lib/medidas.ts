export interface MedidaParsed {
  ancho: string;
  perfil: string;
  rodado: string;
  display: string;
}

export const MEDIDAS_POPULARES_SLUGS = [
  "175-65-R14",
  "185-60-R14",
  "185-65-R14",
  "185-65-R15",
  "195-55-R15",
  "195-65-R15",
  "205-55-R16",
  "205-60-R16",
  "215-55-R16",
  "215-55-R17",
  "215-60-R17",
  "225-45-R17",
  "225-55-R17",
  "235-55-R17",
  "235-65-R17",
  "225-45-R18",
  "235-50-R18",
  "255-55-R18",
  "265-65-R17",
  "275-55-R20",
] as const;

export type MedidaSlug = (typeof MEDIDAS_POPULARES_SLUGS)[number];

const SLUG_REGEX = /^(\d+)-(\d+)-R(\d+)$/i;
const DISPLAY_REGEX = /^(\d+)\/(\d+)\s+R(\d+)$/i;

export function parseMedida(slug: string): MedidaParsed {
  const match = slug.match(SLUG_REGEX);
  if (!match) {
    throw new Error(`Medida inválida: ${slug}`);
  }
  const [, ancho, perfil, rodado] = match;
  return {
    ancho,
    perfil,
    rodado,
    display: `${ancho}/${perfil} R${rodado}`,
  };
}

export function medidaToSlug(ancho: string, perfil: string, rodado: string): string {
  return `${ancho}-${perfil}-R${rodado}`;
}

export function displayToSlug(display: string): string {
  const match = display.trim().match(DISPLAY_REGEX);
  if (!match) {
    throw new Error(`Formato de medida inválido: ${display}`);
  }
  return medidaToSlug(match[1], match[2], match[3]);
}

export function isValidMedidaSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug);
}

export function productoMatchesMedida(
  medidaProducto: string,
  ancho: string,
  perfil: string,
  rodado: string,
): boolean {
  return medidaProducto.includes(`${ancho}/${perfil} R${rodado}`);
}

export function getMedidasRelacionadas(currentSlug: string, limit = 6): MedidaParsed[] {
  const current = parseMedida(currentSlug);
  const currentPerfil = Number(current.perfil);
  const currentRodado = Number(current.rodado);

  return MEDIDAS_POPULARES_SLUGS.filter((slug) => slug !== currentSlug)
    .map((slug) => parseMedida(slug))
    .filter((medida) => {
      const rodado = Number(medida.rodado);
      const perfil = Number(medida.perfil);
      return (
        rodado === currentRodado ||
        Math.abs(perfil - currentPerfil) <= 10 ||
        Math.abs(rodado - currentRodado) === 1
      );
    })
    .slice(0, limit);
}
