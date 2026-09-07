import type { Metadata } from "next";
import { SectionEnPreparation } from "@/components/SectionEnPreparation";

export const metadata: Metadata = {
  title: "Les 10 plus grands experts du vin — Atlas du Vin",
  description:
    "Les personnalités qui ont façonné la critique et la connaissance du vin.",
  alternates: { canonical: "/experts" },
};

export default function PageExperts() {
  return (
    <SectionEnPreparation
      titre="Les 10 plus grands experts du vin"
      miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Experts" }]}
    />
  );
}
