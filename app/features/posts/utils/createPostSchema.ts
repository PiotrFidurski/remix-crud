import * as z from 'zod';

export const schema = z.object({
  title: z
    .string({ invalid_type_error: 'title is required.' })
    .min(5, 'title should be at least 5 characters.')
    .max(30, 'title should have maximum of 30 characters'),

  content: z
    .string({
      invalid_type_error: 'content is required.',
    })
    .min(50, 'content should be at least 50 characters')
    .max(
      300,
      'content should have maximum of 300 characters'
    ),
});
