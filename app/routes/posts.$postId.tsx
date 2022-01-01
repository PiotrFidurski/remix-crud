import { LoaderFunction, useLoaderData } from 'remix';
import { getUser } from '~/features/auth/utils/getUser';
import { Post } from '~/features/posts/components/Post';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({
  request,
  params,
}) => {
  const { postId } = params;
  const user = await getUser(request);
  const post = await db.post.findFirst({
    where: { id: postId },
  });
  return { user, post };
};

export default function PostRoute() {
  const data = useLoaderData();

  return (
    <div className="flex flex-col gap-4 w-full bg-black-default rounded-md px-4 py-8">
      <Post user={data.user} post={data.post} />
    </div>
  );
}
