import type { Metadata } from "next";
import { FilDAriane } from "@/components/FilDAriane";
import { Carte } from "@/components/Carte";
import { listeExperts } from "@/lib/experts";

export const metadata: Metadata = {
  title: "Les 10 plus grands experts du vin — Atlas du Vin",
  description:
    "Les personnalités qui ont façonné la critique et la connaissance du vin.",
  alternates: { canonical: "/experts" },
};

export default function PageExperts() {
  const experts = listeExperts();

  return (
    <main className="contenu py-16">
      <FilDAriane
        miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Experts" }]}
      />
      <p className="mt-4 font-donnees text-sm uppercase tracking-wide text-sauge">
        Atlas du Vin
      </p>
      <h1 className="mt-3 text-4xl">Les 10 plus grands experts du vin</h1>
      <p className="mt-4 max-w-[60ch] text-lg text-encre-doux">
        Les références sur lesquelles s&apos;appuient nos classements.
      </p>

      <ol className="mt-10 space-y-4">
        {experts.map((expert) => (
          <li key={expert.slug}>
            <Carte>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl text-encre">{expert.nom}</h2>
                <p className="font-donnees text-sm text-encre-doux">
                  {expert.nationalite.join(" · ")}
                </p>
              </div>
              <p className="mt-3 text-lg text-lie">{expert.accroche}</p>
              <p className="mt-3 text-encre-doux">{expert.description}</p>
              <p className="mt-4 font-donnees text-sm text-encre">
                <span className="uppercase tracking-wide text-sauge">
                  Spécialité :{" "}
                </span>
                {expert.specialite}
              </p>
            </Carte>
          </li>
        ))}
      </ol>
    </main>
  );
}
