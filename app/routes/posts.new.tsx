import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
} from 'remix';
import { ZodError } from 'zod';
import { Button } from '~/components/Elements';
import {
  InputField,
  TextareaField,
} from '~/components/Form';
import { requireUserId } from '~/features/auth/utils/getUser';
import { createPostSchema } from '~/features/posts/utils/schemas';
import { badRequest } from '~/utils/badRequest';
import { db } from '~/utils/db.server';

type ActionData = {
  formError?: string;
  fieldErrors?: {
    title: string | undefined;
    content: string | undefined;
  };
};

export const loader: LoaderFunction = async ({
  request,
}) => {
  await requireUserId(request);
  return null;
};

export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  const title = form.get('title') as string;
  const content = form.get('content') as string;
  try {
    const userId = await requireUserId(request);

    createPostSchema.parse({ title, content });

    const post = await db.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return redirect(`/posts/${post.id}`);
  } catch (error) {
    const errors = (error as ZodError).flatten();

    return badRequest({
      fieldErrors: {
        title: errors.fieldErrors.title?.[0],
        content: errors.fieldErrors.content?.[0],
      },
    });
  }
};

export default function NewPostRoute() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="bg-black-default p-2 text-gray-300 min-h-screen flex justify-center">
      <Form
        aria-describedby={
          actionData?.formError
            ? 'form-error-message'
            : undefined
        }
        method="post"
        className="flex px-2 flex-col max-w-2xl w-full m-auto"
      >
        <h1 className="font-bold text-4xl py-4 text-violet-700">
          Create new post
        </h1>
        <InputField
          errorMessage={actionData?.fieldErrors?.title}
          htmlFor="title"
          type="text"
          name="title"
          required
          minLength={5}
          maxLength={30}
          aria-invalid={Boolean(
            actionData?.fieldErrors?.title
          )}
          aria-describedby={
            actionData?.fieldErrors?.title
              ? 'username-error'
              : undefined
          }
        >
          Title
        </InputField>
        <TextareaField
          errorMessage={actionData?.fieldErrors?.content}
          name="content"
          htmlFor="content"
          required
          minLength={50}
          maxLength={300}
          aria-invalid={Boolean(
            actionData?.fieldErrors?.content
          )}
          aria-describedby={
            actionData?.fieldErrors?.content
              ? 'username-error'
              : undefined
          }
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
