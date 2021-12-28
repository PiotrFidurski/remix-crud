import clsx from 'clsx';

type FieldWrapperProps =
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    children: React.ReactNode;
  };

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export function FieldWrapper({
  children,
  htmlFor,
  className,
  ...props
}: FieldWrapperProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx('flex flex-col py-2', className)}
      {...props}
    >
      {children}
    </label>
  );
}
