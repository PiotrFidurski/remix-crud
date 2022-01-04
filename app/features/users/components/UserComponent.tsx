import { User } from '@prisma/client';
import { format } from 'date-fns';

export type UserProps = {
  user: User;
};

export function UserComponent({ user }: UserProps) {
  return (
    <div className="flex items-start flex-col lg:flex-row gap-4 mb-2 px-4 py-6">
      <div className="flex min-w-[180px] border-r border-white-10">
        <img
          className="w-40 h-40 object-cover rounded-full border-4 border-violet-700"
          alt="user-avatar"
          src="/images/avatar.png"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-4xl py-2">
          {user?.username}
        </h1>
        <div className="flex gap-1 items-center">
          <span>Joined</span>
          <span>
            {format(
              new Date(user?.createdAt!),
              'MMM-dd-yyyy'
            )}
          </span>
        </div>
        <hr className="border-white-10 my-4" />
        <p className="break-all">{user?.bio}</p>
      </div>
    </div>
  );
}
