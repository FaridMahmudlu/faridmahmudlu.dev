import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Localised case-study prose. Entry ids look like `en/calisiyo`. */
const work = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    headline: z.string(),
  }),
});

/** Localised legal documents. Entry ids look like `hu/privacy`. */
const legal = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    /** YAML parses bare dates; normalise to an ISO `YYYY-MM-DD` string. */
    updated: z.coerce.date().transform((d) => d.toISOString().slice(0, 10)),
  }),
});

export const collections = { work, legal };
