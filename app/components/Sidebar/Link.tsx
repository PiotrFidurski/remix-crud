import clsx from 'clsx';
import { NavLink, NavLinkProps } from 'remix';

export type LinkProps =
  React.LinkHTMLAttributes<HTMLLinkElement> & NavLinkProps;

export function Link({
  children,
  className,
  ...props
}: LinkProps) {
  return (
    <NavLink
      className={clsx(
        'flex border-2 border-transparent focus-visible:border-2 focus-visible:border-violet-300 focus-visible:outline-none rounded-md',
        className
      )}
      {...props}
    >
      {({ isActive }) => (
        <div
          className={
            isActive
              ? 'bg-white-10 justify-center sm:justify-start flex gap-2 w-full text-violet-300 rounded-md py-2 px-2'
              : 'py-2 px-2 flex justify-center sm:justify-start gap-2 w-full text-gray-300'
          }
        >
          {children}
        </div>
      )}
    </NavLink>
  );
}
