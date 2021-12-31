import clsx from 'clsx';

type FieldWrapperProps =
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    children: React.ReactNode;
  } & { errorMessage?: string };

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export function FieldWrapper({
  children,
  htmlFor,
  className,
  errorMessage,
  ...props
}: FieldWrapperProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx('flex flex-col py-2', className)}
      {...props}
    >
      {children}
      <span className="text-error mt-2">
        {errorMessage}
      </span>
    </label>
  );
}
