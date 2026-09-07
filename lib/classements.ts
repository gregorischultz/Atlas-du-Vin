import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  ManifesteClassements,
  EntreeSchema,
  type Classement,
  type Entree,
  type VinFiche,
} from "./schema";
import manifesteData from "@/data/classements.json";
import { registreVins } from "./vins-registry";

const DOSSIER = path.join(process.cwd(), "content/classements");

export type EntreeAvecCorps = Entree & { corps: string };
export type EntreeComplete = EntreeAvecCorps & { vinFiche: VinFiche };
export type ClassementComplet = Classement & {
  slug: string;
  entrees: EntreeComplete[];
};

/** Le manifeste des rankings (data/classements.json), validé. */
export function manifeste(): Record<string, Classement> {
  return ManifesteClassements.parse(manifesteData);
}

/** Charge et valide toutes les entrées MDX (frontmatter + corps). */
function chargerEntrees(): EntreeAvecCorps[] {
  if (!fs.existsSync(DOSSIER)) return [];
  return fs
    .readdirSync(DOSSIER)
    .filter((f) => f.endsWith(".mdx"))
    .map((fichier) => {
      const brut = fs.readFileSync(path.join(DOSSIER, fichier), "utf8");
      const { data, content } = matter(brut);
      const res = EntreeSchema.safeParse(data);
      if (!res.success) {
        const details = res.error.issues
          .map((i) => `    · ${i.path.join(".") || "(racine)"} : ${i.message}`)
          .join("\n");
        throw new Error(
          `\n❌ Entrée invalide : content/classements/${fichier}\n${details}\n`,
        );
      }
      const e = res.data;
      const attendu = `${e.classement}--${e.vin}.mdx`;
      if (fichier !== attendu) {
        throw new Error(
          `\n❌ content/classements/${fichier} : le nom de fichier attendu est "${attendu}".\n`,
        );
      }
      return { ...e, corps: content.trim() };
    });
}

/** Un ranking complet : identité + entrées ordonnées, jointes au registre. */
export function classementParSlug(slug: string): ClassementComplet | undefined {
  const identite = manifeste()[slug];
  if (!identite) return undefined;
  const reg = registreVins();

  const entrees = chargerEntrees()
    .filter((e) => e.classement === slug)
    .sort((a, b) => a.rang - b.rang)
    .map((e) => {
      const vinFiche = reg[e.vin];
      if (!vinFiche) {
        throw new Error(
          `\n❌ content/classements/${e.classement}--${e.vin}.mdx : vin "${e.vin}" absent de data/vins.json.\n`,
        );
      }
      return { ...e, vinFiche };
    });

  return { ...identite, slug, entrees };
}

/** Tous les slugs de classements (pour generateStaticParams). */
export function tousLesClassements(): string[] {
  return Object.keys(manifeste());
}

/**
 * Les deux rankings d'une famille (par type) : « meilleurs » et « qualité-prix ».
 * Convention de slug : `{famille}-meilleurs` et `{famille}-qualite-prix`.
 */
export function classementsParFamille(famille: string) {
  return {
    meilleurs: classementParSlug(`${famille}-meilleurs`),
    qualitePrix: classementParSlug(`${famille}-qualite-prix`),
  };
}

/**
 * Les deux rankings d'une famille dans un pays.
 * Slug : `{pays}-{famille}-meilleurs` et `{pays}-{famille}-qualite-prix`.
 */
export function classementsParPaysFamille(pays: string, famille: string) {
  return {
    meilleurs: classementParSlug(`${pays}-${famille}-meilleurs`),
    qualitePrix: classementParSlug(`${pays}-${famille}-qualite-prix`),
  };
}

/** URL publique d'un classement, déduite de son identité (portée/famille/pays). */
export function urlClassement(slug: string): string {
  const c = manifeste()[slug];
  if (!c) return "#";
  if (c.portee === "mondial") return "/classement-mondial";
  if (c.portee === "type") return `/classements/${c.famille}`;
  if (c.portee === "pays") return `/pays/${c.pays}/${c.famille}`;
  return "#";
}

/**
 * Les apparitions d'un vin dans les rankings — pour la fiche « figure dans ces
 * classements » (titre + URL + rang), triées par rang.
 */
export function apparitionsDuVin(
  slugVin: string,
): { slug: string; titre: string; url: string; rang: number }[] {
  const m = manifeste();
  return chargerEntrees()
    .filter((e) => e.vin === slugVin)
    .map((e) => ({
      slug: e.classement,
      titre: m[e.classement]?.titre ?? e.classement,
      url: urlClassement(e.classement),
      rang: e.rang,
    }))
    .sort((a, b) => a.rang - b.rang);
}
