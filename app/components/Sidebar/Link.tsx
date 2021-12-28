import clsx from 'clsx';
import { NavLink, NavLinkProps } from 'remix';

export type LinkProps =
  React.LinkHTMLAttributes<HTMLLinkElement> & {
    activeClass?: string;
  } & NavLinkProps;

export function Link({
  children,
  className,
  activeClass,
  ...props
}: LinkProps) {
  return (
    <NavLink
      className={clsx(
        'flex border-2 border-transparent focus-visible:border-2 focus-visible:border-violet-700 focus-visible:outline-none rounded-md',
        className
      )}
      {...props}
    >
      {({ isActive }) => (
        <div
          className={
            isActive
              ? clsx(
                  'bg-violet-700 justify-start flex gap-2 w-full text-gray-300 rounded-md py-2 px-2',
                  activeClass
                )
              : 'py-2 px-2 flex justify-start gap-2 w-full text-gray-300'
          }
        >
          {children}
        </div>
      )}
    </NavLink>
  );
}
