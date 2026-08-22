import { defineCollection } from 'astro:content';
import { ProjectSchema, TalkSchema, WorkSchema } from './schemas';
import { file, glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({
    pattern: '**/[^_-]*.{md,mdx}',
    base: './src/content/work',
  }),
  schema: WorkSchema,
});

const projects = defineCollection({
  loader: glob({
    pattern: '**/[^_-]*.{md,mdx}',
    base: './src/content/projects',
  }),
  schema: ({ image }) => ProjectSchema(image),
});

const talks = defineCollection({
  loader: file('./src/content/talks.json'),
  schema: TalkSchema,
});

export const collections = { work, projects, talks };
