import { Post, User } from '@prisma/client';
import { json, LoaderFunction, useLoaderData } from 'remix';
import {
  HappyEmojiIcon,
  SadEmojiIcon,
} from '~/components/Icons';
import { DisplayResponse } from '~/components/Responses';
import { PostComponent } from '~/features/posts';
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

  if (!posts.length) {
    throw json('This user has no posts yet.', {
      status: 200,
    });
  }

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

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex flex-col justify-center min-h-screen max-w-lg m-auto gap-4 w-full bg-black-default rounded-md px-4 py-8">
      <div className="flex flex-col items-center text-red-400">
        <SadEmojiIcon className="w-16 h-16" />
        <h1>something went very wrong</h1>
      </div>
      <details>
        <summary>Error details</summary>
        <code className="text-red-400">
          {JSON.stringify(error.stack, null, 2)}
        </code>
      </details>
    </div>
  );
}

export function CatchBoundary() {
  return (
    <DisplayResponse
      icon={<HappyEmojiIcon className="w-16 h-16" />}
    />
  );
}
