import { defineCollection, z } from 'astro:content';

export const collections = {
	projects: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			date: z.date().optional(),
			tags: z.array(z.string()),
			img: z.string().optional(),
			img_alt: z.string().optional(),
		}),
	}),
};