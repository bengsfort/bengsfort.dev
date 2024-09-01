import { defineCollection } from 'astro:content';
import { ProjectSchema, TalkSchema, WorkSchema } from '../schemas';

const work = defineCollection({
  type: 'content',
  schema: WorkSchema,
});

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => ProjectSchema(image),
});

const talks = defineCollection({
  type: 'data',
  schema: TalkSchema,
});

export const collections = { work, projects, talks };
