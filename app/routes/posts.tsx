import { Link, LoaderFunction, useLoaderData } from 'remix';

export const loader: LoaderFunction = async () => {
  return [
    { id: 1, content: 'hello', title: 'sometitle' },
    { id: 4, content: 'asdasd', title: 'sometitle_2' },
  ];
};

export default function PostsRoute() {
  const data = useLoaderData();

  return (
    <div>
      {data.map((post: any) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          {post.title}
        </Link>
      ))}
    </div>
  );
}
