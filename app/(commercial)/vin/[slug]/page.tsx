import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FilDAriane } from "@/components/FilDAriane";
import { Badge } from "@/components/Badge";
import { CadreImage } from "@/components/CadreImage";
import { Tableau } from "@/components/Tableau";
import { BlocSanitaire } from "@/components/BlocSanitaire";
import { DivulgationAffiliation } from "@/components/DivulgationAffiliation";
import { BoutonOffre } from "@/components/BoutonOffre";
import { registreVins, vinFicheParSlug } from "@/lib/vins-registry";
import { apparitionsDuVin } from "@/lib/classements";
import { offresVisibles } from "@/lib/offres";
import { libelleFamille } from "@/lib/libelles";
import { paysParSlug } from "@/lib/pays";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return Object.keys(registreVins()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vin = vinFicheParSlug(slug);
  if (!vin) return {};
  return {
    title: `${vin.nom} — Atlas du Vin`,
    description: `${vin.nom} — ${vin.producteur}, ${vin.appellation}.`,
    alternates: { canonical: `/vin/${vin.slug}` },
  };
}

export default async function FicheVin({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const vin = vinFicheParSlug(slug);
  if (!vin) notFound();

  const paysLibelle = paysParSlug(vin.pays)?.libelle_fr ?? vin.pays;
  const apparitions = apparitionsDuVin(vin.slug);
  const offres = offresVisibles(vin.slug, vin.offres);

  const ficheTechnique: [string, string][] = [
    ["Type", libelleFamille(vin.famille)],
    ["Cépages", vin.cepages.join(", ")],
    ["Appellation", vin.appellation],
    ["Région", `${vin.region} · ${paysLibelle}`],
    ...(vin.degre !== undefined
      ? ([
          ["Degré", `${vin.degre.toFixed(1).replace(".", ",")} % vol`],
        ] as [string, string][])
      : []),
  ];

  return (
    <main className="contenu py-10">
      <FilDAriane
        miettes={[
          { libelle: "Accueil", href: "/" },
          {
            libelle: libelleFamille(vin.famille),
            href: `/classements/${vin.famille}`,
          },
          { libelle: vin.nom },
        ]}
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Badge>{libelleFamille(vin.famille)}</Badge>
        <Badge ton="lie">{paysLibelle}</Badge>
      </div>
      <h1 className="mt-4 text-4xl">{vin.nom}</h1>
      <p className="mt-2 font-donnees text-encre-doux">{vin.producteur}</p>

      <div className="mt-10 grid gap-10 md:grid-cols-[2fr_1fr]">
        <div>
          {/* Figure dans ces classements (éditorial, aucun lien commercial) */}
          <h2 className="text-xl">Figure dans ces classements</h2>
          {apparitions.length === 0 ? (
            <p className="mt-3 text-encre-doux">
              Ce vin n&apos;apparaît pas encore dans un classement publié.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {apparitions.map((a) => (
                <li key={a.slug}>
                  <Link href={a.url} className="text-lie hover:underline">
                    {a.titre} — nº {a.rang}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <aside className="space-y-8">
          <CadreImage ratio="3 / 4" etiquette={vin.nom} />
          <div>
            <h2 className="mb-3 text-xl">Fiche technique</h2>
            <Tableau
              entetes={["", ""]}
              lignes={ficheTechnique.map(([k, v]) => [k, v])}
            />
          </div>
        </aside>
      </div>

      {/* ── OÙ ACHETER (commerce) — divulgation + mention sanitaire au plus près ── */}
      <section className="mt-12 rounded-carafe border border-trait bg-sable p-6">
        <h2 className="text-xl">Où acheter</h2>
        <div className="mt-3">
          <DivulgationAffiliation />
        </div>
        <div className="mt-3">
          <BlocSanitaire />
        </div>
        {offres.length === 0 ? (
          <p className="mt-4 text-encre-doux">
            Aucune offre vérifiée pour le moment. Nous n&apos;affichons un lien
            que lorsqu&apos;il a été contrôlé.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {offres.map((offre, i) => (
              <li
                key={offre.id}
                className="flex items-center justify-between gap-4 border-t border-trait pt-3"
              >
                <span className="font-donnees text-encre">
                  {offre.nomMarchand}
                </span>
                <BoutonOffre
                  id={offre.id}
                  marchand={offre.marchand}
                  prix={offre.prix_eur}
                  position={i + 1}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
