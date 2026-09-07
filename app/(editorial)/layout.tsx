import { BlocSanitaire } from "@/components/BlocSanitaire";

/**
 * Layout du groupe (editorial) — regrasLegais §9.
 *
 * ZONE SANS AFFILIATION. Aucun composant commercial (BoutonOffre,
 * DivulgationAffiliation) ne doit être importé sous ce groupe : c'est ce qui
 * préserve la protection éditoriale de l'art. L3323-3-1 (terroir, histoire,
 * patrimoine) et évite de qualifier ces pages de « publicité ».
 *
 * La mention sanitaire est injectée ici, jamais collée page par page.
 */
export default function LayoutEditorial({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="contenu pb-10">
        <div className="border-t border-trait pt-4">
          <BlocSanitaire />
        </div>
      </div>
    </>
  );
}
