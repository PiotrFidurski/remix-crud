import { User } from '@prisma/client';

export type LoaderData = {
  user: User;
};

export type EditActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    bio: string | undefined;
  };
};
