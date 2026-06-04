import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectCollection = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/projects"
    }),
    schema: z.object({
        title: z.string(),
        tags: z.array(z.string()),
        url: z.string().url(),
        githubUrl: z.string().url().optional(),
        dates: z.string(),
        desc: z.string(),
        image: z.string().optional(),
    }),
});

export const collections = {
    'projects': projectCollection,
};
