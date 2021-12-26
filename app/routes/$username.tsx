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
    <div className="bg-gray-900 py-10 px-4 rounded-md w-full">
      <h1 className="text-gray-600 font-bold text-3xl py-4">
        {username}
      </h1>
      <div className="w-full flex justify-between gap-4 pb-4">
        <Link to="./" className="flex-1">
          <div className="bg-gray-default rounded-md px-4 py-4 font-bold">
            Posts
          </div>
        </Link>
        <Link to="edit" className="flex-1">
          <div className="bg-gray-default rounded-md px-4 py-4 font-bold">
            Edit
          </div>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
