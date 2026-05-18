export interface MarcaData {
  slug: string;
  nombre: string;
  paisOrigen: string;
  fundacion: string;
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
    descripcionCorta:
      "Marca italiana líder en neumáticos de alto rendimiento y equipamiento original.",
    descripcionLarga:
      "Pirelli es una de las marcas de neumáticos más reconocidas del mundo, fundada en Milán en 1872. Proveedora oficial de la Fórmula 1 desde 2011, Pirelli combina tecnología de punta con un legado de más de 150 años en la industria. Sus neumáticos están presentes como equipamiento original en Ferrari, Lamborghini, Porsche y BMW.",
    especialidad: ["Alto rendimiento", "Equipamiento original", "Fórmula 1", "SUV premium"],
    logoFile: "",
  },
  {
    slug: "dunlop",
    nombre: "Dunlop",
    paisOrigen: "Reino Unido",
    fundacion: "1888",
    descripcionCorta:
      "Marca británica con más de 130 años de innovación en neumáticos para todo tipo de vehículo.",
    descripcionLarga:
      "Dunlop fue fundada en 1888 por John Boyd Dunlop, inventor del neumático neumático moderno. Con más de 130 años de historia, Dunlop es sinónimo de innovación y confiabilidad. Sus líneas SP Sport y Grandtrek son referentes mundiales en performance y tracción 4x4.",
    especialidad: ["Sport", "All terrain", "Turismo", "Camionetas"],
    logoFile: "",
  },
  {
    slug: "bridgestone",
    nombre: "Bridgestone",
    paisOrigen: "Japón",
    fundacion: "1931",
    descripcionCorta:
      "La mayor fabricante de neumáticos del mundo. Tecnología japonesa de precisión.",
    descripcionLarga:
      "Bridgestone, fundada en Japón en 1931, es actualmente la empresa fabricante de neumáticos más grande del mundo por volumen de producción. Sus líneas Turanza, Potenza y Dueler son referentes en confort, performance y off-road respectivamente. Proveedora de la Fórmula 1 por más de una década.",
    especialidad: ["Tecnología japonesa", "Confort", "Performance", "Off-road"],
    logoFile: "",
  },
  {
    slug: "goodyear",
    nombre: "Goodyear",
    paisOrigen: "Estados Unidos",
    fundacion: "1898",
    descripcionCorta:
      "Ícono americano con más de 125 años equipando vehículos en todo el mundo.",
    descripcionLarga:
      "Goodyear fue fundada en 1898 en Akron, Ohio. Es una de las marcas más reconocidas globalmente, con presencia en la NASCAR, Fórmula 1 histórica y como proveedor de equipamiento original para Ford, GM y Chrysler. Su línea EfficientGrip es referente en eficiencia de combustible.",
    especialidad: ["Eficiencia", "Durabilidad", "Americana", "OEM"],
    logoFile: "",
  },
  {
    slug: "corven",
    nombre: "Corven",
    paisOrigen: "Argentina",
    fundacion: "1995",
    descripcionCorta:
      "La marca nacional con mejor relación precio-calidad del mercado argentino.",
    descripcionLarga:
      "Corven es una marca argentina fundada en 1995 que se convirtió en referente del mercado local gracias a su excelente relación precio-calidad. Con distribución en todo el país y líneas específicamente desarrolladas para las condiciones de las rutas argentinas, Corven es la elección inteligente para el conductor nacional.",
    especialidad: ["Precio-calidad", "Mercado local", "Rutas argentinas", "Amplia distribución"],
    logoFile: "",
  },
  {
    slug: "michelin",
    nombre: "Michelin",
    paisOrigen: "Francia",
    fundacion: "1889",
    descripcionCorta:
      "Marca francesa sinónimo de seguridad y longevidad. La estrella de los neumáticos premium.",
    descripcionLarga:
      "Michelin fue fundada en Clermont-Ferrand, Francia en 1889. Inventora del neumático radial y de la guía gastronómica que lleva su nombre, Michelin es sinónimo de innovación y seguridad. Sus neumáticos son reconocidos por su excepcional durabilidad y eficiencia en consumo de combustible.",
    especialidad: ["Seguridad", "Longevidad", "Eficiencia", "Premium"],
    logoFile: "",
  },
  {
    slug: "continental",
    nombre: "Continental",
    paisOrigen: "Alemania",
    fundacion: "1871",
    descripcionCorta:
      "Ingeniería alemana aplicada a neumáticos de precisión para exigentes.",
    descripcionLarga:
      "Continental fue fundada en Hannover, Alemania en 1871. Es uno de los mayores fabricantes de neumáticos del mundo y proveedor clave de la industria automotriz europea. Sus neumáticos son reconocidos por precisión de manejo, frenado en mojado y tecnología de punta aplicada a seguridad vial.",
    especialidad: ["Ingeniería alemana", "Frenado", "Precisión", "Seguridad"],
    logoFile: "",
  },
  {
    slug: "hankook",
    nombre: "Hankook",
    paisOrigen: "Corea del Sur",
    fundacion: "1941",
    descripcionCorta:
      "Tecnología coreana de primer nivel. Calidad premium a precio accesible.",
    descripcionLarga:
      "Hankook fue fundada en Corea del Sur en 1941 y hoy es el séptimo fabricante de neumáticos más grande del mundo. Proveedor oficial de la Fórmula E y de varios campeonatos europeos, Hankook ofrece tecnología de primer nivel a precios más accesibles que las marcas europeas tradicionales.",
    especialidad: ["Tecnología coreana", "Precio-calidad", "Fórmula E", "Sport"],
    logoFile: "",
  },
  {
    slug: "maxxis",
    nombre: "Maxxis",
    paisOrigen: "Taiwán",
    fundacion: "1967",
    descripcionCorta:
      "Especialista en neumáticos para todo terreno, motos y aplicaciones extremas.",
    descripcionLarga:
      "Maxxis fue fundada en Taiwán en 1967 y se convirtió en referente mundial en neumáticos para usos extremos. Especialmente reconocida en el mundo del mountain bike, motocross y off-road, Maxxis también ofrece una sólida línea de neumáticos para autos y SUV con excelente desempeño en todo terreno.",
    especialidad: ["Off-road", "All terrain", "Motos", "SUV"],
    logoFile: "",
  },
];

export const MARCAS_POPULARES_SLUGS = ["pirelli", "dunlop", "bridgestone", "goodyear"] as const;
