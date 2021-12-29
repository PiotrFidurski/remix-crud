import clsx from 'clsx';
import * as React from 'react';

export type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      className={clsx(
        'rounded-full text-gray-300 bg-transparent py-2 px-2 hover:bg-white-10 border-2 focus-visible:border-2 focus-visible:border-violet-700 focus-visible:outline-none focus-visible:bg-white-10',
        className
      )}
      {...props}
    >
      <span className="flex w-full justify-center">
        {children}
      </span>
    </button>
  );
});

Button.displayName = 'Button';
