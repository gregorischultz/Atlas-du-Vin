import type { Metadata } from "next";
import { SectionEnPreparation } from "@/components/SectionEnPreparation";

export const metadata: Metadata = {
  title: "Top 10 des meilleurs vins du monde — Atlas du Vin",
  description:
    "Notre classement général des vins les plus remarquables, toutes origines confondues.",
  alternates: { canonical: "/classement-mondial" },
};

export default function PageClassementMondial() {
  return (
    <SectionEnPreparation
      titre="Top 10 des meilleurs vins du monde"
      miettes={[
        { libelle: "Accueil", href: "/" },
        { libelle: "Top 10 mondial" },
      ]}
    />
  );
}
