import type { Metadata } from "next";
import { SectionEnPreparation } from "@/components/SectionEnPreparation";

export const metadata: Metadata = {
  title: "Les 6 principaux types de vin — Atlas du Vin",
  description:
    "Rouges, blancs secs, blancs doux, rosés, effervescents et fortifiés.",
  alternates: { canonical: "/types" },
};

export default function PageTypes() {
  return (
    <SectionEnPreparation
      titre="Les 6 principaux types de vin"
      miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Types de vin" }]}
    />
  );
}
