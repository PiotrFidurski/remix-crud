import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from 'remix';
import * as z from 'zod';
import { requireUserId } from '~/features/auth';
import { EditUser } from '~/features/users';
import { LoaderData } from '~/features/users/types';
import { badRequest } from '~/utils/badRequest';
import { db } from '~/utils/db.server';

const schema = z.object({
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
      'Bio should be maximum of 200 characters long.'
    ),
});

export const action: ActionFunction = async ({
  request,
  params,
}) => {
  const form = await request.formData();

  const formUsername = (
    form.get('username') as string
  ).trim();
  const bio = form.get('bio') as string;

  const { username } = params;

  try {
    const userId = await requireUserId(request);

    const user = await db.user.findFirst({
      where: { username },
    });

    if (!user) {
      throw json('We cant find requested user anymore.', {
        status: 404,
      });
    }

    if (user?.id !== userId) {
      throw json('You are not the owner of this account', {
        status: 401,
      });
    }

    schema.parse({ username: formUsername, bio });

    const existingUser = await db.user.findFirst({
      where: { username: formUsername },
    });

    if (existingUser) {
      return badRequest({
        fieldErrors: {
          username: `username ${formUsername} is already taken.`,
        },
      });
    }

    await db.user.update({
      where: { id: user.id },
      data: { username: formUsername, bio },
    });

    return redirect(`/${formUsername}`);
  } catch (error) {
    const errors = (error as z.ZodError).flatten();

    return badRequest({
      fieldErrors: {
        username: errors.fieldErrors.username?.[0],
        bio: errors.fieldErrors.username?.[0],
      },
    });
  }
};

export const loader: LoaderFunction = async ({
  request,
  params,
}) => {
  const { username } = params;

  const userId = await requireUserId(request);

  const user = await db.user.findFirst({
    where: { username },
  });

  if (user?.id !== userId) {
    return redirect(`/${username}`);
  }

  const data: LoaderData = {
    user,
  };

  return data;
};

export default function UsernameEditRoute() {
  return (
    <div className="px-6 max-w-2xl m-auto">
      <EditUser />
    </div>
  );
}
