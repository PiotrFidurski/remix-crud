import { LoaderFunction, useLoaderData } from 'remix';
import { getUser } from '~/features/auth/utils/getUser';
import { Post } from '~/features/posts/components/Post';

export const loader: LoaderFunction = async ({
  request,
}) => {
  const user = await getUser(request);
  return { user };
};

export default function PostRoute() {
  const data = useLoaderData();

  return (
    <div className="flex flex-col gap-4 w-full bg-black-default rounded-md px-4 py-8">
      <Post
        user={data.user}
        post={{
          id: 1,
          createdAt: new Date(),
          title: 'christmas dog',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reiciendis culpa facere eaque sint doloremque id sequi ipsum aperiam recusandae magnam quaerat, minus asperiores reprehenderit dolorum itaque. Excepturi, corporis.',
        }}
      />
    </div>
  );
}
