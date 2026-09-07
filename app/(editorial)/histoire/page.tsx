import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FilDAriane } from "@/components/FilDAriane";
import { mdxComposants } from "@/lib/mdx-composants";
import { chargerPage } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Histoire du Vin — Atlas du Vin",
  description:
    "L'histoire du vin, de l'Antiquité aux grands centres viticoles d'aujourd'hui.",
  alternates: { canonical: "/histoire" },
};

export default function PageHistoire() {
  const page = chargerPage("histoire");

  return (
    <main className="contenu py-16">
      <FilDAriane
        miettes={[
          { libelle: "Accueil", href: "/" },
          { libelle: "Histoire du Vin" },
        ]}
      />
      <p className="mt-4 font-donnees text-sm uppercase tracking-wide text-sauge">
        Atlas du Vin
      </p>
      <h1 className="mt-3 text-4xl">Histoire du Vin</h1>

      <div className="prose-atlas mt-8 max-w-[72ch] text-lg text-encre-doux">
        {page ? (
          <MDXRemote source={page.corps} components={mdxComposants} />
        ) : (
          <p className="font-donnees text-sm">
            Section en préparation — le contenu sera publié prochainement.
          </p>
        )}
      </div>
    </main>
  );
}
