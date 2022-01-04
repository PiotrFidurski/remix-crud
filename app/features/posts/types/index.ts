import { Post } from '@prisma/client';

export type ActionData = {
  formError?: string;
  fieldErrors?: {
    title: string | undefined;
    content: string | undefined;
  };
};

export type LoaderData = {
  post: Post;
};
