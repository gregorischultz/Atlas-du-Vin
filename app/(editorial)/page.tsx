import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Carte } from "@/components/Carte";
import { mdxComposants } from "@/lib/mdx-composants";
import { chargerPage } from "@/lib/pages";
import { SITE_BASELINE } from "@/lib/site";
import { FAMILLES_VIN, libelleFamille } from "@/lib/libelles";

// Portes d'entrée vers les sections du Guide. Descriptions neutres (structure).
const sections = [
  { href: "/histoire", titre: "Histoire du Vin", desc: "De l'Antiquité aux grands centres viticoles." },
  { href: "/pays", titre: "Top 5 des pays", desc: "Les grands pays producteurs, région par région." },
  { href: "/experts", titre: "Les 10 experts", desc: "Les références de nos classements." },
  { href: "/classement-mondial", titre: "Top 10 mondial", desc: "Notre classement général, toutes origines." },
  { href: "/types", titre: "Les 6 types de vin", desc: "L'essence de chaque style." },
  { href: "/glossaire", titre: "Termes techniques", desc: "Le vocabulaire et les classifications." },
];

export default function Home() {
  const intro = chargerPage("accueil");

  return (
    <main>
      {/* Hero — l'introduction (MDX) sera déposée dans content/pages/accueil.mdx */}
      <section className="border-b border-trait">
        <div className="contenu py-20">
          <p className="font-donnees text-sm uppercase tracking-wide text-sauge">
            Atlas du Vin
          </p>
          <h1 className="mt-4 max-w-[20ch] text-4xl leading-tight">
            {SITE_BASELINE}
          </h1>
          <div className="prose-atlas mt-6 max-w-[68ch] text-lg text-encre-doux">
            {intro ? (
              <MDXRemote source={intro.corps} components={mdxComposants} />
            ) : (
              <p className="font-donnees text-sm">
                Introduction en préparation — le contenu sera publié
                prochainement.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Explorer l'Atlas */}
      <section className="contenu py-16">
        <h2 className="text-2xl text-lie">Explorer l&apos;Atlas</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="block">
              <Carte>
                <h3 className="text-xl text-encre">{s.titre}</h3>
                <p className="mt-2 text-sm text-encre-doux">{s.desc}</p>
              </Carte>
            </Link>
          ))}
        </div>
      </section>

      {/* Classements par type */}
      <section className="border-t border-trait bg-sable">
        <div className="contenu py-16">
          <h2 className="text-2xl text-lie">Classements par type</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {FAMILLES_VIN.map((f) => (
              <Link
                key={f}
                href={`/classements/${f}`}
                className="rounded-carafe border border-trait bg-papier px-4 py-2 font-corps text-encre hover:border-lie hover:text-lie"
              >
                {libelleFamille(f)}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
