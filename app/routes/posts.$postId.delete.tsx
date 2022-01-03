import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from 'remix';
import { requireUserId } from '~/features/auth';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({
  request,
  params,
}) => {
  const { postId } = params;

  const userId = await requireUserId(request);

  const post = await db.post.findFirst({
    where: { id: postId },
  });

  if (post?.authorId !== userId) {
    throw json('Cant find this post anymore.', {
      status: 404,
    });
  }

  if (post?.authorId !== userId) {
    throw json('You cannot perform this action.', {
      status: 401,
    });
  }

  await db.post.delete({
    where: { id: postId },
  });

  return redirect('/');
};

export const loader: LoaderFunction = async () => {
  return redirect('/');
};
