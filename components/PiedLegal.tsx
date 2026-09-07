import Link from "next/link";
import { BlocSanitaire } from "@/components/BlocSanitaire";
import { LienGererCookies } from "@/components/LienGererCookies";
import { SITE_NOM, SITE_BASELINE } from "@/lib/site";

const liensLegaux = [
  { href: "/mentions-legales", libelle: "Mentions légales" },
  { href: "/politique-de-confidentialite", libelle: "Confidentialité" },
  { href: "/cookies", libelle: "Cookies" },
  { href: "/divulgation-affiliation", libelle: "Affiliation" },
  { href: "/contact", libelle: "Contact" },
];

/**
 * PiedLegal — rodapé com a menção sanitária (obrigatória em todas as páginas)
 * e as ligações legais.
 */
export function PiedLegal() {
  return (
    <footer className="border-t border-trait bg-papier">
      <div className="contenu py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-titres text-2xl tracking-tight text-lie">
              {SITE_NOM}
            </p>
            <p className="mt-2 max-w-[42ch] text-sm text-encre-doux">
              {SITE_BASELINE}
            </p>
          </div>
          <nav className="flex flex-col gap-2 font-corps text-sm md:items-end">
            {liensLegaux.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-encre-doux hover:text-lie"
              >
                {l.libelle}
              </Link>
            ))}
            <LienGererCookies />
          </nav>
        </div>

        <div className="filet-orne" />

        <BlocSanitaire />
        <p className="mt-2 font-donnees text-sm font-bold uppercase tracking-wide text-encre">
          La vente d&apos;alcool aux mineurs de moins de 18 ans est interdite.
        </p>
        <p className="mt-6 font-donnees text-xs text-encre-doux">
          © {new Date().getFullYear()} {SITE_NOM}
        </p>
      </div>
    </footer>
  );
}
