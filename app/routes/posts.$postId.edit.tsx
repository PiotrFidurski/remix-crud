import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useTransition,
} from 'remix';
import { ZodError } from 'zod';
import { requireUserId, useUser } from '~/features/auth';
import { EditPost, PostComponent } from '~/features/posts';
import {
  ActionData,
  LoaderData,
} from '~/features/posts/types';
import { composeOptimisticPost } from '~/features/posts/utils/composeOptimisticPost';
import { badRequest } from '~/utils/badRequest';
import { db } from '~/utils/db.server';
import { schema } from './posts.new';

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

    if (!post) {
      throw json('Cant find this post anymore', {
        status: 404,
      });
    }

    if (post?.authorId !== userId) {
      throw json('You are not the owner of the post', {
        status: 401,
      });
    }

    schema.parse({ title, content });

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
  const user = useUser();

  const actionData = useActionData<ActionData>();

  const { submission } = useTransition();

  if (!actionData?.fieldErrors! && submission) {
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
      <EditPost />
    </div>
  );
}
