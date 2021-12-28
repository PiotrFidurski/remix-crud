import clsx from 'clsx';
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from './FieldWrapper';

type TextareaFieldProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    FieldWrapperPassThroughProps;

export function TextareaField({
  className,
  htmlFor,
  children,
  rows = 10,
  ...props
}: TextareaFieldProps) {
  return (
    <FieldWrapper htmlFor={htmlFor}>
      <span className="mb-2">{children}</span>
      <textarea
        id={htmlFor}
        rows={rows}
        className={clsx(
          'bg-transparent focus:bg-slate-900 rounded border border-white-10 py-2 px-2 focus:outline-none focus:ring focus:ring-violet-700 focus:invalid:ring-error focus:ring-offset-4 focus:border-transparent focus:ring-offset-black-default',
          className
        )}
        {...props}
      />
    </FieldWrapper>
  );
}
