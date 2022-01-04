import { ActionFunction, Link } from 'remix';
import * as z from 'zod';
import {
  createUserSession,
  login,
  LoginForm,
} from '~/features/auth';
import { badRequest } from '~/utils/badRequest';
import { db } from '~/utils/db.server';

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

export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();

  const redirectTo =
    (form.get('redirectTo') as string) || '/';
  const username = form.get('username') as string;
  const password = form.get('password') as string;

  try {
    schema.parse({ username, password });

    const existingUser = await db.user.findFirst({
      where: { username },
    });

    if (!existingUser) {
      return badRequest({
        fieldErrors: {
          username: `User with username ${username} doesn't exists.`,
          password: '',
        },
      });
    }

    const user = await login({ username, password });

    if (!user) {
      return badRequest({
        fieldErrors: {
          password: '',
          username:
            'Username or password is wrong please try again',
        },
      });
    }

    return await createUserSession({
      userId: user.id,
      redirectTo,
    });
  } catch (error) {
    const errors = (error as z.ZodError).flatten();

    return badRequest({
      fieldErrors: {
        username: errors.fieldErrors.username?.[0],
        password: errors.fieldErrors.password?.[0],
      },
    });
  }
};

export default function LoginRoute() {
  return (
    <div className="bg-black-default flex flex-col justify-center rounded-md p-2 px-4 text-gray-300">
      <LoginForm />
      <div className="flex justify-center">
        <h2 className="py-6 text-xl">
          Don&apos;t have an account? register{' '}
          <Link
            to="/register"
            className="underline text-violet-600 underline-offset-1"
          >
            here
          </Link>
        </h2>
      </div>
    </div>
  );
}
