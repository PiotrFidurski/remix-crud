import { ThrownResponse } from 'remix';
import { ErrorResponse } from './ErrorResponse';
import { OkResponse } from './OkResponse';

type DisplayErrorProps =
  React.HTMLAttributes<HTMLDivElement> & {
    caught: ThrownResponse<number, string>;
    icon: React.ReactNode;
    children?: React.ReactNode;
  };

export function DisplayResponse({
  caught,
  icon,
  children,
}: DisplayErrorProps) {
  switch (caught.status) {
    case 200: {
      return (
        <OkResponse icon={icon}>{children}</OkResponse>
      );
    }
    case 404: {
      return <ErrorResponse icon={icon} />;
    }

    default: {
      return <ErrorResponse icon={icon} />;
    }
  }
}
