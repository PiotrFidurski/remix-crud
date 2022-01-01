import { Form, LoaderFunction } from 'remix';
import { Button } from '~/components/Elements';
import {
  InputField,
  TextareaField,
} from '~/components/Form';
import { requireUserId } from '~/features/auth';

export const loader: LoaderFunction = async ({
  request,
}) => {
  await requireUserId(request);
  return null;
};

export default function UsernameEditRoute() {
  return (
    <div className="px-6 max-w-2xl m-auto">
      <Form method="post" className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl py-4 text-violet-700">
          Edit your profile
        </h1>
        <InputField
          htmlFor="username"
          type="text"
          name="username"
          required
          minLength={5}
          maxLength={12}
        >
          Username
        </InputField>
        <TextareaField
          htmlFor="bio"
          minLength={50}
          maxLength={300}
          name="bio"
        >
          Bio
        </TextareaField>
        <Button
          className="border-2 border-violet-700"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
