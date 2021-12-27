import { useParams } from 'remix';

export default function PostRoute() {
  const params = useParams();
  return (
    <div className="flex flex-col gap-4 w-full bg-gray-900 rounded-md px-4 py-8">
      <article className="rounded-md px-4 py-4">
        <h1 className="text-gray-600 font-bold text-3xl py-4">
          {params.postId}
        </h1>
      </article>
    </div>
  );
}
