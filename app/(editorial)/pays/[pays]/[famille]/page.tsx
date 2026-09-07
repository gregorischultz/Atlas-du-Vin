import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnTeteSection } from "@/components/EnTeteSection";
import { ListeClassement } from "@/components/ListeClassement";
import { tousLesPays, paysParSlug } from "@/lib/pays";
import { FAMILLES_VIN, libelleFamille, estFamilleValide } from "@/lib/libelles";
import { classementsParPaysFamille } from "@/lib/classements";
import type { ClassementComplet } from "@/lib/classements";

type Params = { pays: string; famille: string };

export function generateStaticParams(): Params[] {
  return Object.keys(tousLesPays()).flatMap((pays) =>
    FAMILLES_VIN.map((famille) => ({ pays, famille })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pays: slug, famille } = await params;
  const p = paysParSlug(slug);
  if (!p || !estFamilleValide(famille)) return {};
  const nom = libelleFamille(famille);
  return {
    title: `${nom} de ${p.libelle_fr} — les classements — Atlas du Vin`,
    description: `Les meilleurs ${nom.toLowerCase()} de ${p.libelle_fr} et le meilleur rapport qualité-prix.`,
    alternates: { canonical: `/pays/${slug}/${famille}` },
  };
}

function SectionClassement({
  titre,
  classement,
}: {
  titre: string;
  classement: ClassementComplet | undefined;
}) {
  return (
    <section>
      <h2 className="font-donnees text-xs uppercase tracking-widest text-sauge">
        {titre}
      </h2>
      <div className="mt-4">
        {classement ? (
          <ListeClassement classement={classement} />
        ) : (
          <p className="font-donnees text-sm text-encre-doux">
            Classement en préparation — le contenu sera publié prochainement.
          </p>
        )}
      </div>
    </section>
  );
}

export default async function PagePaysFamille({
  params,
}: {
  params: Promise<Params>;
}) {
  const { pays: slug, famille } = await params;
  const p = paysParSlug(slug);
  if (!p || !estFamilleValide(famille)) notFound();

  const nom = libelleFamille(famille);
  const { meilleurs, qualitePrix } = classementsParPaysFamille(slug, famille);

  return (
    <main className="contenu py-16">
      <EnTeteSection
        miettes={[
          { libelle: "Accueil", href: "/" },
          { libelle: "Pays", href: "/pays" },
          { libelle: p.libelle_fr, href: `/pays/${slug}` },
          { libelle: nom },
        ]}
        surtitre={p.libelle_fr}
        titre={nom}
      />

      <div className="mt-12 space-y-16">
        <SectionClassement titre="Les meilleurs" classement={meilleurs} />
        <SectionClassement
          titre="Rapport qualité-prix"
          classement={qualitePrix}
        />
      </div>
    </main>
  );
}
