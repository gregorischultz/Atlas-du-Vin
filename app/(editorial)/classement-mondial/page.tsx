import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilDAriane } from "@/components/FilDAriane";
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
      <FilDAriane
        miettes={[
          { libelle: "Accueil", href: "/" },
          { libelle: "Top 10 mondial" },
        ]}
      />
      <p className="mt-4 font-donnees text-sm uppercase tracking-wide text-sauge">
        Atlas du Vin
      </p>
      <h1 className="mt-3 text-4xl">{classement.titre}</h1>

      <div className="mt-10">
        <ListeClassement classement={classement} />
      </div>
    </main>
  );
}
