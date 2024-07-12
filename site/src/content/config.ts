import { defineCollection } from 'astro:content';
import { ProjectSchema, WorkSchema } from '../schemas';

const work = defineCollection({
  type: 'content',
  schema: WorkSchema,
});

const projects = defineCollection({
  type: 'content',
  schema: ProjectSchema,
});

export const collections = { work, projects };
