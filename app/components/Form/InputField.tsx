import clsx from 'clsx';
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from './FieldWrapper';

type InputFieldProps =
  React.InputHTMLAttributes<HTMLInputElement> &
    FieldWrapperPassThroughProps & {
      errorMessage?: string;
    };

export function InputField({
  className,
  htmlFor,
  children,
  errorMessage,
  ...props
}: InputFieldProps) {
  return (
    <FieldWrapper
      htmlFor={htmlFor}
      errorMessage={errorMessage}
    >
      <span className="mb-2">{children}</span>
      <input
        id={htmlFor}
        className={clsx(
          'bg-transparent rounded border focus:bg-slate-900 border-white-10 py-2 px-2 focus-ring',
          className
        )}
        {...props}
      />
    </FieldWrapper>
  );
}
