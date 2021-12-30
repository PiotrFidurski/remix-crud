import clsx from 'clsx';
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from './FieldWrapper';

type InputFieldProps =
  React.InputHTMLAttributes<HTMLInputElement> &
    FieldWrapperPassThroughProps;

export function InputField({
  className,
  htmlFor,
  children,
  ...props
}: InputFieldProps) {
  return (
    <FieldWrapper htmlFor={htmlFor}>
      <span className="mb-2">{children}</span>
      <input
        id={htmlFor}
        className={clsx(
          'bg-transparent focus:bg-slate-900 rounded border border-white-10 py-2 px-2 focus:outline-none focus:ring focus:ring-violet-700 focus:invalid:ring-error focus:ring-offset-4 focus:border-transparent focus:ring-offset-black-default',
          className
        )}
        {...props}
      />
    </FieldWrapper>
  );
}
