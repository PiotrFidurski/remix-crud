import { useCatch } from 'remix';

type OkResponseProps = {
  icon: React.ReactNode;
  children?: React.ReactNode;
};

export function OkResponse({
  icon,
  children,
}: OkResponseProps) {
  const caught = useCatch();
  return (
    <div className="flex flex-col justify-center min-h-screen gap-4 w-full text-green-400 bg-black-default rounded-md px-4 py-8">
      <div className="flex flex-col gap-4 border-2 px-6 py-6 border-green-400 border-dashed justify-center items-center text-center max-w-lg m-auto">
        <div className="flex flex-col items-center">
          {icon}
          <h1 className="font-bold">{caught.statusText}</h1>
          <p>{caught.status}</p>
        </div>
        <h2 className="text-3xl text-gray-300">
          {caught.data}
        </h2>
        <p className="text-gray-300">{children}</p>
      </div>
    </div>
  );
}
