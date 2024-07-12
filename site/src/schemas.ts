import { reference, z } from 'astro:content';

const dateStr = z.string().transform((str) => new Date(str));

export const WorkSchema = z.object({
  workName: z.string(),
  startDate: dateStr,
  endDate: dateStr.optional(),
  position: z.string(),
});

export const ProjectSchema = z.object({
  title: z.string(),
  assets: z.array(z.string()).optional(),
  work: reference('work'),
});
