import type { Metadata } from "next";
import { FilDAriane } from "@/components/FilDAriane";
import { Carte } from "@/components/Carte";
import { listeTypesGuide } from "@/lib/types-guide";

export const metadata: Metadata = {
  title: "Les 6 principaux types de vin — Atlas du Vin",
  description:
    "Rouges, blancs secs, blancs doux, rosés, effervescents et fortifiés.",
  alternates: { canonical: "/types" },
};

export default function PageTypes() {
  const types = listeTypesGuide();

  return (
    <main className="contenu py-16">
      <FilDAriane
        miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Types de vin" }]}
      />
      <p className="mt-4 font-donnees text-sm uppercase tracking-wide text-sauge">
        Atlas du Vin
      </p>
      <h1 className="mt-3 text-4xl">Les 6 principaux types de vin</h1>
      <p className="mt-4 max-w-[60ch] text-lg text-encre-doux">
        L&apos;essence de chaque style, et son pays et sa région de référence.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {types.map((t) => (
          <Carte key={t.slug}>
            <h2 className="text-2xl text-encre">{t.nom}</h2>
            <p className="mt-3 text-encre-doux">{t.essence}</p>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-donnees text-sm">
              <dt className="uppercase tracking-wide text-sauge">Pays</dt>
              <dd className="text-encre">{t.meilleur_pays}</dd>
              <dt className="uppercase tracking-wide text-sauge">Région</dt>
              <dd className="text-encre">{t.meilleure_region}</dd>
            </dl>
            {t.note && (
              <p className="mt-3 text-sm text-encre-doux">{t.note}</p>
            )}
          </Carte>
        ))}
      </div>
    </main>
  );
}
