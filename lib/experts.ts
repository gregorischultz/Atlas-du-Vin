import { ListeExperts, type Expert } from "./schema";
import donnees from "@/data/experts.json";

/**
 * Charge et valide la liste des experts (data/experts.json) contre le schéma
 * Zod. Toute donnée non conforme fait échouer le build — jamais de donnée
 * douteuse en production.
 */
export function listeExperts(): Expert[] {
  return ListeExperts.parse(donnees);
}

export function expertParSlug(slug: string): Expert | undefined {
  return listeExperts().find((e) => e.slug === slug);
}
