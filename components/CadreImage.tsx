/**
 * CadreImage — emplacement d'image « musée » : cadre sobre à la bonne
 * proportion, prêt à recevoir un visuel licencié (regrasLegais §12 : jamais de
 * reproduction d'étiquette réelle, images sous licence uniquement).
 *
 * Tant qu'aucun visuel n'est fourni, on affiche un cadre discret avec un
 * monogramme — la composition tient, sans dépendre des assets.
 */
export function CadreImage({
  ratio = "4 / 3",
  legende,
  etiquette = "Atlas du Vin",
}: {
  ratio?: string;
  legende?: string;
  etiquette?: string;
}) {
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-carafe border border-trait bg-sable"
        style={{ aspectRatio: ratio }}
      >
        {/* liseré intérieur — détail éditorial discret */}
        <div className="pointer-events-none absolute inset-2 rounded-carafe border border-trait/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-donnees text-xs uppercase tracking-[0.2em] text-encre-doux/70">
            {etiquette}
          </span>
        </div>
      </div>
      {legende && (
        <figcaption className="mt-2 font-donnees text-xs text-encre-doux">
          {legende}
        </figcaption>
      )}
    </figure>
  );
}
