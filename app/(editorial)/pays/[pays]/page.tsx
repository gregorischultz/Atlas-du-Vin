import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionEnPreparation } from "@/components/SectionEnPreparation";
import paysData from "@/data/pays.json";

const pays = paysData as Record<string, { libelle_fr: string }>;

type Params = { pays: string };

export function generateStaticParams(): Params[] {
  return Object.keys(pays).map((slug) => ({ pays: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pays: slug } = await params;
  const p = pays[slug];
  if (!p) return {};
  return {
    title: `Vins de ${p.libelle_fr} — Atlas du Vin`,
    description: `Classements des vins de ${p.libelle_fr}, par type.`,
    alternates: { canonical: `/pays/${slug}` },
  };
}

export default async function PagePaysDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { pays: slug } = await params;
  const p = pays[slug];
  if (!p) notFound();

  return (
    <SectionEnPreparation
      titre={`Vins de ${p.libelle_fr}`}
      miettes={[
        { libelle: "Accueil", href: "/" },
        { libelle: "Pays", href: "/pays" },
        { libelle: p.libelle_fr },
      ]}
    />
  );
}
