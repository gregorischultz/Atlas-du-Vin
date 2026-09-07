import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FilDAriane } from "@/components/FilDAriane";
import { Carte } from "@/components/Carte";
import { tousLesPays, paysParSlug } from "@/lib/pays";
import { FAMILLES_VIN, libelleFamille } from "@/lib/libelles";

type Params = { pays: string };

export function generateStaticParams(): Params[] {
  return Object.keys(tousLesPays()).map((pays) => ({ pays }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pays: slug } = await params;
  const p = paysParSlug(slug);
  if (!p) return {};
  return {
    title: `Vins de ${p.libelle_fr} — Atlas du Vin`,
    description: `Les classements des vins de ${p.libelle_fr}, type par type.`,
    alternates: { canonical: `/pays/${slug}` },
  };
}

export default async function PagePaysDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { pays: slug } = await params;
  const p = paysParSlug(slug);
  if (!p) notFound();

  return (
    <main className="contenu py-16">
      <header className="apparition">
        <FilDAriane
          miettes={[
            { libelle: "Accueil", href: "/" },
            { libelle: "Pays", href: "/pays" },
            { libelle: p.libelle_fr },
          ]}
        />
        <p className="eyebrow mt-6">Classements par pays</p>
        <div className="mt-3 flex flex-wrap items-baseline gap-4">
          <h1 className="text-3xl md:text-4xl">{p.libelle_fr}</h1>
          {p.note_sur_10 !== undefined && (
            <span className="font-donnees text-lg text-lie">
              {p.note_sur_10.toFixed(1).replace(".", ",")}/10
            </span>
          )}
        </div>
        <div className="filet-orne w-28" />
      </header>

      {p.pourquoi && (
        <p className="mt-4 max-w-[68ch] text-lg text-encre-doux">{p.pourquoi}</p>
      )}

      {p.regions && p.regions.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {p.regions.map((r) => (
            <span
              key={r}
              className="rounded-carafe border border-trait px-3 py-1 font-donnees text-sm text-encre"
            >
              {r}
            </span>
          ))}
        </div>
      )}

      <h2 className="mt-12 text-2xl text-lie">Classements par type</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FAMILLES_VIN.map((f) => (
          <Link key={f} href={`/pays/${slug}/${f}`} className="block">
            <Carte>
              <h3 className="text-xl text-encre">{libelleFamille(f)}</h3>
              <p className="mt-2 font-donnees text-sm text-encre-doux">
                Les meilleurs · Rapport qualité-prix
              </p>
            </Carte>
          </Link>
        ))}
      </div>
    </main>
  );
}
