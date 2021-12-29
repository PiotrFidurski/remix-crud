import { format } from 'date-fns';
import {
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'remix';
import { Button } from '~/components/Elements';

export default function UsernameRoute() {
  const location = useLocation();

  const params = useParams();

  return (
    <div className="bg-black-default py-10 text-gray-300 rounded-md w-full">
      <div className="flex items-start flex-col lg:flex-row gap-4 border-b border-white-10 mb-2 px-4 py-6">
        <div className="flex min-w-180 border-r border-white-10">
          <img
            className="w-40 h-40 object-cover rounded-full border-4 border-violet-700"
            alt="user-avatar"
            src="/images/avatar.png"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-4xl py-2">
            {params.username}
          </h1>
          <div className="flex gap-1 items-center">
            <span>Joined</span>
            <span>{format(new Date(), 'MMM-dd-yyyy')}</span>
          </div>
          <hr className="border-white-10 my-4" />
          <p>
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Recusandae vero alias
            laudantium nobis, sapiente et, nihil quod fugit
            voluptatum incidunt temporibus maxime vel
            ratione, error voluptas sunt. Delectus, quasi
            dolorem?
          </p>
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
                  location.pathname ===
                    `/${params.username}`
                    ? 'text-violet-700 px-2 py-2 w-full'
                    : 'text-gray-300 px-2 py-2 w-full'
                }
              >
                Posts
              </span>
            )}
          </NavLink>
        </Button>
        <Button
          className="flex-1 rounded-none px-0 py-0 border-2 border-violet-700"
          tabIndex={-1}
        >
          <NavLink to="edit" className="w-full flex">
            {({ isActive }) => (
              <span
                className={
                  isActive
                    ? 'text-violet-700 px-2 py-2 w-full'
                    : 'text-gray-300 px-2 py-2 w-full'
                }
              >
                Edit
              </span>
            )}
          </NavLink>
        </Button>
      </div>
      <Outlet />
    </div>
  );
}
