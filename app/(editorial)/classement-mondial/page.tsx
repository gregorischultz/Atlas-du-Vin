import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnTeteSection } from "@/components/EnTeteSection";
import { ListeClassement } from "@/components/ListeClassement";
import { classementParSlug } from "@/lib/classements";

export const metadata: Metadata = {
  title: "Top 10 des meilleurs vins du monde — Atlas du Vin",
  description:
    "Notre classement général des vins les plus remarquables, toutes origines confondues.",
  alternates: { canonical: "/classement-mondial" },
};

export default function PageClassementMondial() {
  const classement = classementParSlug("mondial");
  if (!classement) notFound();

  return (
    <main className="contenu py-16">
      <EnTeteSection
        miettes={[
          { libelle: "Accueil", href: "/" },
          { libelle: "Top 10 mondial" },
        ]}
        surtitre="Le classement général"
        titre={classement.titre}
      />

      <div className="mt-10">
        <ListeClassement classement={classement} />
      </div>
    </main>
  );
}
