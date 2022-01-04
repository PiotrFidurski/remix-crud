import { User } from '@prisma/client';
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from 'remix';
import * as z from 'zod';
import { Button } from '~/components/Elements';
import {
  InputField,
  TextareaField,
} from '~/components/Form';
import { requireUserId } from '~/features/auth';
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

export type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    bio: string | undefined;
  };
};

type LoaderData = {
  user: User;
};

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
  const data = useLoaderData<LoaderData>();

  const actionData = useActionData<ActionData>();

  const { submission } = useTransition();

  return (
    <div className="px-6 max-w-2xl m-auto">
      <Form method="post" className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl py-4 text-violet-700">
          Edit your profile
        </h1>
        <InputField
          errorMessage={actionData?.fieldErrors?.username}
          htmlFor="username"
          defaultValue={data.user.username}
          type="text"
          name="username"
          minLength={5}
          maxLength={25}
          required
          aria-invalid={Boolean(
            actionData?.fieldErrors?.username
          )}
          aria-describedby={
            actionData?.fieldErrors?.username
              ? 'username-error'
              : undefined
          }
        >
          Username
        </InputField>
        <TextareaField
          errorMessage={actionData?.fieldErrors?.bio}
          defaultValue={data.user.bio!}
          htmlFor="bio"
          name="bio"
          minLength={20}
          maxLength={200}
          aria-invalid={Boolean(
            actionData?.fieldErrors?.bio
          )}
          aria-describedby={
            actionData?.fieldErrors?.bio
              ? 'bio-error'
              : undefined
          }
        >
          Bio
        </TextareaField>
        <Button
          className="border-2 border-violet-700"
          type="submit"
        >
          {submission ? 'Updating...' : 'Update'}
        </Button>
      </Form>
    </div>
  );
}
