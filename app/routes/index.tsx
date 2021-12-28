import { LoaderFunction, useLoaderData } from 'remix';
import { Post } from '~/features/posts/components/Post';

export const loader: LoaderFunction = async () => {
  return [
    {
      id: 1,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reiciendis culpa facere eaque sint doloremque id sequi ipsum aperiam recusandae magnam quaerat, minus asperiores reprehenderit dolorum itaque. Excepturi, corporis.',
      title: 'christmas dog',
      createdAt: Date.now(),
    },
    {
      id: 4,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reiciendis culpa facere eaque sint doloremque id sequi ipsum aperiam recusandae magnam quaerat, minus asperiores reprehenderit dolorum itaque. Excepturi, corporis.',
      title: 'my dog here',
      createdAt: Date.now(),
    },
    {
      id: 5,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reiciendis culpa facere eaque sint doloremque id sequi ipsum aperiam recusandae magnam quaerat, minus asperiores reprehenderit dolorum itaque. Excepturi, corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reiciendis culpa facere eaque sint doloremque id sequi ipsum aperiam recusandae magnam quaerat, minus asperiores reprehenderit dolorum itaque. Excepturi, corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reiciendis culpa facere eaque sint doloremque id sequi ipsum aperiam recusandae magnam quaerat, minus asperiores reprehenderit dolorum itaque. Excepturi, corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reiciendis culpa facere eaque sint doloremque id sequi ipsum aperiam recusandae magnam quaerat, minus asperiores reprehenderit dolorum itaque. Excepturi, corporis',
      title: 'new post',
      createdAt: Date.now(),
    },
  ];
};

export default function IndexRoute() {
  const data = useLoaderData();

  return (
    <div className="flex flex-col gap-4 rounded-md px-4">
      {data.map((post: any) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
