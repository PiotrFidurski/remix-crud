import {
  Form,
  useActionData,
  useSearchParams,
  useTransition,
} from 'remix';
import { Button } from '~/components/Elements';
import { InputField } from '~/components/Form';

export type LoginActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
};

export function LoginForm() {
  const actionData = useActionData<LoginActionData>();

  const [searchParams] = useSearchParams();

  const { submission } = useTransition();

  return (
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
        value={searchParams.get('redirectTo') ?? undefined}
      />
      <h1 className="font-bold text-4xl py-4 text-violet-700">
        Login
      </h1>
      <InputField
        errorMessage={actionData?.fieldErrors?.username}
        type="text"
        name="username"
        htmlFor="username"
        minLength={5}
        maxLength={25}
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
        {submission ? 'logging in...' : 'Login'}
      </Button>
    </Form>
  );
}
