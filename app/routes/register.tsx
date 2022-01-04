import { ActionFunction, Link } from 'remix';
import { ZodError } from 'zod';
import {
  createUserSession,
  register,
  RegisterForm,
} from '~/features/auth';
import { badRequest } from '~/utils/badRequest';
import { db } from '~/utils/db.server';
import { schema } from './login';

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
      where: { username: username.toLowerCase() },
    });

    if (existingUser) {
      return badRequest({
        fieldErrors: {
          username: `User with username ${username} already exists.`,
          password: '',
        },
      });
    }

    const user = await register({
      username: username.toLowerCase(),
      password,
    });

    if (!user) {
      return badRequest({
        formError:
          'Something went wrong trying to create new user.',
      });
    }

    return await createUserSession({
      userId: user.id,
      redirectTo,
    });
  } catch (error) {
    const errors = (error as ZodError).flatten();

    return badRequest({
      fieldErrors: {
        username: errors.fieldErrors.username?.[0],
        password: errors.fieldErrors.password?.[0],
      },
    });
  }
};

export default function RegisterRoute() {
  return (
    <div className="bg-black-default flex text-gray-300 flex-col rounded-md p-2">
      <RegisterForm />
      <div className="flex justify-center">
        <h2 className="py-6 text-xl">
          Already have an account? login{' '}
          <Link
            to="/login"
            className="underline text-violet-600 underline-offset-1"
          >
            here
          </Link>
        </h2>
      </div>
    </div>
  );
}
