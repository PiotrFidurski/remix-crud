import { LoaderFunction, useLoaderData } from 'remix';
import { getUser } from '~/features/auth/utils/getUser';
import { Post } from '~/features/posts/components/Post';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({
  request,
}) => {
  const user = await getUser(request);
  const posts = await db.post.findMany();
  return {
    posts,
    user,
  };
};

export default function IndexRoute() {
  const data = useLoaderData();

  return (
    <div className="flex flex-col gap-4 rounded-md">
      {data.posts.map((post: any) => (
        <Post key={post.id} post={post} user={data.user} />
      ))}
    </div>
  );
}
