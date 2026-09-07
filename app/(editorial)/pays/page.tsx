import type { Metadata } from "next";
import Link from "next/link";
import { EnTeteSection } from "@/components/EnTeteSection";
import { Carte } from "@/components/Carte";
import { tousLesPays } from "@/lib/pays";

export const metadata: Metadata = {
  title: "Top 5 des pays producteurs — Atlas du Vin",
  description:
    "Les grands pays du vin, région par région : France, Italie, Espagne, Portugal, Argentine.",
  alternates: { canonical: "/pays" },
};

export default function PagePays() {
  // Les pays classés (avec rang) d'abord, triés ; puis le reste.
  const entrees = Object.entries(tousLesPays()).sort(
    ([, a], [, b]) => (a.rang ?? 99) - (b.rang ?? 99),
  );

  return (
    <main className="contenu py-16">
      <EnTeteSection
        miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Pays" }]}
        surtitre="Guide"
        titre="Top 5 des pays producteurs"
        chapeau="Les grands pays du vin, région par région."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entrees.map(([slug, p]) => (
          <Link key={slug} href={`/pays/${slug}`} className="block">
            <Carte>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-xl text-encre">
                  {p.rang ? `${p.rang}. ` : ""}
                  {p.libelle_fr}
                </h2>
                {p.note_sur_10 !== undefined && (
                  <span className="font-donnees text-sm text-lie">
                    {p.note_sur_10.toFixed(1).replace(".", ",")}/10
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-encre-doux">{p.note_contexte}</p>
            </Carte>
          </Link>
        ))}
      </div>
    </main>
  );
}
