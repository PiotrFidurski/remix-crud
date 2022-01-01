import * as z from 'zod';

export const schema = z.object({
  username: z
    .string({ invalid_type_error: 'Username is required.' })
    .min(
      5,
      'Username should be at least 5 characters long.'
    )
    .max(
      25,
      'Username should be maximum of 25 characters long.'
    ),
  password: z
    .string({ invalid_type_error: 'Password is required.' })
    .min(8, 'Password must be at least 8 characters long.'),
});
