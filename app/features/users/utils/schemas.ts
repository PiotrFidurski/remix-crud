import * as z from 'zod';

export const updateUserSchema = z.object({
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
  bio: z
    .string()
    .min(20, 'Bio should be at least 20 characters long.')
    .max(
      200,
      'Bio should be maximum of 25 characters long.'
    ),
});

export const createUserSchema = z.object({
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
