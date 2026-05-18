import { marcasData, MARCAS_POPULARES_SLUGS, type MarcaData } from "@/lib/marcas-data";
import { displayToSlug, MEDIDAS_POPULARES_SLUGS, parseMedida } from "@/lib/medidas";
import { productosMock } from "@/lib/mockProductos";
import type { ProductoMock } from "@/lib/types";

const PAIS_BANDERA: Record<string, string> = {
  Italia: "🇮🇹",
  "Reino Unido": "🇬🇧",
  Japón: "🇯🇵",
  "Estados Unidos": "🇺🇸",
  Argentina: "🇦🇷",
  Francia: "🇫🇷",
  Alemania: "🇩🇪",
  "Corea del Sur": "🇰🇷",
  Taiwán: "🇹🇼",
};

const ESPECIALIDAD_DESCRIPCION: Record<string, string> = {
  "Alto rendimiento": "Máxima adherencia y respuesta en conducción deportiva.",
  "Equipamiento original": "Homologados de fábrica en vehículos premium.",
  "Fórmula 1": "Tecnología derivada del máximo nivel del automovilismo.",
  "SUV premium": "Diseñados para SUV de alta gama y confort.",
  Sport: "Neumáticos orientados a manejo dinámico y precisión.",
  "All terrain": "Versatilidad en asfalto, ripio y caminos mixtos.",
  Turismo: "Confort y silencio para uso diario en ruta.",
  Camionetas: "Resistencia y tracción para trabajo y aventura.",
  "Tecnología japonesa": "Ingeniería de precisión y control superior.",
  Confort: "Mínimo ruido y excelente absorción de irregularidades.",
  Performance: "Respuesta rápida y estabilidad a alta velocidad.",
  "Off-road": "Tracción confiable en terrenos difíciles.",
  Eficiencia: "Menor consumo de combustible sin sacrificar seguridad.",
  Durabilidad: "Mayor vida útil y desgaste uniforme.",
  Americana: "Legado y presencia en el mercado norteamericano.",
  OEM: "Equipamiento de serie en grandes fabricantes.",
  "Precio-calidad": "Excelente relación costo-beneficio.",
  "Mercado local": "Desarrollados para el conductor argentino.",
  "Rutas argentinas": "Pensados para nuestras rutas y climas.",
  "Amplia distribución": "Disponibilidad en todo el país.",
  Seguridad: "Frenado confiable en seco y mojado.",
  Longevidad: "Kilometraje extendido con rendimiento estable.",
  Premium: "Máximo nivel de calidad y terminaciones.",
  "Ingeniería alemana": "Precisión y rigor en cada detalle.",
  Frenado: "Distancias de frenado optimizadas.",
  Precisión: "Manejo predecible y feedback al volante.",
  "Tecnología coreana": "Innovación y calidad a precio competitivo.",
  "Fórmula E": "Desarrollo en el campeonato eléctrico de élite.",
  Motos: "Líneas especializadas para dos ruedas.",
  SUV: "Capacidad de carga y estabilidad en utilitarios.",
  "Historia argentina": "Casi un siglo acompañando al país.",
  Confiabilidad: "Rendimiento constante en el día a día.",
  "Precio accesible": "Calidad nacional a un costo razonable.",
  "Rutas locales": "Adaptados a pavimento y clima argentino.",
};

export function getMarcaBySlug(slug: string): MarcaData | undefined {
  return marcasData.find((m) => m.slug === slug.toLowerCase());
}

export function isValidMarcaSlug(slug: string): boolean {
  return marcasData.some((m) => m.slug === slug.toLowerCase());
}

export function getBanderaPais(pais: string): string {
  return PAIS_BANDERA[pais] ?? "🌐";
}

export function filterProductosPorMarca(nombreMarca: string): ProductoMock[] {
  const normalized = nombreMarca.toLowerCase();
  return productosMock.filter((p) => p.marca.toLowerCase() === normalized);
}

export function countProductosPorMarca(nombreMarca: string): number {
  return filterProductosPorMarca(nombreMarca).length;
}

export function extractMedidaDisplay(medidaProducto: string): string | null {
  const match = medidaProducto.match(/^(\d+\/\d+\s+R\d+)/);
  return match ? match[1] : null;
}

export function getMedidasDeMarca(nombreMarca: string): string[] {
  const medidas = filterProductosPorMarca(nombreMarca)
    .map((p) => extractMedidaDisplay(p.medida))
    .filter((m): m is string => m !== null);

  return [...new Set(medidas)];
}

export function getMedidasParaMarca(nombreMarca: string, limit = 8): { display: string; slug: string }[] {
  const deMarca = getMedidasDeMarca(nombreMarca);

  const items =
    deMarca.length > 0
      ? deMarca
      : MEDIDAS_POPULARES_SLUGS.slice(0, 6).map((s) => parseMedida(s).display);

  return items.slice(0, limit).map((display) => ({
    display,
    slug: displayToSlug(display),
  }));
}

export function getEspecialidadDescripcion(especialidad: string): string {
  return ESPECIALIDAD_DESCRIPCION[especialidad] ?? `Referente en ${especialidad.toLowerCase()} para todo tipo de vehículo.`;
}

export function getOtrasMarcasPopulares(currentSlug: string, limit = 4): MarcaData[] {
  const current = currentSlug.toLowerCase();
  const populares = MARCAS_POPULARES_SLUGS.filter((s) => s !== current)
    .map((slug) => getMarcaBySlug(slug))
    .filter((m): m is MarcaData => m !== undefined);

  if (populares.length >= limit) {
    return populares.slice(0, limit);
  }

  const popularesSet = new Set<string>(MARCAS_POPULARES_SLUGS);
  const restantes = marcasData
    .filter((m) => m.slug !== current && !popularesSet.has(m.slug))
    .slice(0, limit - populares.length);

  return [...populares, ...restantes].slice(0, limit);
}
