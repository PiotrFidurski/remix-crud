import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Form } from 'remix';
import { Button, DropdownItem } from '../Elements';
import {
  DotsHorizontalIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
} from '../Icons';

export default function Dropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          type="button"
          className="rounded-full border-transparent"
          aria-label="open dropdown"
        >
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        loop
        className="w-full min-w-[200px] flex flex-col gap-1 items-start drop-shadow-light bg-black-default text-white rounded-md px-2 py-4"
      >
        <DropdownMenu.Label className="text-slate-700 text-xs px-2">
          <span>Options</span>
        </DropdownMenu.Label>
        <DropdownItem>
          <div className="py-1 px-2 flex justify-between items-center text-sm">
            <span>Profile</span>
            <ProfileIcon
              aria-hidden="true"
              className="w-5 h-5"
            />
          </div>
        </DropdownItem>
        <DropdownItem>
          <div className="py-1 px-2 flex justify-between items-center text-sm">
            <span>Settings</span>
            <SettingsIcon
              aria-hidden="true"
              className="w-5 h-5"
            />
          </div>
        </DropdownItem>
        <DropdownMenu.Separator className="bg-white w-full h-px my-2 bg-white-10" />
        <Form
          action="/logout"
          method="post"
          className="w-full"
        >
          <button className="w-full" type="submit">
            <DropdownItem
              onSelect={(e) => e.preventDefault()}
              className="hover:bg-error focus:bg-error"
            >
              <div className="px-2 py-1 flex justify-between items-center text-sm">
                <span>Logout</span>
                <LogoutIcon
                  aria-hidden="true"
                  className="w-5 h-5"
                />
              </div>
            </DropdownItem>
          </button>
        </Form>
        <DropdownMenu.Arrow className="fill-black-default" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
