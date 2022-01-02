import { useCatch } from 'remix';
import { ErrorResponse } from './ErrorResponse';
import { OkResponse } from './OkResponse';

type DisplayErrorProps =
  React.HTMLAttributes<HTMLDivElement> & {
    icon: React.ReactNode;
    children?: React.ReactNode;
  };

export function DisplayResponse({
  icon,
  children,
}: DisplayErrorProps) {
  const caught = useCatch();

  switch (caught.status) {
    case 200: {
      return (
        <OkResponse icon={icon}>{children}</OkResponse>
      );
    }
    case 404: {
      return <ErrorResponse icon={icon} />;
    }

    case 500: {
      return <ErrorResponse icon={icon} />;
    }

    default: {
      return <ErrorResponse icon={icon} />;
    }
  }
}
