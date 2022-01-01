import { Post, User } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { getUser } from '~/features/auth/utils/getUser';
import { PostComponent } from '~/features/posts/components/PostComponent';
import { db } from '~/utils/db.server';

type LoaderData = {
  user: User | null;
  post: (Post & { author: User }) | null;
};

export const loader: LoaderFunction = async ({
  request,
  params,
}) => {
  const { postId } = params;

  const user = await getUser(request);

  const post = await db.post.findFirst({
    where: { id: postId },
    include: { author: true },
  });

  const data: LoaderData = {
    user,
    post,
  };

  return data;
};

export default function PostRoute() {
  const { post, user } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col gap-4 w-full bg-black-default rounded-md px-4 py-8">
      <PostComponent user={user} post={post!} />
    </div>
  );
}
