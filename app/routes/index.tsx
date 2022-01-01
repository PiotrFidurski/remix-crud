import { Post, User } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { getUser } from '~/features/auth/utils/getUser';
import { PostComponent } from '~/features/posts/components/PostComponent';
import { db } from '~/utils/db.server';

type LoaderData = {
  posts: Array<Post & { author: User }>;
  user: User | null;
};

export const loader: LoaderFunction = async ({
  request,
}) => {
  const user = await getUser(request);

  const posts = await db.post.findMany({
    include: { author: true },
  });

  const data: LoaderData = {
    posts,
    user,
  };

  return data;
};

export default function IndexRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col gap-4 rounded-md">
      {data.posts.map((post) => (
        <PostComponent
          key={post.id}
          post={post}
          user={data.user}
        />
      ))}
    </div>
  );
}
