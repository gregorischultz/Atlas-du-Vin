import Link from "next/link";
import { SITE_NOM } from "@/lib/site";
import { FAMILLES_VIN, libelleFamille } from "@/lib/libelles";
import { MenuPrincipal, type ArbreMenu } from "@/components/MenuPrincipal";
import paysData from "@/data/pays.json";

const pays = paysData as Record<string, { libelle_fr: string }>;

// Arbre de navigation, calculé côté serveur puis passé au panneau client.
const arbre: ArbreMenu = {
  guide: [
    { href: "/histoire", libelle: "Histoire du Vin" },
    { href: "/pays", libelle: "Top 5 des pays" },
    { href: "/experts", libelle: "Les 10 experts" },
    { href: "/classement-mondial", libelle: "Top 10 mondial" },
    { href: "/types", libelle: "Les 6 types de vin" },
    { href: "/glossaire", libelle: "Termes techniques" },
  ],
  parType: FAMILLES_VIN.map((f) => ({
    href: `/classements/${f}`,
    libelle: libelleFamille(f),
  })),
  parPays: Object.entries(pays).map(([slug, p]) => ({
    href: `/pays/${slug}`,
    libelle: p.libelle_fr,
  })),
};

/**
 * EnTete — cabeçalho presente em todas as páginas. O menu « trois traits » é a
 * principal ferramenta de navegação de l'Atlas.
 */
export function EnTete() {
  return (
    <header className="sticky top-0 z-30 border-b border-trait bg-craie/85 backdrop-blur-md">
      <div className="contenu flex items-center justify-between py-4">
        <Link
          href="/"
          className="font-titres text-2xl tracking-tight text-lie hover:text-lie-clair"
        >
          {SITE_NOM}
        </Link>
        <MenuPrincipal arbre={arbre} />
      </div>
    </header>
  );
}
