import { CartePays, type Pays } from "./schema";
import donnees from "@/data/pays.json";

/** Charge et valide la carte des pays (data/pays.json). */
export function tousLesPays(): Record<string, Pays> {
  return CartePays.parse(donnees);
}

export function paysParSlug(slug: string): Pays | undefined {
  return tousLesPays()[slug];
}

/**
 * Pays classés (Top 5) : uniquement ceux qui portent un `rang`, triés.
 * Les pays sans rang (données de classement pas encore saisies) sont exclus.
 */
export function paysClasses(): [string, Pays][] {
  return Object.entries(tousLesPays())
    .filter(([, p]) => p.rang !== undefined)
    .sort(([, a], [, b]) => (a.rang ?? 0) - (b.rang ?? 0));
}
