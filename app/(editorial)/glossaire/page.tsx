import type { Metadata } from "next";
import { EnTeteSection } from "@/components/EnTeteSection";
import { glossaireParGroupe } from "@/lib/glossaire";

export const metadata: Metadata = {
  title: "Termes techniques — Atlas du Vin",
  description:
    "Le vocabulaire et les classifications du vin : AOP, DOCG, Grand Cru, Vintage et autres.",
  alternates: { canonical: "/glossaire" },
};

export default function PageGlossaire() {
  const groupes = glossaireParGroupe();

  return (
    <main className="contenu py-16">
      <EnTeteSection
        miettes={[
          { libelle: "Accueil", href: "/" },
          { libelle: "Termes techniques" },
        ]}
        surtitre="Guide"
        titre="Termes techniques"
        chapeau="Le vocabulaire et les classifications à connaître avant de parcourir nos classements."
      />

      {/* Navigation par groupe — feel d'ouvrage de référence */}
      <nav className="mt-10 flex flex-wrap gap-2">
        {groupes.map(([groupe]) => (
          <a
            key={groupe}
            href={`#${groupe.toLowerCase()}`}
            className="rounded-carafe border border-trait px-3 py-1 font-donnees text-sm text-encre-doux hover:border-lie hover:text-lie"
          >
            {groupe}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-16">
        {groupes.map(([groupe, termes]) => (
          <section key={groupe} id={groupe.toLowerCase()} className="scroll-mt-24">
            <div className="flex items-baseline gap-4 border-b border-trait pb-3">
              <h2 className="font-donnees text-xs uppercase tracking-[0.2em] text-sauge">
                {groupe}
              </h2>
              <span className="font-donnees text-xs text-encre-doux">
                {termes.length}{" "}
                {termes.length > 1 ? "termes" : "terme"}
              </span>
            </div>
            <dl className="mt-6 space-y-6">
              {termes.map((t) => (
                <div
                  key={t.slug}
                  id={t.slug}
                  className="scroll-mt-24 border-t border-trait pt-4 first:border-t-0 first:pt-0"
                >
                  <dt className="font-titres text-xl text-encre">{t.terme}</dt>
                  <dd className="mt-2 text-encre-doux">{t.definition}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </main>
  );
}
