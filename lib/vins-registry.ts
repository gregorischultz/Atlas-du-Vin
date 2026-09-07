import { RegistreVins, type VinFiche } from "./schema";
import donnees from "@/data/vins.json";
import paysData from "@/data/pays.json";

const PAYS_VALIDES = new Set(Object.keys(paysData));

/**
 * Charge et valide le registre des vins (data/vins.json) : l'identité de chaque
 * vin, source unique pour la fiche /vin/[slug] et le « où acheter » (offres).
 */
export function registreVins(): Record<string, VinFiche> {
  const reg = RegistreVins.parse(donnees);
  for (const [slug, v] of Object.entries(reg)) {
    if (v.slug !== slug) {
      throw new Error(
        `\n❌ data/vins.json : la clé "${slug}" ne correspond pas au slug "${v.slug}".\n`,
      );
    }
    if (!PAYS_VALIDES.has(v.pays)) {
      throw new Error(
        `\n❌ data/vins.json : ${slug} — pays "${v.pays}" absent de data/pays.json.\n`,
      );
    }
  }
  return reg;
}

export function vinFicheParSlug(slug: string): VinFiche | undefined {
  return registreVins()[slug];
}
