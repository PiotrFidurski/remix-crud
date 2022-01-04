import { User } from '@prisma/client';
import { format } from 'date-fns';
import {
  json,
  LoaderFunction,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
} from 'remix';
import { Button } from '~/components/Elements';
import { DisplayResponse } from '~/components/Responses';
import { useUser } from '~/features/auth';
import { db } from '~/utils/db.server';

type LoaderData = {
  user: User | null;
};

export const loader: LoaderFunction = async ({
  params,
}) => {
  const { username } = params;

  const user = await db.user.findFirst({
    where: { username },
  });

  if (!user) {
    throw json(
      `User with username ${username} doesn't exist`,
      { status: 404 }
    );
  }

  const data: LoaderData = {
    user,
  };

  return data;
};

export default function UsernameRoute() {
  const location = useLocation();

  const authUser = useUser();

  const { user } = useLoaderData<LoaderData>();

  return (
    <div className="bg-black-default py-10 text-gray-300 rounded-md w-full">
      <div className="flex items-start flex-col lg:flex-row gap-4 border-b border-white-10 mb-2 px-4 py-6">
        <div className="flex min-w-[180px] border-r border-white-10">
          <img
            className="w-40 h-40 object-cover rounded-full border-4 border-violet-700"
            alt="user-avatar"
            src="/images/avatar.png"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-4xl py-2">
            {user?.username}
          </h1>
          <div className="flex gap-1 items-center">
            <span>Joined</span>
            <span>
              {format(
                new Date(user?.createdAt!),
                'MMM-dd-yyyy'
              )}
            </span>
          </div>
          <hr className="border-white-10 my-4" />
          <p className="break-all">{user?.bio}</p>
        </div>
      </div>
      <div className="w-full flex justify-between gap-1 pb-2 px-4 border-b border-white-10">
        <Button
          className="flex-1 rounded-none px-0 py-0 border-2 border-violet-700"
          tabIndex={-1}
        >
          <NavLink to="." className="w-full flex">
            {({ isActive }) => (
              <span
                className={
                  isActive &&
                  location.pathname === `/${user?.username}`
                    ? 'text-violet-500 px-2 py-2 w-full'
                    : 'text-gray-300 px-2 py-2 w-full'
                }
              >
                Posts
              </span>
            )}
          </NavLink>
        </Button>
        {authUser?.id === user?.id ? (
          <Button
            className="flex-1 rounded-none px-0 py-0 border-2 border-violet-700"
            tabIndex={-1}
          >
            <NavLink to="edit" className="w-full flex">
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? 'text-violet-500 px-2 py-2 w-full'
                      : 'text-gray-300 px-2 py-2 w-full'
                  }
                >
                  Edit
                </span>
              )}
            </NavLink>
          </Button>
        ) : null}
      </div>
      <Outlet />
    </div>
  );
}

export function CatchBoundary() {
  return <DisplayResponse />;
}
