import {
  DropdownMenuItemProps,
  Item,
} from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

type ItemProps = DropdownMenuItemProps &
  React.RefAttributes<HTMLDivElement>;

export function DropdownItem({
  children,
  className,
  ...props
}: ItemProps) {
  return (
    <Item
      className={clsx(
        'hover:cursor-pointer hover:bg-violet-700 focus:outline-none focus:bg-violet-700 rounded-md text-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </Item>
  );
}
