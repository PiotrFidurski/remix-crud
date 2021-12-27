import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button, ListItem } from '../Elements';
import {
  DotsHorizontalIcon,
  HamburgerIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  ProfileIcon,
  SettingsIcon,
} from '../Icons';
import { Link } from './Link';

export function Sidebar() {
  return (
    <nav className="min-h-900 max-w-76 lg:max-w-full max-h-screen rounded-lg bg-gray-dark w-full px-4 py-8 relative">
      <div className="flex justify-center sm:justify-start rounded-t-lg text-gray-300 absolute top-0 border-b border-white-10 left-0 right-0 py-2 px-4">
        <Button>
          <HamburgerIcon />
        </Button>
      </div>
      <ul className="flex flex-col gap-2 mt-12 max-w-lg w-full">
        <ListItem>
          <Link to=".">
            <HomeIcon />
            <span className="mt-tiny lg:block hidden">
              Home
            </span>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="chimson">
            <ProfileIcon />
            <span className="mt-tiny lg:block hidden">
              Profile
            </span>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="new">
            <PlusIcon />
            <span className="mt-tiny lg:block hidden">
              New Post
            </span>
          </Link>
        </ListItem>
      </ul>
      <div className="flex border-t border-white-10 text-gray-300 justify-center sm:justify-between items-center rounded-b-lg absolute bottom-0 left-0 right-0 py-2 px-4">
        <div className="items-center lg:flex hidden">
          <div className="flex mr-2">
            <img
              className="w-10 h-10 object-cover rounded-full"
              alt="user-avatar"
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=100"
            />
          </div>
          <span className="text-gray-300">Chimson</span>
        </div>
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger asChild>
            <Button>
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            loop
            className="w-full flex flex-col gap-1 items-start drop-shadow-light bg-black-default text-white rounded-md px-2 py-4"
          >
            <DropdownMenu.Label className="text-slate-700 text-xs px-2">
              <span>Options</span>
            </DropdownMenu.Label>
            <DropdownMenu.Item className="hover:cursor-pointer hover:bg-violet-700 focus:outline-none focus:bg-violet-700 rounded-md text-gray-300">
              <div className="py-1 px-2 min-w-200 w-full flex justify-between items-center text-sm">
                <span>Profile</span>
                <ProfileIcon className="w-5 h-5" />
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="hover:cursor-pointer hover:bg-violet-700 focus:outline-none focus:bg-violet-700 rounded-md text-gray-300">
              <div className="py-1 px-2 min-w-200 w-full flex justify-between items-center text-sm">
                <span>Settings</span>
                <SettingsIcon className="w-5 h-5" />
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="bg-white w-full h-px my-2 bg-white-10" />
            <DropdownMenu.Item className="focus:outline-none hover:bg-violet-700 focus:bg-violet-700 hover:cursor-pointer rounded-md text-gray-300">
              <div className="px-2 py-1 min-w-200 w-full flex justify-between items-center text-sm">
                <span>Logout</span>
                <LogoutIcon className="w-5 h-5" />
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className="fill-black-default" />
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
}
