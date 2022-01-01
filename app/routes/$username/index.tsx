import { LoaderFunction, useLoaderData } from 'remix';
import { getUser } from '~/features/auth/utils/getUser';
import { PostComponent } from '~/features/posts/components/PostComponent';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({
  params,
  request,
}) => {
  const { username } = params;

  const user = await getUser(request);

  const posts = await db.post.findMany({
    include: { author: true },
    where: {
      author: { username },
    },
  });
  return {
    posts,
    user,
  };
};

export default function UsernameIndexRoute() {
  const data = useLoaderData();

  return (
    <div className="flex flex-col gap-2 px-2 py-2">
      {data.posts.map((post: any) => (
        <PostComponent
          key={post.id}
          post={post}
          user={data.user!}
        />
      ))}
    </div>
  );
}
