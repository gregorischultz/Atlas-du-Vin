/**
 * URL de base do site. Em produção, definir NEXT_PUBLIC_SITE_URL na Vercel
 * (ex.: https://atlasduvin.com). Em local, usa localhost.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const SITE_NOM = "Atlas du Vin";
export const SITE_BASELINE =
  "L'univers du vin, cartographié avec rigueur, savoir et passion.";
