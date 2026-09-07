import { z } from "zod";

/*
  Schema de uma ficha de vinho (secção 6 do prompt).
  O Zod (biblioteca que valida a forma dos dados em tempo de execução) rejeita
  qualquer ficha que não cumpra exatamente esta estrutura. É isto que faz o
  build FALHAR quando uma ficha está incompleta ou errada.
*/

// Enums fechados — qualquer outro valor é rejeitado
export const TypeVin = z.enum([
  "rouge-sec",
  "rouge-moelleux",
  "blanc-sec",
  "blanc-moelleux",
  "rose",
  "effervescent",
  "champagne",
  "vin-doux-naturel",
  "vin-fortifie",
]);
export type TypeVin = z.infer<typeof TypeVin>;

export const Statut = z.enum(["brouillon", "relu", "publie"]);

const note1a5 = z.number().int().min(1).max(5);

const Degustation = z.object({
  corps: note1a5,
  acidite: note1a5,
  tanins: note1a5.nullable(), // null nos brancos
  sucrosite: note1a5,
});

// Uma data no formato AAAA-MM-JJ
const dateIso = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date attendue au format AAAA-MM-JJ");

export const Offre = z.object({
  marchand: z.string().min(1),
  url_affiliee: z.url(),
  prix_eur: z.number().positive(),
  date_verification: dateIso,
  disponible: z.boolean(),
});

export const VinSchema = z
  .object({
    slug: z.string().min(1),
    nom: z.string().min(1),
    producteur: z.string().min(1),
    pays: z.string().min(1), // slug, validado contra data/pays.json no loader
    region: z.string().min(1),
    appellation: z.string().min(1),
    type: TypeVin,
    cepages: z.array(z.string().min(1)).min(1),
    millesime: z.number().int().min(1900).max(2100),
    degre: z.number().min(0).max(25),
    prix_reference_eur: z.number().positive(),
    date_prix: dateIso,

    note_qualite: z.number().min(0).max(20),
    degustation: Degustation,
    aromes: z.array(z.string().min(1)).min(1),
    temperature_service: z.string().min(1),
    garde: z.string().min(1),
    carafage: z.boolean(),

    accords: z.array(z.string().min(1)),

    resume: z.string().min(1),
    auteur: z.string().min(1),
    date_publication: dateIso,
    date_revision: dateIso,
    statut: Statut,

    offres: z.array(Offre).default([]),
  })
  // Regra de domínio: os brancos e efervescentes não têm taninos; os tintos têm.
  .superRefine((vin, ctx) => {
    const sansTanins = ["blanc-sec", "blanc-moelleux", "effervescent", "champagne"];
    if (sansTanins.includes(vin.type) && vin.degustation.tanins !== null) {
      ctx.addIssue({
        code: "custom",
        path: ["degustation", "tanins"],
        message: `tanins doit être null pour un vin de type ${vin.type}`,
      });
    }
    if (vin.type.startsWith("rouge") && vin.degustation.tanins === null) {
      ctx.addIssue({
        code: "custom",
        path: ["degustation", "tanins"],
        message: "tanins ne peut pas être null pour un vin rouge",
      });
    }
  });

export type Vin = z.infer<typeof VinSchema>;

// Vista do vinho SEM as ofertas — usada no cálculo do classement (secção 7).
// O TypeScript torna impossível que 'offres' entre no cálculo do QPR.
export type VinPourClassement = Omit<Vin, "offres">;

/* ────────────────────────────────────────────────────────────────────────
   ATLAS DU VIN — schemas do conteúdo editorial (Guia).
   Dados estruturados curtos → JSON validado por Zod. Texto longo → MDX.
   A ordem no array = ordem de exibição (rankings já vêm ordenados pelo autor).
   ──────────────────────────────────────────────────────────────────────── */

// Um especialista (secção « Les 10 experts »). Conteúdo factual/biográfico.
export const ExpertSchema = z.object({
  slug: z.string().min(1),
  nom: z.string().min(1),
  nationalite: z.array(z.string().min(1)).min(1), // ex.: ["Royaume-Uni"]
  accroche: z.string().min(1), // uma linha
  description: z.string().min(1),
  specialite: z.string().min(1),
});
export type Expert = z.infer<typeof ExpertSchema>;
export const ListeExperts = z.array(ExpertSchema);

// Um termo do glossário (secção « Termes techniques »).
export const GlossaireTermeSchema = z.object({
  slug: z.string().min(1),
  terme: z.string().min(1), // ex.: "AOP — Appellation d'Origine Protégée"
  groupe: z.string().min(1), // ex.: "France", "Italie", "International"
  definition: z.string().min(1),
});
export type GlossaireTerme = z.infer<typeof GlossaireTermeSchema>;
export const ListeGlossaire = z.array(GlossaireTermeSchema);

// Um dos 6 grands types de vin du Guide (essence + meilleure origine).
export const TypeGuideSchema = z.object({
  slug: z.string().min(1),
  nom: z.string().min(1), // ex.: "Rouge"
  essence: z.string().min(1),
  meilleur_pays: z.string().min(1), // ex.: "France"
  meilleure_region: z.string().min(1), // ex.: "Bordeaux"
  note: z.string().optional(), // précision facultative
});
export type TypeGuide = z.infer<typeof TypeGuideSchema>;
export const ListeTypesGuide = z.array(TypeGuideSchema);

// Um país (data/pays.json). Os campos de ranking são opcionais: preenchidos por
// vaga (Fase 3). libelle_fr/note_contexte já eram usados pelo código existente.
export const PaysSchema = z.object({
  libelle_fr: z.string().min(1),
  note_contexte: z.string().min(1),
  rang: z.number().int().min(1).optional(),
  note_sur_10: z.number().min(0).max(10).optional(),
  regions: z.array(z.string().min(1)).optional(),
  pourquoi: z.string().min(1).optional(),
});
export type Pays = z.infer<typeof PaysSchema>;
export const CartePays = z.record(z.string(), PaysSchema);

/* ── Vinhos + rankings (modelo normalizado, decisão 2c) ──────────────────── */

// As 6 familles de vin utilizadas pelos rankings.
export const FamilleVin = z.enum([
  "rouge",
  "blanc-sec",
  "blanc-doux",
  "rose",
  "effervescent",
  "fortifie",
]);
export type FamilleVin = z.infer<typeof FamilleVin>;

// TABELA VINS — a identidade de um vinho (data/vins.json). É o que alimenta a
// ficha comercial /vin/[slug] ; o « où acheter » (offres) mora só aqui.
export const VinFicheSchema = z.object({
  slug: z.string().min(1),
  nom: z.string().min(1),
  producteur: z.string().min(1),
  pays: z.string().min(1), // slug, validado contra data/pays.json no loader
  region: z.string().min(1),
  appellation: z.string().min(1),
  famille: FamilleVin,
  cepages: z.array(z.string().min(1)).min(1),
  degre: z.number().min(0).max(25).optional(),
  offres: z.array(Offre).default([]),
});
export type VinFiche = z.infer<typeof VinFicheSchema>;
export const RegistreVins = z.record(z.string(), VinFicheSchema);

// TABELA CLASSEMENTS — a identidade de um ranking (data/classements.json).
export const PorteeClassement = z.enum(["mondial", "type", "pays"]);
export const CategorieClassement = z.enum(["meilleurs", "qualite-prix"]);
export const ClassementSchema = z.object({
  titre: z.string().min(1),
  portee: PorteeClassement,
  famille: FamilleVin.optional(), // requis si portee = type | pays
  pays: z.string().min(1).optional(), // requis si portee = pays
  categorie: CategorieClassement.optional(),
});
export type Classement = z.infer<typeof ClassementSchema>;
export const ManifesteClassements = z.record(z.string(), ClassementSchema);

// ENTRÉE — un vin dans un ranking (frontmatter de content/classements/*.mdx).
// Le corps MDX porte la prose éditoriale, propre à ce ranking.
export const EntreeSchema = z.object({
  classement: z.string().min(1), // slug d'un classement du manifeste
  vin: z.string().min(1), // slug d'un vin du registre
  rang: z.number().int().min(1),
  etoiles_qp: z.number().int().min(1).max(5).optional(), // rankings « qualité-prix »
  prix_indicatif: z.string().min(1).optional(), // ex.: "€30–70" (fourchette, pas un prix unique)
  highlight: z.string().min(1).optional(), // ex.: "Notre nº 1 absolu"
});
export type Entree = z.infer<typeof EntreeSchema>;
