import {
  ActionFunction,
  Form,
  json,
  useActionData,
} from 'remix';
import * as z from 'zod';
import { ZodError } from 'zod';
import { Button } from '~/components/Elements';
import { InputField } from '~/components/Form';
import {
  createUserSession,
  register,
} from '~/features/auth/session.server';
import { db } from '~/utils/db.server';

const schema = z.object({
  username: z
    .string({ invalid_type_error: 'Username is required.' })
    .min(
      5,
      'Username should be at least 5 characters long.'
    )
    .max(
      10,
      'Username should be maximum of 10 characters long.'
    ),
  password: z
    .string({ invalid_type_error: 'Password is required.' })
    .min(8, 'Password must be at least 8 characters long.'),
});

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    username: string;
    password: string;
  };
};

const badRequest = (data: ActionData) =>
  json(data, { status: 400 });

export const action: ActionFunction = async ({
  request,
}) => {
  const loginType = 'register';
  const form = await request.formData();
  const username = form.get('username') as string;
  const password = form.get('password') as string;

  const fields = { username, password };

  try {
    schema.parse({ username, password });
  } catch (error) {
    const errors = (error as ZodError).flatten();

    return badRequest({
      fieldErrors: {
        username: errors.fieldErrors.username[0],
        password: errors.fieldErrors.password[0],
      },
      fields,
    });
  }

  switch (loginType) {
    // case 'login': {
    //   const user = await login({ username, password });

    //   if (!user) {
    //     return badRequest({
    //       fields,
    //       formError: 'username/password is incorrect.',
    //     });
    //   }

    //   return createUserSession({
    //     userId: user.id,
    //     path: '/',
    //   });
    // }
    case 'register': {
      const existingUser = await db.user.findFirst({
        where: { username },
      });

      if (existingUser) {
        return badRequest({
          fields,
          formError: `User with username ${username} already exists.`,
        });
      }
      const user = await register({ username, password });

      if (!user) {
        return badRequest({
          fields,
          formError:
            'Something went wrong trying to create new user.',
        });
      }

      return createUserSession({
        userId: user.id,
        path: '/',
      });
    }
    default:
      return badRequest({
        fields,
        formError: `Login type invalid`,
      });
  }
};

export default function loginRoute() {
  const actionData = useActionData<ActionData>();
  console.log(actionData);
  return (
    <div className="bg-black-default rounded-md p-2">
      <Form
        aria-describedby={
          actionData?.formError
            ? 'form-error-message'
            : undefined
        }
        method="post"
        className="max-w-2xl w-full m-auto flex flex-col text-gray-300"
      >
        <h1 className="text-2xl text-violet-700">Login</h1>
        <InputField
          errorMessage={actionData?.fieldErrors?.username}
          type="text"
          name="username"
          htmlFor="username"
        >
          Username
        </InputField>
        <InputField
          errorMessage={actionData?.fieldErrors?.password!}
          type="password"
          name="password"
          htmlFor="password"
        >
          Password
        </InputField>
        <Button type="submit" className="border-violet-700">
          Login
        </Button>
      </Form>
    </div>
  );
}
