import * as React from 'react';
import { Form, useTransition } from 'remix';
import { useUser } from '~/features/auth';
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

  const transition = useTransition();

  const user = useUser();

  const handleToggleMenu = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    /* 
      Whenever transition.state changes and the menu is already opened, we will
      close the menu for mobile users to prevent menu hanging around after user
      performs an action
    */

    if (transition.state === 'loading' && expanded) {
      setExpanded(false);
    }
  }, [transition.state, expanded]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-black-default flex lg:hidden border-b lg:border-b-0 border-white-10 text-gray-300 justify-between items-center py-2 px-4">
        <div className="flex items-center">
          {user ? (
            <>
              <Button
                className="flex mr-2 border-transparent rounded-full"
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
                  src="/images/avatar.png"
                />
              </Button>
              <span className="text-gray-300">
                {user.username}
              </span>
            </>
          ) : (
            <Button
              onClick={handleToggleMenu}
              className="rounded-full border-transparent"
            >
              <ArrowLeftIcon />
            </Button>
          )}
        </div>
      </div>
      <nav
        aria-label="menu"
        id="menu"
        className={
          expanded
            ? 'translate-y-0 min-h-[600px] visible ease-in-out duration-200 bg-black-default min-h-auto max-w-full max-h-screen rounded-none lg:rounded-lg w-full fixed top-0 left-0 right-0 lg:relative px-4 py-8 drop-shadow-light lg:shadow-none'
            : 'translate-y-[-100%] min-h-[600px] ease-in-out duration-200 lg:translate-y-0 lg:visible invisible bg-black-default min-h-auto max-w-full max-h-screen rounded-lg w-full px-4 py-8 fixed top-0 left-0 right-0 lg:relative'
        }
      >
        <div className="lg:hidden flex rounded-t-lg text-gray-300 absolute top-0 border-b border-white-10 left-0 right-0 py-2 px-4">
          <Button
            className="border-transparent rounded-full"
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
            <Link to="." prefetch="intent">
              <HomeIcon aria-hidden="true" />
              <span className="mt-px">Home</span>
            </Link>
          </ListItem>
          {user ? (
            <ListItem>
              <Link to={user.username} prefetch="intent">
                <ProfileIcon aria-hidden="true" />
                <span className="mt-px">Profile</span>
              </Link>
            </ListItem>
          ) : null}
          <ListItem>
            <Link to="posts/new" prefetch="intent">
              <PlusIcon aria-hidden="true" />
              <span className="mt-px">New Post</span>
            </Link>
          </ListItem>
          {!user ? (
            <ListItem>
              <Link to="login">
                <LogoutIcon aria-hidden="true" />
                <span className="mt-px">Login</span>
              </Link>
            </ListItem>
          ) : null}
          {user ? (
            <ListItem className="lg:hidden block">
              <Link to="settings">
                <SettingsIcon aria-hidden="true" />
                <span className="mt-px">Settings</span>
              </Link>
            </ListItem>
          ) : null}
          {user ? (
            <ListItem className="lg:hidden block hover:bg-error">
              <Form
                action="/logout"
                method="post"
                className="flex border-2 border-transparent focus-visible:border-2 focus-visible:border-violet-700 focus-visible:outline-none rounded-md"
              >
                <button
                  type="submit"
                  className="flex justify-start gap-2 px-2 py-2 w-full text-gray-300 rounded-md"
                >
                  <LogoutIcon aria-hidden="true" />
                  <span className="mt-px">Logout</span>
                </button>
              </Form>
            </ListItem>
          ) : null}
        </ul>
        {user ? (
          <div className="hidden lg:flex lg:border-t border-b lg:border-b-0 border-white-10 text-gray-300 justify-between items-center rounded-b-lg absolute top-0 lg:bottom-0 lg:top-auto left-0 right-0 py-2 px-4">
            <div className="flex items-center min-w-0">
              <div className="flex mr-2">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  alt="user-avatar"
                  src="/images/avatar.png"
                />
              </div>
              <span className="truncate text-ellipsis overflow-hidden">
                {user.username}
              </span>
            </div>
            <Dropdown />
          </div>
        ) : null}
      </nav>
    </>
  );
}
