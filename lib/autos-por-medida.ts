export const autosPorMedida: Record<string, string[]> = {
  "175/65 R14": ["Volkswagen Gol", "Fiat Palio", "Renault Logan", "Peugeot 207"],
  "185/60 R14": ["Volkswagen Gol Trend", "Fiat Punto", "Ford Ka"],
  "185/65 R14": ["Renault Sandero", "Peugeot 208", "Citroën C3"],
  "185/65 R15": ["Toyota Corolla", "Volkswagen Vento", "Ford Focus", "Chevrolet Cruze"],
  "195/55 R15": ["Honda Fit", "Toyota Yaris", "Volkswagen Polo"],
  "195/65 R15": ["Renault Fluence", "Peugeot 301", "Citroën C4"],
  "205/55 R16": ["Honda Civic", "Toyota Corolla XEI", "Volkswagen Vento Highline"],
  "205/60 R16": ["Chevrolet Cruze LTZ", "Ford Focus ST", "Peugeot 408"],
  "215/55 R16": ["Volkswagen Passat", "Ford Mondeo", "Chevrolet Vectra"],
  "215/55 R17": ["Toyota Corolla GR Sport", "Volkswagen Tiguan", "Jeep Compass"],
  "215/60 R17": ["Toyota RAV4", "Honda CR-V", "Chevrolet Equinox"],
  "225/45 R17": ["BMW Serie 3", "Mercedes Clase C", "Audi A4"],
  "225/55 R17": ["Toyota RAV4", "Volkswagen Tiguan", "Ford Edge"],
  "235/55 R17": ["Jeep Grand Cherokee", "Ford Explorer", "Chevrolet Captiva"],
  "235/65 R17": ["Toyota SW4", "Mitsubishi Outlander", "Nissan X-Trail"],
  "225/45 R18": ["BMW Serie 3", "Audi A4", "Mercedes CLA"],
  "235/50 R18": ["Toyota RAV4 Hybrid", "Volkswagen Tiguan Allspace"],
  "255/55 R18": ["Toyota SW4", "Land Rover Discovery Sport"],
  "265/65 R17": ["Toyota Hilux", "Ford Ranger", "Chevrolet S10", "Nissan Frontier"],
  "275/55 R20": ["RAM 1500", "Ford F-150", "Chevrolet Silverado"],
};

export function getTextoAutosPorMedida(display: string, rodado: string): string {
  const autos = autosPorMedida[display];
  if (autos && autos.length > 0) {
    return autos.join(", ");
  }
  const n = Number(rodado);
  if (n <= 15) return "autos compactos y sedanes medianos";
  if (n <= 17) return "sedanes premium y SUV medianos";
  return "SUV grandes y camionetas pickup";
}
