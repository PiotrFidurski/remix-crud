import {
  DropdownMenuItemProps,
  Item,
} from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import * as React from 'react';

type ItemProps = DropdownMenuItemProps &
  React.RefAttributes<HTMLDivElement>;

export const DropdownItem = React.forwardRef<
  HTMLDivElement,
  ItemProps
>(({ children, className, ...props }, ref) => {
  return (
    <Item
      ref={ref}
      className={clsx(
        'hover:cursor-pointer w-full hover:bg-violet-700 focus:outline-none focus:bg-violet-700 rounded-md text-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </Item>
  );
});
