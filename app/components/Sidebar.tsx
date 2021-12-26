import { NavLink } from 'remix';

export default function Sidebar() {
  return (
    <nav className="bg-gray-900 min-h-900 max-h-screen rounded-md max-w-xs w-full px-4 py-8">
      <ul className="flex flex-col gap-2 max-w-lg w-full">
        <li className="hover:bg-gray-700 rounded-md">
          <NavLink to=".">
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? 'bg-gray-700 text-gray-100 rounded-md py-2 px-2'
                    : 'py-2 px-2 text-gray-300'
                }
              >
                <span>Home</span>
              </div>
            )}
          </NavLink>
        </li>
        <li className="hover:bg-gray-700 rounded-md">
          <NavLink to="chimson">
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? 'bg-gray-700 text-gray-100 rounded-md py-2 px-2'
                    : 'py-2 px-2 text-gray-300'
                }
              >
                <span>Profile</span>
              </div>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
