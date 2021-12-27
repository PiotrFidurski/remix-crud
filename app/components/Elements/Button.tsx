import cslx from 'clsx';

export type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cslx(
        'rounded-full bg-transparent py-2 px-2 hover:bg-white-10 border-2 border-transparent focus-visible:border-2 focus-visible:border-violet-300 focus-visible:outline-none focus-visible:bg-white-10',
        className
      )}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
