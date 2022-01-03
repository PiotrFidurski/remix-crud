import { Post, User } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { PostComponent } from '~/features/posts';
import { db } from '~/utils/db.server';

type LoaderData = {
  posts: Array<Post & { author: User }>;
};

export const loader: LoaderFunction = async () => {
  const posts = await db.post.findMany({
    include: { author: true },
  });

  const data: LoaderData = {
    posts,
  };

  return data;
};

export default function IndexRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col gap-4 rounded-md">
      {!data.posts.length ? (
        <div className="flex justify-center text-gray-300 min-h-screen bg-black-default px-2 py-5">
          <h1 className="text-3xl">
            There are no posts yet.
          </h1>
        </div>
      ) : (
        data.posts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))
      )}
    </div>
  );
}
