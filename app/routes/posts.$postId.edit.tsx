import { Post } from '@prisma/client';
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
import { ZodError } from 'zod';
import { Button } from '~/components/Elements';
import {
  InputField,
  TextareaField,
} from '~/components/Form';
import { requireUserId, useUser } from '~/features/auth';
import { PostComponent } from '~/features/posts';
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

type LoaderData = {
  post: Post;
};

export const loader: LoaderFunction = async ({
  request,
  params,
}) => {
  const { postId } = params;

  const userId = await requireUserId(request);

  const post = await db.post.findFirst({
    where: { id: postId },
  });

  if (post?.authorId !== userId) {
    return redirect('/');
  }

  const data: LoaderData = {
    post,
  };

  return data;
};

export const action: ActionFunction = async ({
  params,
  request,
}) => {
  const form = await request.formData();
  const title = form.get('title') as string;
  const content = form.get('content') as string;

  try {
    const { postId } = params;

    const userId = await requireUserId(request);

    const post = await db.post.findFirst({
      where: { id: postId },
    });

    if (post?.authorId !== userId) {
      throw json('You are not the owner of the post', {
        status: 401,
      });
    }

    createPostSchema.parse({ title, content });

    const updatedPost = await db.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        createdAt: new Date(Date.now()),
      },
    });

    return redirect(`/posts/${updatedPost.id}`);
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

export default function EditPostRoute() {
  const actionData = useActionData<ActionData>();

  const data = useLoaderData<LoaderData>();

  const user = useUser();

  const { submission } = useTransition();

  if (!actionData?.fieldErrors && submission) {
    const title = submission.formData.get(
      'title'
    ) as string;
    const content = submission.formData.get(
      'content'
    ) as string;

    const post = {
      id: '',
      content,
      title,
      author: user,
      authorId: user.id,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    };

    return (
      <div className="flex flex-col gap-4 w-full bg-black-default rounded-md px-4 py-8">
        <PostComponent post={post} />
      </div>
    );
  }

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
          Edit your post
        </h1>
        <InputField
          errorMessage={actionData?.fieldErrors?.title}
          htmlFor="title"
          type="text"
          name="title"
          defaultValue={data.post.title}
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
          defaultValue={data.post.content}
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
            Edit
          </Button>
        </div>
      </Form>
    </div>
  );
}
