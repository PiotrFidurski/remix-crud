import clsx from 'clsx';
import { IconProps } from './types';

export function ArrowLeftIcon({
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('w-6 h-6', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 17l-5-5m0 0l5-5m-5 5h12"
      />
    </svg>
  );
}
