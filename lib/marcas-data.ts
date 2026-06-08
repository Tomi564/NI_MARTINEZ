export interface MarcaData {
  slug: string;
  nombre: string;
  paisOrigen: string;
  fundacion: string;
  categorias: string[];
  descripcionCorta: string;
  descripcionLarga: string;
  especialidad: string[];
  logoFile: string;
}

export const marcasData: MarcaData[] = [
  {
    slug: "pirelli",
    nombre: "Pirelli",
    paisOrigen: "Italia",
    fundacion: "1872",
    categorias: ["Auto", "Camión"],
    descripcionCorta:
      "Marca italiana líder en neumáticos de alto rendimiento para autos y vehículos de carga.",
    descripcionLarga:
      "Pirelli es una de las marcas de neumáticos más reconocidas del mundo, fundada en Milán en 1872. Con más de 150 años de historia, ofrece soluciones para vehículos particulares de alto rendimiento y una línea completa para camiones y vehículos de carga pesada.",
    especialidad: ["Alto rendimiento", "Camión", "Fórmula 1", "OEM"],
    logoFile: "/images/marcas/pirelli.png",
  },
  {
    slug: "dunlop",
    nombre: "Dunlop",
    paisOrigen: "Reino Unido",
    fundacion: "1888",
    categorias: ["Auto"],
    descripcionCorta:
      "Marca británica con más de 130 años de innovación en neumáticos para todo tipo de vehículo.",
    descripcionLarga:
      "Dunlop fue fundada en 1888 por John Boyd Dunlop, inventor del neumático neumático moderno. Sus líneas SP Sport y Grandtrek son referentes mundiales en performance y tracción 4x4.",
    especialidad: ["Sport", "All terrain", "Turismo", "Camionetas"],
    logoFile: "/images/marcas/dunlop.png",
  },
  {
    slug: "continental",
    nombre: "Continental",
    paisOrigen: "Alemania",
    fundacion: "1871",
    categorias: ["Auto"],
    descripcionCorta:
      "Ingeniería alemana aplicada a neumáticos de precisión para conductores exigentes.",
    descripcionLarga:
      "Continental fue fundada en Hannover, Alemania en 1871. Es uno de los mayores fabricantes de neumáticos del mundo y proveedor clave de la industria automotriz europea. Reconocidos por precisión de manejo y frenado en mojado.",
    especialidad: ["Ingeniería alemana", "Frenado", "Precisión", "Seguridad"],
    logoFile: "/images/marcas/continental.png",
  },
  {
    slug: "falken",
    nombre: "Falken",
    paisOrigen: "Japón",
    fundacion: "1983",
    categorias: ["Auto"],
    descripcionCorta:
      "Tecnología japonesa de alto rendimiento con presencia en los principales campeonatos de automovilismo.",
    descripcionLarga:
      "Falken es una marca japonesa fundada en 1983, subsidiaria de Sumitomo Rubber Industries. Presente en el campeonato de drift D1 Grand Prix y en las 24 Horas de Nürburgring, Falken combina tecnología de competición con neumáticos para uso diario de excelente relación precio-calidad.",
    especialidad: ["Performance", "Sport", "Tecnología japonesa", "Precio-calidad"],
    logoFile: "/images/marcas/falken.png",
  },
  {
    slug: "corven",
    nombre: "Corven",
    paisOrigen: "Argentina",
    fundacion: "1995",
    categorias: ["Auto", "Camión"],
    descripcionCorta:
      "La marca nacional con mejor relación precio-calidad para autos y vehículos de carga.",
    descripcionLarga:
      "Corven es una marca argentina fundada en 1995 referente del mercado local gracias a su excelente relación precio-calidad. Ofrece líneas para vehículos particulares y una completa gama para camiones y transporte de carga, especialmente desarrolladas para las condiciones de las rutas argentinas.",
    especialidad: ["Precio-calidad", "Mercado local", "Camión", "Rutas argentinas"],
    logoFile: "/images/marcas/corven.png",
  },
  {
    slug: "chaoyang",
    nombre: "Chao Yang",
    paisOrigen: "China",
    fundacion: "1958",
    categorias: ["Auto"],
    descripcionCorta:
      "Marca china con décadas de experiencia fabricando neumáticos de calidad a precio accesible.",
    descripcionLarga:
      "Chao Yang es una marca china fundada en 1958 con amplia distribución en América Latina. Ofrece neumáticos de calidad comprobada para vehículos particulares con una excelente relación precio-calidad, siendo una opción inteligente para el conductor que busca durabilidad sin pagar de más.",
    especialidad: ["Precio accesible", "Durabilidad", "Amplia distribución", "Calidad-precio"],
    logoFile: "/images/marcas/chaoyang.png",
  },
  {
    slug: "cargopower",
    nombre: "Cargo Power",
    paisOrigen: "China",
    fundacion: "2001",
    categorias: ["Camión"],
    descripcionCorta:
      "Especialista en neumáticos para vehículos de carga pesada y transporte.",
    descripcionLarga:
      "Cargo Power es una marca especializada en neumáticos para camiones, ómnibus y vehículos de carga pesada. Con diseños específicos para las exigencias del transporte de larga distancia, ofrece durabilidad y resistencia en rutas de todo tipo.",
    especialidad: ["Carga pesada", "Transporte", "Larga distancia", "Camión"],
    logoFile: "/images/marcas/cargopower.png",
  },
  {
    slug: "westlake",
    nombre: "Westlake",
    paisOrigen: "China",
    fundacion: "1988",
    categorias: ["Camión"],
    descripcionCorta:
      "Neumáticos para camiones y transporte pesado con excelente rendimiento en ruta.",
    descripcionLarga:
      "Westlake es una marca china especializada en neumáticos para vehículos comerciales y de carga. Reconocida por su durabilidad en condiciones exigentes de transporte, ofrece soluciones para camiones de todo tipo con una relación precio-rendimiento difícil de superar.",
    especialidad: ["Camión", "Carga pesada", "Transporte", "Durabilidad"],
    logoFile: "/images/marcas/westlake.png",
  },
  {
    slug: "seat",
    nombre: "Seat Agrícola",
    paisOrigen: "Argentina",
    fundacion: "1970",
    categorias: ["Agrícola"],
    descripcionCorta:
      "Neumáticos agrícolas para maquinaria de campo. Especialista en el mercado argentino.",
    descripcionLarga:
      "Seat Agrícola es una marca especializada en neumáticos para maquinaria agrícola, con amplia distribución en el mercado argentino. Sus productos están diseñados para las condiciones de los campos locales, ofreciendo tracción y durabilidad en todo tipo de terreno agrícola.",
    especialidad: ["Agrícola", "Maquinaria de campo", "Mercado local", "Tracción"],
    logoFile: "/images/marcas/seat.png",
  },
];

export const MARCAS_POPULARES_SLUGS = ["pirelli", "dunlop", "continental", "falken"] as const;
