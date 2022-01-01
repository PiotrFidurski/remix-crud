import { Post, User } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { PostComponent } from '~/features/posts/components/PostComponent';
import { db } from '~/utils/db.server';

type LoaderData = {
  posts: Array<Post & { author: User }>;
};

export const loader: LoaderFunction = async ({
  params,
}) => {
  const { username } = params;

  const posts = await db.post.findMany({
    include: { author: true },
    where: {
      author: { username },
    },
  });

  const data: LoaderData = {
    posts,
  };

  return data;
};

export default function UsernameIndexRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col gap-2 px-2 py-2">
      {data.posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}
