import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link, useLocation } from 'remix';
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
  canModify: boolean;
  postId: string;
  onDelete: () => void;
};

export function PostDropdown({
  canModify,
  postId,
  onDelete,
}: PostDropdownProps) {
  const location = useLocation();
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
        <Link
          to={`/posts/${postId}`}
          className="min-w-200 w-full items-center text-sm"
        >
          <DropdownItem className="flex justify-between px-2 py-1">
            <span>Read more</span>
            <ArrowRightIcon
              aria-hidden="true"
              className="w-5 h-5"
            />
          </DropdownItem>
        </Link>

        {canModify ? (
          <Link
            to={`/posts/${postId}/edit`}
            className="min-w-200 w-full items-center text-sm"
          >
            <DropdownItem className="flex justify-between px-2 py-1">
              <span>Edit</span>
              <ArrowRightIcon
                aria-hidden="true"
                className="w-5 h-5"
              />
            </DropdownItem>
          </Link>
        ) : null}
        {canModify &&
        location.pathname === `/posts/${postId}` ? (
          <button type="button" onClick={onDelete}>
            <DropdownItem className="hover:bg-error focus:bg-error">
              <div className="px-2 py-1 min-w-200 w-full flex justify-between items-center text-sm">
                <span>Delete</span>
                <DeleteIcon
                  aria-hidden="true"
                  className="w-5 h-5"
                />
              </div>
            </DropdownItem>
          </button>
        ) : null}
        <DropdownMenu.Arrow className="fill-black-default" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
