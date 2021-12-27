import clsx from 'clsx';

export type ListItemProps =
  React.LiHTMLAttributes<HTMLLIElement>;

export function ListItem({
  children,
  className,
  ...props
}: ListItemProps) {
  return (
    <li
      className={clsx(
        'hover:bg-white-10 rounded-md',
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
}
