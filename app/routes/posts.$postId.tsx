import { useParams } from 'remix';

export default function PostRoute() {
  const params = useParams();
  return (
    <div>{JSON.stringify(params.postId, null, 2)}</div>
  );
}
