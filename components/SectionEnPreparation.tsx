import { FilDAriane, type Miette } from "@/components/FilDAriane";

/**
 * SectionEnPreparation — gabarit de page « squelette ». Utilisé pendant la
 * phase de structure : la page existe, l'URL résout, la navigation fonctionne,
 * mais le contenu éditorial sera publié plus tard (par vagues).
 *
 * Aucun texte marketing ici : uniquement le titre de section et une note
 * neutre, conformes à la liste fermée de regrasLegais §2.
 */
export function SectionEnPreparation({
  titre,
  miettes,
}: {
  titre: string;
  miettes?: Miette[];
}) {
  return (
    <main className="contenu py-16">
      {miettes && miettes.length > 0 && <FilDAriane miettes={miettes} />}
      <p className="mt-4 font-donnees text-sm uppercase tracking-wide text-sauge">
        Atlas du Vin
      </p>
      <h1 className="mt-3 text-4xl">{titre}</h1>
      <p className="mt-8 font-donnees text-sm text-encre-doux">
        Section en préparation — le contenu sera publié prochainement.
      </p>
    </main>
  );
}
