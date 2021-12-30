import { formatDistanceToNow } from 'date-fns';
import { Link } from 'remix';
import Dropdown from './Dropdown';

export type PostProps = {
  post: {
    id: number;
    content: string;
    title: string;
    createdAt: Date;
  };
};

export function Post({ post }: PostProps) {
  return (
    <article
      key={post.id}
      className="rounded-md bg-black-default border border-white-10"
    >
      <div className="flex items-center justify-between border-b border-white-10 px-4">
        <div className="flex items-center py-4 min-w-0">
          <Link to="chimson" className="text-gray-300">
            Chimson
          </Link>
          <span className="px-2 text-slate-600">·</span>
          <p className="text-gray-300 mt-px truncate text-ellipsis overflow-hidden">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <Dropdown />
      </div>
      <div className="flex gap-2">
        <img
          className="object-cover rounded-bl max-w-200 w-full hidden lg:block"
          alt="husky with a santa hat"
          src="/images/xmasdog.png"
        />
        <div className="py-4 px-4 w-auto">
          <h1 className="text-violet-300 font-bold text-xl pb-2">
            <Link to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </h1>
          <p className="text-gray-300">{post.content}</p>
        </div>
      </div>
    </article>
  );
}