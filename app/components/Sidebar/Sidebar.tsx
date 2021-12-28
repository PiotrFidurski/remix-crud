import * as React from 'react';
import { Button, ListItem } from '../Elements';
import {
  ArrowLeftIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  ProfileIcon,
  SettingsIcon,
} from '../Icons';
import Dropdown from './Dropdown';
import { Link } from './Link';

export function Sidebar() {
  const [expanded, setExpanded] = React.useState(false);

  const handleToggleMenu = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-black-default flex lg:hidden border-b lg:border-b-0 border-white-10 text-gray-300 justify-between items-center py-2 px-4">
        <div className="flex items-center">
          <Button
            className="flex mr-2"
            aria-controls="menu"
            aria-label={
              expanded ? 'close menu' : 'open menu'
            }
            aria-expanded={expanded}
            onClick={handleToggleMenu}
          >
            <img
              className="w-10 h-10 object-cover rounded-full"
              alt="user-avatar"
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=100"
            />
          </Button>
          <span className="text-gray-300">Chimson</span>
        </div>
      </div>
      <nav
        aria-label="menu"
        id="menu"
        className={
          expanded
            ? 'translate-y-0 visible ease-in-out duration-200 bg-black-default min-h-auto max-w-full max-h-screen rounded-none lg:rounded-lg w-full fixed top-0 left-0 right-0 lg:relative px-4 py-8'
            : 'translate-y-minus100 ease-in-out duration-200 lg:translate-y-0 lg:visible invisible bg-black-default min-h-auto max-w-full max-h-screen rounded-lg w-full px-4 py-8 fixed top-0 left-0 right-0 lg:relative'
        }
      >
        <div className="lg:hidden flex rounded-t-lg text-gray-300 absolute top-0 border-b border-white-10 left-0 right-0 py-2 px-4">
          <Button
            onClick={handleToggleMenu}
            aria-controls="menu"
            aria-label={
              expanded ? 'close menu' : 'open menu'
            }
            aria-expanded={expanded}
          >
            <ArrowLeftIcon />
          </Button>
        </div>
        <ul className="flex flex-col gap-2 mb-0 mt-12 lg:mt-0 lg:mb-12 w-full">
          <ListItem>
            <Link to=".">
              <HomeIcon aria-hidden="true" />
              <span className="mt-tiny">Home</span>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="chimson">
              <ProfileIcon aria-hidden="true" />
              <span className="mt-tiny">Profile</span>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="new">
              <PlusIcon aria-hidden="true" />
              <span className="mt-tiny">New Post</span>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="somwhere">
              <SettingsIcon aria-hidden="true" />
              <span className="mt-tiny">Display</span>
            </Link>
          </ListItem>
          <ListItem className="lg:hidden block">
            <Link to="settings">
              <SettingsIcon aria-hidden="true" />
              <span className="mt-tiny">Settings</span>
            </Link>
          </ListItem>
          <ListItem className="lg:hidden block hover:bg-error">
            <Link
              to="nowhere"
              className="focus-visible:border-error"
              activeClass="bg-error"
            >
              <LogoutIcon aria-hidden="true" />
              <span className="mt-tiny">Logout</span>
            </Link>
          </ListItem>
        </ul>
        <div className="hidden lg:flex lg:border-t border-b lg:border-b-0 border-white-10 text-gray-300 justify-between items-center rounded-b-lg absolute top-0 lg:bottom-0 lg:top-auto left-0 right-0 py-2 px-4">
          <div className="flex items-center">
            <div className="flex mr-2">
              <img
                className="w-10 h-10 object-cover rounded-full"
                alt="user-avatar"
                src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=100"
              />
            </div>
            <span className="text-gray-300">Chimson</span>
          </div>
          <Dropdown />
        </div>
      </nav>
    </>
  );
}
