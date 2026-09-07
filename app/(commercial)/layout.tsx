/**
 * Layout du groupe (commercial) — regrasLegais §9.
 *
 * SEULE zone autorisée à porter des liens affiliés. Les composants BoutonOffre
 * et DivulgationAffiliation ne doivent être importés que sous ce groupe.
 *
 * Volontairement, ce layout n'injecte PAS de mention sanitaire globale : chaque
 * fiche place la mention sanitaire ET la divulgation d'affiliation au plus près
 * des liens d'achat (art. L3323-4 §3 : proportionnalité et proximité du bloc
 * publicitaire, et L121-1 : divulgation « avant le premier lien »). La placer
 * au fond de page serait moins défendable. Le rôle de ce layout est donc la
 * frontière structurelle, pas l'injection.
 */
export default function LayoutCommercial({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
