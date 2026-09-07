import type { Metadata } from "next";
import { SectionEnPreparation } from "@/components/SectionEnPreparation";

export const metadata: Metadata = {
  title: "Histoire du Vin — Atlas du Vin",
  description:
    "L'histoire du vin, de l'Antiquité aux grands centres viticoles d'aujourd'hui.",
  alternates: { canonical: "/histoire" },
};

export default function PageHistoire() {
  return (
    <SectionEnPreparation
      titre="Histoire du Vin"
      miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Histoire du Vin" }]}
    />
  );
}
