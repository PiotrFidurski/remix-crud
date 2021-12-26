import {
  Link,
  LoaderFunction,
  Outlet,
  useLoaderData,
} from 'remix';

export const loader: LoaderFunction = async ({
  params,
}) => {
  return params.username;
};

export default function UsernameRoute() {
  const username = useLoaderData();
  return (
    <div>
      <h1>{username}</h1>
      <Link to="edit">edit</Link>
      <Link to=".">posts</Link>
      <Outlet />
    </div>
  );
}
