import { useCatch } from 'remix';
import { SadEmojiIcon } from '../Icons';

export function DisplayResponse() {
  const caught = useCatch();

  return (
    <div className="flex flex-col justify-center min-h-screen gap-4 w-full text-red-400 bg-black-default rounded-md px-4 py-8">
      <div className="flex flex-col gap-4 border-2 px-6 py-6 border-red-400 border-dashed justify-center items-center text-center max-w-lg m-auto">
        <div className="flex flex-col items-center">
          <SadEmojiIcon className="w-16 h-16" />
          <h1 className="font-bold">{caught.statusText}</h1>
          <p>{caught.status}</p>
        </div>
        <h2 className="text-3xl text-gray-300">
          {caught.data}
        </h2>
      </div>
    </div>
  );
}
