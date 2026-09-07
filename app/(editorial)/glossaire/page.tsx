import type { Metadata } from "next";
import { FilDAriane } from "@/components/FilDAriane";
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
      <FilDAriane
        miettes={[
          { libelle: "Accueil", href: "/" },
          { libelle: "Termes techniques" },
        ]}
      />
      <p className="mt-4 font-donnees text-sm uppercase tracking-wide text-sauge">
        Atlas du Vin
      </p>
      <h1 className="mt-3 text-4xl">Termes techniques</h1>
      <p className="mt-4 max-w-[60ch] text-lg text-encre-doux">
        Le vocabulaire et les classifications à connaître avant de parcourir nos
        classements.
      </p>

      <div className="mt-12 space-y-12">
        {groupes.map(([groupe, termes]) => (
          <section key={groupe}>
            <h2 className="font-donnees text-xs uppercase tracking-widest text-sauge">
              {groupe}
            </h2>
            <dl className="mt-4 space-y-6">
              {termes.map((t) => (
                <div
                  key={t.slug}
                  id={t.slug}
                  className="border-t border-trait pt-4"
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
