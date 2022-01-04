import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useTransition,
} from 'remix';
import * as z from 'zod';
import { requireUserId, useUser } from '~/features/auth';
import {
  ActionData,
  CreatePost,
  PostComponent,
} from '~/features/posts';
import { composeOptimisticPost } from '~/features/posts/utils/composeOptimisticPost';
import { badRequest } from '~/utils/badRequest';
import { db } from '~/utils/db.server';

export const schema = z.object({
  title: z
    .string({ invalid_type_error: 'title is required.' })
    .min(5, 'title should be at least 5 characters.')
    .max(30, 'title should have maximum of 30 characters'),

  content: z
    .string({
      invalid_type_error: 'content is required.',
    })
    .min(50, 'content should be at least 50 characters')
    .max(
      300,
      'content should have maximum of 300 characters'
    ),
});

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

    schema.parse({ title, content });

    const post = await db.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return redirect(`/posts/${post.id}`);
  } catch (error) {
    const errors = (error as z.ZodError).flatten();

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

  const user = useUser();

  const { submission } = useTransition();

  if (!actionData?.fieldErrors && submission) {
    const post = composeOptimisticPost({
      submission,
      user,
    });

    return (
      <div className="flex flex-col gap-4 w-full bg-black-default rounded-md px-4 py-8">
        <PostComponent post={post} />
      </div>
    );
  }

  return (
    <div className="bg-black-default p-2 text-gray-300 min-h-screen flex justify-center">
      <CreatePost />
    </div>
  );
}
