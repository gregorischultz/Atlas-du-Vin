import { ListeGlossaire, type GlossaireTerme } from "./schema";
import donnees from "@/data/glossaire.json";

/** Charge et valide le glossaire (data/glossaire.json). */
export function listeGlossaire(): GlossaireTerme[] {
  return ListeGlossaire.parse(donnees);
}

/** Termes regroupés par groupe (France, Italie, …), ordre d'apparition. */
export function glossaireParGroupe(): [string, GlossaireTerme[]][] {
  const groupes = new Map<string, GlossaireTerme[]>();
  for (const t of listeGlossaire()) {
    const liste = groupes.get(t.groupe) ?? [];
    liste.push(t);
    groupes.set(t.groupe, liste);
  }
  return [...groupes.entries()];
}
