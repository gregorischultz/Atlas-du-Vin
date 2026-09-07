import type { Metadata } from "next";
import { SectionEnPreparation } from "@/components/SectionEnPreparation";

export const metadata: Metadata = {
  title: "Termes techniques — Atlas du Vin",
  description:
    "Le vocabulaire et les classifications du vin : AOP, DOCG, Grand Cru, Vintage et autres.",
  alternates: { canonical: "/glossaire" },
};

export default function PageGlossaire() {
  return (
    <SectionEnPreparation
      titre="Termes techniques"
      miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Termes techniques" }]}
    />
  );
}
