import { Link, LoaderFunction, useLoaderData } from 'remix';

export const loader: LoaderFunction = async () => {
  return [
    {
      id: 1,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reiciendis culpa facere eaque sint doloremque id sequi ipsum aperiam recusandae magnam quaerat, minus asperiores reprehenderit dolorum itaque. Excepturi, corporis.',
      title: 'sometitle',
    },
    {
      id: 4,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reiciendis culpa facere eaque sint doloremque id sequi ipsum aperiam recusandae magnam quaerat, minus asperiores reprehenderit dolorum itaque. Excepturi, corporis.',
      title: 'sometitle_2',
    },
    {
      id: 5,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reiciendis culpa facere eaque sint doloremque id sequi ipsum aperiam recusandae magnam quaerat, minus asperiores reprehenderit dolorum itaque. Excepturi, corporis.',
      title: 'sometitle_2',
    },
  ];
};

export default function IndexRoute() {
  const data = useLoaderData();

  return (
    <div className="flex flex-col gap-4rounded-md px-4 py-8">
      {data.map((post: any) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <article className="rounded-md px-4 py-4">
            <h1 className="text-gray-600 font-bold text-3xl py-4">
              {post.title}
            </h1>
            <p className="text-gray-200">{post.content}</p>
          </article>
        </Link>
      ))}
    </div>
  );
}
