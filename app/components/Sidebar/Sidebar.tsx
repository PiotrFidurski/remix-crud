import * as React from 'react';
import { Form } from 'remix';
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

  const user = useUser();

  const submitBtnRef =
    React.useRef<HTMLButtonElement | null>(null);

  const handleToggleMenu = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    submitBtnRef.current?.click();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-black-default flex lg:hidden border-b lg:border-b-0 border-white-10 text-gray-300 justify-between items-center py-2 px-4">
        <div className="flex items-center">
          {user ? (
            <>
              <Button
                className="flex mr-2 border-transparent"
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
            <Button onClick={handleToggleMenu}>
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
            ? 'translate-y-0 visible ease-in-out duration-200 bg-black-default min-h-auto max-w-full max-h-screen rounded-none lg:rounded-lg w-full fixed top-0 left-0 right-0 lg:relative px-4 py-8'
            : 'translate-y-minus100 min-h-600 ease-in-out duration-200 lg:translate-y-0 lg:visible invisible bg-black-default min-h-auto max-w-full max-h-screen rounded-lg w-full px-4 py-8 fixed top-0 left-0 right-0 lg:relative'
        }
      >
        <div className="lg:hidden flex rounded-t-lg text-gray-300 absolute top-0 border-b border-white-10 left-0 right-0 py-2 px-4">
          <Button
            className="border-transparent"
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
            <div className="flex items-center">
              <div className="flex mr-2">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  alt="user-avatar"
                  src="/images/avatar.png"
                />
              </div>
              <span>{user.username}</span>
            </div>
            <Form method="post" action="/logout">
              <button
                ref={submitBtnRef}
                type="submit"
                aria-label="logout"
                hidden
              />
              <Dropdown onLogout={handleLogout} />
            </Form>
          </div>
        ) : null}
      </nav>
    </>
  );
}
