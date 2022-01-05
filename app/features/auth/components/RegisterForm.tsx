import {
  Form,
  useActionData,
  useSearchParams,
  useTransition,
} from 'remix';
import { Button } from '~/components/Elements';
import { InputField } from '~/components/Form';
import { LoginActionData } from '../types';

export function RegisterForm() {
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
        Register
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
      <Button
        type="submit"
        className="border-violet-700 rounded-full"
      >
        {submission ? 'logging in...' : 'Register'}
      </Button>
    </Form>
  );
}
