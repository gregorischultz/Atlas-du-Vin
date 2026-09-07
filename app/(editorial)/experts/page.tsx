import type { Metadata } from "next";
import { EnTeteSection } from "@/components/EnTeteSection";
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
      <EnTeteSection
        miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Experts" }]}
        surtitre="Guide"
        titre="Les 10 plus grands experts du vin"
        chapeau="Les références sur lesquelles s'appuient nos classements."
      />

      <ol className="mt-10 space-y-4">
        {experts.map((expert, i) => (
          <li key={expert.slug}>
            <Carte>
              <div className="grid grid-cols-[auto_1fr] gap-x-5">
                <span
                  className="font-titres text-4xl leading-none text-lie/80 md:text-5xl"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
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
                </div>
              </div>
            </Carte>
          </li>
        ))}
      </ol>
    </main>
  );
}
