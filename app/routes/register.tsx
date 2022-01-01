import {
  ActionFunction,
  Form,
  json,
  useActionData,
  useSearchParams,
} from 'remix';
import { ZodError } from 'zod';
import { Button } from '~/components/Elements';
import { InputField } from '~/components/Form';
import {
  createUserSession,
  register,
} from '~/features/auth/session/session.server';
import { schema } from '~/features/auth/utils/schema';
import { db } from '~/utils/db.server';

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
};

const badRequest = (data: ActionData) =>
  json(data, { status: 400 });

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

    const user = await register({ username, password });

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
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  return (
    <div className="bg-black-default flex justify-center rounded-md p-2 min-h-screen">
      <Form
        aria-describedby={
          actionData?.formError
            ? 'form-error-message'
            : undefined
        }
        method="post"
        className="max-w-xl w-full m-auto flex flex-col text-gray-300"
      >
        <input
          type="hidden"
          name="redirectTo"
          value={
            searchParams.get('redirectTo') ?? undefined
          }
        />
        <h1 className="font-bold text-4xl py-4 text-violet-700">
          Register
        </h1>
        <InputField
          errorMessage={actionData?.fieldErrors?.username}
          type="text"
          name="username"
          htmlFor="username"
          minLength={5}
          required
        >
          Username
        </InputField>
        <InputField
          errorMessage={actionData?.fieldErrors?.password}
          type="password"
          name="password"
          htmlFor="password"
          minLength={8}
          required
        >
          Password
        </InputField>
        <Button type="submit" className="border-violet-700">
          Register
        </Button>
        {actionData?.formError}
      </Form>
    </div>
  );
}
