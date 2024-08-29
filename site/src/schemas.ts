import { type ImageFunction, reference, z } from 'astro:content';

const dateStr = z.string().transform((str) => new Date(str));

export const WorkSchema = z.object({
  workName: z.string(),
  startDate: dateStr,
  endDate: dateStr.optional(),
  position: z.string(),
  url: z.string().optional(),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const ProjectSchema = (image: ImageFunction) =>
  z.object({
    title: z.string(),
    assets: z.array(z.string()).optional(),
    previewImg: image(),
    featureVideo: z.string(),
    work: reference('work'),
    platform: z.enum(['mobile', 'desktop', 'browser']),
    type: z.array(z.enum(['app', 'tool', 'site', 'game'])),
    tech: z.array(z.string()),
    role: z.string(),
    url: z.string().optional(),
  });

export const TalkSchema = z.object({
  talks: z.array(
    z.object({
      title: z.string(),
      event: z.string(),
      location: z.string(),
      url: z.string().optional(),
    }),
  ),
});
