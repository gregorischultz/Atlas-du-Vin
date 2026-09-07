import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnTeteSection } from "@/components/EnTeteSection";
import { ListeClassement } from "@/components/ListeClassement";
import { FAMILLES_VIN, libelleFamille, estFamilleValide } from "@/lib/libelles";
import { classementsParFamille } from "@/lib/classements";
import type { ClassementComplet } from "@/lib/classements";

type Params = { famille: string };

export function generateStaticParams(): Params[] {
  return FAMILLES_VIN.map((famille) => ({ famille }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { famille } = await params;
  if (!estFamilleValide(famille)) return {};
  const nom = libelleFamille(famille);
  return {
    title: `${nom} — les classements — Atlas du Vin`,
    description: `Les meilleurs ${nom.toLowerCase()} et le meilleur rapport qualité-prix.`,
    alternates: { canonical: `/classements/${famille}` },
  };
}

/** Une section de ranking : le titre + la liste, ou l'état « en préparation ». */
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

export default async function PageClassementFamille({
  params,
}: {
  params: Promise<Params>;
}) {
  const { famille } = await params;
  if (!estFamilleValide(famille)) notFound();

  const nom = libelleFamille(famille);
  const { meilleurs, qualitePrix } = classementsParFamille(famille);

  return (
    <main className="contenu py-16">
      <EnTeteSection
        miettes={[
          { libelle: "Accueil", href: "/" },
          { libelle: "Classements par type" },
          { libelle: nom },
        ]}
        surtitre="Classements par type"
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
