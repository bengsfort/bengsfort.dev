import { reference, z } from 'astro:content';

const dateStr = z.string().transform((str) => new Date(str));

export const WorkSchema = z.object({
  workName: z.string(),
  startDate: dateStr,
  endDate: dateStr.optional(),
  position: z.string(),
  url: z.string().optional(),
});

export const ProjectSchema = z.object({
  title: z.string(),
  assets: z.array(z.string()).optional(),
  work: reference('work'),
  platform: z.enum(['mobile', 'desktop', 'browser']),
  type: z.array(z.enum(['app', 'tool', 'site', 'game'])),
  url: z.string().optional(),
});
