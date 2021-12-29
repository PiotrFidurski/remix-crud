import { Post } from '~/features/posts/components/Post';

export default function PostRoute() {
  return (
    <div className="flex flex-col gap-4 w-full bg-black-default rounded-md px-4 py-8">
      <Post
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
