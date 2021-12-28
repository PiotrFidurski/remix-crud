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
        <div className="flex items-center py-4">
          <Link to="chimson" className="text-gray-300">
            Chimson
          </Link>
          <span className="px-2 text-slate-600">·</span>
          <p className="text-gray-300 mt-tiny">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <Dropdown />
      </div>
      <div className="flex gap-2">
        <img
          className="object-cover rounded-bl max-w-200 w-full"
          alt="user-avatar"
          src="https://images.unsplash.com/photo-1640389085228-323113fae2cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
        />
        <div className="py-4 px-4">
          <Link to={`/posts/${post.id}`}>
            <h1 className="text-violet-300 font-bold text-xl pb-2">
              {post.title}
            </h1>
          </Link>
          <p className="text-gray-300">{post.content}</p>
        </div>
      </div>
    </article>
  );
}
