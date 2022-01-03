import { Post, User } from '@prisma/client';
import { json, LoaderFunction, useLoaderData } from 'remix';
import { DisplayResponse } from '~/components/Responses';
import { PostComponent } from '~/features/posts';
import { db } from '~/utils/db.server';

type LoaderData = {
  post: (Post & { author: User }) | null;
};

export const loader: LoaderFunction = async ({
  params,
}) => {
  const { postId } = params;

  const post = await db.post.findFirst({
    where: { id: postId },
    include: { author: true },
  });

  if (!post) {
    throw json(
      "There used to be something here, but it doesn't exist anymore.",
      {
        status: 404,
      }
    );
  }

  const data: LoaderData = {
    post,
  };

  return data;
};

export default function PostRoute() {
  const { post } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col gap-4 w-full bg-black-default rounded-md px-4 py-8">
      <PostComponent post={post!} />
    </div>
  );
}

export function CatchBoundary() {
  return <DisplayResponse />;
}
