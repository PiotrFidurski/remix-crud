import {
  ActionFunction,
  Form,
  LoaderFunction,
} from 'remix';
import { Button } from '~/components/Elements';
import {
  InputField,
  TextareaField,
} from '~/components/Form';
import { requireUserId } from '~/features/auth/utils/getUser';

export const loader: LoaderFunction = async ({
  request,
}) => {
  await requireUserId(request);
  return null;
};

export const action: ActionFunction = async ({
  request,
}) => {
  await requireUserId(request);
  return null;
};

export default function NewPostRoute() {
  return (
    <div className="bg-black-default p-2 text-gray-300 min-h-screen flex justify-center">
      <Form
        method="post"
        className="flex px-2 flex-col max-w-2xl w-full m-auto"
      >
        <h1 className="font-bold text-4xl py-4 text-violet-700">
          Create new post
        </h1>
        <InputField
          htmlFor="title"
          type="text"
          name="title"
          required
          minLength={5}
          maxLength={30}
        >
          Title
        </InputField>
        <TextareaField
          name="content"
          htmlFor="content"
          required
          minLength={50}
          maxLength={300}
        >
          Content
        </TextareaField>
        <div className="mt-4 flex justify-end">
          <Button
            type="submit"
            className="border-2 border-violet-700 px-6"
          >
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}
