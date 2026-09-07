import type { Metadata } from "next";
import Link from "next/link";
import { FilDAriane } from "@/components/FilDAriane";
import { Carte } from "@/components/Carte";
import paysData from "@/data/pays.json";

const pays = paysData as Record<
  string,
  { libelle_fr: string; note_contexte: string }
>;

export const metadata: Metadata = {
  title: "Top 5 des pays producteurs — Atlas du Vin",
  description:
    "Les grands pays du vin, région par région : France, Italie, Espagne, Portugal, Argentine.",
  alternates: { canonical: "/pays" },
};

export default function PagePays() {
  const entrees = Object.entries(pays);

  return (
    <main className="contenu py-16">
      <FilDAriane
        miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Pays" }]}
      />
      <p className="mt-4 font-donnees text-sm uppercase tracking-wide text-sauge">
        Atlas du Vin
      </p>
      <h1 className="mt-3 text-4xl">Top 5 des pays producteurs</h1>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entrees.map(([slug, p]) => (
          <Link key={slug} href={`/pays/${slug}`} className="block">
            <Carte>
              <h2 className="text-xl text-encre">{p.libelle_fr}</h2>
              <p className="mt-2 text-sm text-encre-doux">{p.note_contexte}</p>
            </Carte>
          </Link>
        ))}
      </div>
    </main>
  );
}
