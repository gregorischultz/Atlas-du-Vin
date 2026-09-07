import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { FAMILLES_VIN } from "@/lib/libelles";
import { tousLesPays } from "@/lib/pays";
import { registreVins } from "@/lib/vins-registry";

/*
  Sitemap généré au build à partir de la structure de l'Atlas.
  Exclut /go/ (affiliation), /kit (interne) et les pages « extra » (accords,
  recherche) hors périmètre de l'Atlas.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (chemin: string) => `${SITE_URL}${chemin}`;
  const now = new Date();
  const entree = (c: string) => ({ url: u(c), lastModified: now });

  const statiques = [
    "/",
    "/histoire",
    "/experts",
    "/glossaire",
    "/types",
    "/pays",
    "/classement-mondial",
    "/mentions-legales",
    "/politique-de-confidentialite",
    "/cookies",
    "/divulgation-affiliation",
    "/contact",
  ].map(entree);

  // Classements par type
  const parType = FAMILLES_VIN.map((f) => entree(`/classements/${f}`));

  // Pays : la fiche pays + chaque famille du pays
  const paysSlugs = Object.keys(tousLesPays());
  const parPays = paysSlugs.flatMap((p) => [
    entree(`/pays/${p}`),
    ...FAMILLES_VIN.map((f) => entree(`/pays/${p}/${f}`)),
  ]);

  // Fiches de vin (registre)
  const vins = Object.keys(registreVins()).map((slug) => entree(`/vin/${slug}`));

  return [...statiques, ...parType, ...parPays, ...vins];
}
