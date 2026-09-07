import { TypeVin, FamilleVin } from "./schema";

/** Rótulos em francês para os tipos de vinho (enum -> texto legível). */
export const LIBELLES_TYPE: Record<string, string> = {
  "rouge-sec": "Rouge sec",
  "rouge-moelleux": "Rouge moelleux",
  "blanc-sec": "Blanc sec",
  "blanc-moelleux": "Blanc moelleux",
  rose: "Rosé",
  effervescent: "Effervescent",
  champagne: "Champagne",
  "vin-doux-naturel": "Vin doux naturel",
  "vin-fortifie": "Vin fortifié",
};

/** Todos os slugs de tipo válidos (para generateStaticParams). */
export const TYPES_VIN = TypeVin.options;

export function libelleType(type: string): string {
  return LIBELLES_TYPE[type] ?? type;
}

/** Rótulos das 6 familles de vin usadas pelos rankings (Atlas). */
export const LIBELLES_FAMILLE: Record<string, string> = {
  rouge: "Rouges",
  "blanc-sec": "Blancs secs",
  "blanc-doux": "Blancs doux",
  rose: "Rosés",
  effervescent: "Effervescents",
  fortifie: "Fortifiés",
};

/** Todos os slugs de famille válidos (para generateStaticParams). */
export const FAMILLES_VIN = FamilleVin.options;

export function libelleFamille(famille: string): string {
  return LIBELLES_FAMILLE[famille] ?? famille;
}

export function estFamilleValide(f: string): f is FamilleVin {
  return (FAMILLES_VIN as readonly string[]).includes(f);
}
