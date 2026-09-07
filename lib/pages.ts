import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DOSSIER = path.join(process.cwd(), "content/pages");

/**
 * Charge le corps MDX d'une page éditoriale de prose (content/pages/{slug}.mdx).
 * Renvoie null si le fichier n'existe pas encore : la page affiche alors un état
 * « en préparation ». Déposer le fichier suffit à publier le texte.
 */
export function chargerPage(slug: string): { corps: string } | null {
  const chemin = path.join(DOSSIER, `${slug}.mdx`);
  if (!fs.existsSync(chemin)) return null;
  const { content } = matter(fs.readFileSync(chemin, "utf8"));
  return { corps: content.trim() };
}
