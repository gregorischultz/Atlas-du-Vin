import { FilDAriane, type Miette } from "@/components/FilDAriane";

/**
 * EnTeteSection — « cartouche » de tête de page, commun à toutes les sections
 * (fil d'Ariane + surtitre + titre + chapô + filet). Donne au site son unité
 * éditoriale de musée.
 */
export function EnTeteSection({
  miettes,
  surtitre,
  titre,
  chapeau,
}: {
  miettes: Miette[];
  surtitre?: string;
  titre: string;
  chapeau?: string;
}) {
  return (
    <header className="apparition">
      <FilDAriane miettes={miettes} />
      {surtitre && <p className="eyebrow mt-6">{surtitre}</p>}
      <h1 className="mt-3 text-3xl md:text-4xl">{titre}</h1>
      {chapeau && (
        <p className="mt-4 max-w-[68ch] text-lg text-encre-doux">{chapeau}</p>
      )}
      <div className="filet-orne w-28" />
    </header>
  );
}
