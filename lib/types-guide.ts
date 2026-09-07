import { ListeTypesGuide, type TypeGuide } from "./schema";
import donnees from "@/data/types.json";

/** Charge et valide les 6 types de vin du Guide (data/types.json). */
export function listeTypesGuide(): TypeGuide[] {
  return ListeTypesGuide.parse(donnees);
}
