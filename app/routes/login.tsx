import { Form } from 'remix';
import { InputField } from '~/components/Form';

export default function loginRoute() {
  return (
    <div className="bg-black-default rounded-md p-2">
      <Form className="max-w-2xl w-full m-auto flex flex-col text-gray-300">
        <h1 className="text-2xl text-violet-700">Login</h1>
        <InputField
          type="text"
          name="username"
          htmlFor="username"
          minLength={5}
          maxLength={10}
        >
          Username
        </InputField>
        <InputField
          type="password"
          name="password"
          htmlFor="password"
          minLength={8}
          maxLength={12}
        >
          Password
        </InputField>
      </Form>
    </div>
  );
}
