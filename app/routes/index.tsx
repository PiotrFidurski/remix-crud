import { Post, User } from '@prisma/client';
import {
  json,
  Link,
  LoaderFunction,
  useLoaderData,
} from 'remix';
import { SadEmojiIcon } from '~/components/Icons';
import { DisplayResponse } from '~/components/Responses';
import { PostComponent } from '~/features/posts';
import { db } from '~/utils/db.server';

type LoaderData = {
  posts: Array<Post & { author: User }>;
};

export const loader: LoaderFunction = async () => {
  const posts = await db.post.findMany({
    include: { author: true },
  });

  if (!posts.length) {
    throw json('There are no posts yet.', {
      status: 200,
    });
  }

  const data: LoaderData = {
    posts,
  };

  return data;
};

export default function IndexRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col gap-4 rounded-md">
      {data.posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}

export function CatchBoundary() {
  return (
    <DisplayResponse
      icon={<SadEmojiIcon className="w-16 h-16" />}
    >
      <div>
        Be first to create post{' '}
        <Link
          to="/posts/new"
          className="underline underline-offset-2 "
        >
          here
        </Link>
      </div>
    </DisplayResponse>
  );
}
