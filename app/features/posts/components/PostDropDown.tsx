import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  Button,
  DropdownItem,
} from '~/components/Elements';
import {
  ArrowRightIcon,
  DeleteIcon,
  DotsHorizontalIcon,
} from '~/components/Icons';

type PostDropdownProps = {
  canDelete: boolean;
};

export function PostDropdown({
  canDelete,
}: PostDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          className="border-transparent"
          aria-label="open menu"
        >
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
        <DropdownMenu.Separator className="bg-white w-full h-px my-2 bg-white-10" />
        <DropdownItem>
          <div className="px-2 py-1 min-w-200 w-full flex justify-between items-center text-sm">
            <span>Read more</span>
            <ArrowRightIcon
              aria-hidden="true"
              className="w-5 h-5"
            />
          </div>
        </DropdownItem>
        {canDelete ? (
          <DropdownItem>
            <div className="px-2 py-1 min-w-200 w-full flex justify-between items-center text-sm">
              <span>Edit</span>
              <ArrowRightIcon
                aria-hidden="true"
                className="w-5 h-5"
              />
            </div>
          </DropdownItem>
        ) : null}
        {canDelete ? (
          <DropdownItem className="hover:bg-error focus:bg-error">
            <div className="px-2 py-1 min-w-200 w-full flex justify-between items-center text-sm">
              <span>Delete</span>
              <DeleteIcon
                aria-hidden="true"
                className="w-5 h-5"
              />
            </div>
          </DropdownItem>
        ) : null}
        <DropdownMenu.Arrow className="fill-black-default" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
