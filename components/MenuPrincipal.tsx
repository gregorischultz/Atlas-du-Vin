"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type LienMenu = { href: string; libelle: string };
export type ArbreMenu = {
  guide: LienMenu[];
  parType: LienMenu[];
  parPays: LienMenu[];
};

/**
 * MenuPrincipal — bouton « trois traits » + panneau de navigation plein écran.
 * C'est l'outil de navigation principal de l'Atlas : il expose tout l'arbre
 * (Guide, Classements par type, Classements par pays).
 *
 * L'arbre est calculé côté serveur (EnTete) et passé en props : le client ne
 * reçoit que des données prêtes.
 */
export function MenuPrincipal({ arbre }: { arbre: ArbreMenu }) {
  const [ouvert, setOuvert] = useState(false);

  // Échap ferme le panneau ; on verrouille le défilement de la page dessous.
  useEffect(() => {
    if (!ouvert) return;
    function surTouche(e: KeyboardEvent) {
      if (e.key === "Escape") setOuvert(false);
    }
    document.addEventListener("keydown", surTouche);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", surTouche);
      document.body.style.overflow = "";
    };
  }, [ouvert]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOuvert(true)}
        aria-expanded={ouvert}
        aria-controls="menu-atlas"
        aria-label="Ouvrir le menu"
        className="flex items-center gap-2 font-corps text-base text-encre hover:text-lie"
      >
        <span className="flex flex-col gap-[5px]" aria-hidden>
          <span className="block h-px w-6 bg-current" />
          <span className="block h-px w-6 bg-current" />
          <span className="block h-px w-6 bg-current" />
        </span>
        <span className="hidden sm:inline">Menu</span>
      </button>

      {ouvert && (
        <div
          id="menu-atlas"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation de l'Atlas"
          className="fondu fixed inset-0 z-40 overflow-y-auto bg-craie"
        >
          <div className="sticky top-0 border-b border-trait bg-craie/85 backdrop-blur-md">
            <div className="contenu flex items-center justify-between py-4">
              <span className="font-titres text-2xl tracking-tight text-lie">
                Atlas du Vin 
              </span>
              <button
                type="button"
                onClick={() => setOuvert(false)}
                aria-label="Fermer le menu"
                className="font-donnees text-sm uppercase tracking-widest text-encre hover:text-lie"
              >
                Fermer 
              </button>
            </div>
          </div>

          <div className="apparition contenu grid gap-12 pb-24 pt-12 md:grid-cols-3">
            <ColonneMenu
              titre="Guide"
              liens={arbre.guide}
              onNaviguer={() => setOuvert(false)}
            />
            <ColonneMenu
              titre="Classements par type"
              liens={arbre.parType}
              onNaviguer={() => setOuvert(false)}
            />
            <ColonneMenu
              titre="Classements par pays"
              liens={arbre.parPays}
              onNaviguer={() => setOuvert(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

function ColonneMenu({
  titre,
  liens,
  onNaviguer,
}: {
  titre: string;
  liens: LienMenu[];
  onNaviguer: () => void;
}) {
  return (
    <nav>
      <h2 className="border-b border-trait pb-3 font-donnees text-xs uppercase tracking-[0.2em] text-sauge">
        {titre}
      </h2>
      <ul className="mt-5 space-y-4">
        {liens.map((lien, i) => (
          <li key={lien.href}>
            <Link
              href={lien.href}
              onClick={onNaviguer}
              className="group flex items-baseline gap-3 font-titres text-xl text-encre hover:text-lie"
            >
              <span className="font-donnees text-xs text-encre-doux group-hover:text-lie">
                {String(i + 1).padStart(2, "0")}
              </span>
              {lien.libelle}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
