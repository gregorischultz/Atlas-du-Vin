import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Carte } from "@/components/Carte";
import { Badge } from "@/components/Badge";
import { Etoiles } from "@/components/Etoiles";
import { mdxComposants } from "@/lib/mdx-composants";
import type { ClassementComplet } from "@/lib/classements";

/**
 * ListeClassement — rend un ranking (liste ordonnée d'entrées). Zone ÉDITORIALE :
 * aucun lien d'affiliation ici. Le « où acheter » vit sur la fiche /vin/[slug].
 *
 * Tant qu'aucune entrée n'existe, on affiche un état « en préparation » : la
 * structure est prête, il ne reste qu'à déposer les fichiers de contenu.
 */
export function ListeClassement({
  classement,
}: {
  classement: ClassementComplet;
}) {
  if (classement.entrees.length === 0) {
    return (
      <p className="font-donnees text-sm text-encre-doux">
        Classement en préparation — le contenu sera publié prochainement.
      </p>
    );
  }

  return (
    <ol className="space-y-6">
      {classement.entrees.map((entree) => {
        const vin = entree.vinFiche;
        return (
          <li key={entree.vin}>
            <Carte>
              <div className="grid grid-cols-[auto_1fr] gap-x-5">
                {/* Numéro de rang — grand chiffre sérif, plaque de musée */}
                <span
                  className="font-titres text-4xl leading-none text-lie/80 md:text-5xl"
                  aria-hidden
                >
                  {String(entree.rang).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="text-2xl text-encre">
                      <Link
                        href={`/vin/${entree.vin}`}
                        className="hover:text-lie"
                      >
                        {vin.nom}
                      </Link>
                    </h3>
                    {entree.highlight && (
                      <Badge ton="lie">{entree.highlight}</Badge>
                    )}
                  </div>
                  <p className="mt-1 font-donnees text-sm text-encre-doux">
                    {vin.producteur} · {vin.region} — {vin.cepages.join(", ")}
                  </p>
                  {(entree.etoiles_qp || entree.prix_indicatif) && (
                    <p className="mt-2 flex flex-wrap items-center gap-3 font-donnees text-sm">
                      {entree.etoiles_qp && <Etoiles note={entree.etoiles_qp} />}
                      {entree.prix_indicatif && (
                        <span className="text-encre">
                          {entree.prix_indicatif}
                        </span>
                      )}
                    </p>
                  )}
                  <div className="prose-atlas mt-4 text-encre-doux">
                    <MDXRemote source={entree.corps} components={mdxComposants} />
                  </div>
                </div>
              </div>
            </Carte>
          </li>
        );
      })}
    </ol>
  );
}
