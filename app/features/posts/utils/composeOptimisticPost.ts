import { User } from '@prisma/client';
import {
  ActionSubmission,
  LoaderSubmission,
} from '@remix-run/react/transition';

type Props = {
  submission:
    | ActionSubmission
    | LoaderSubmission
    | undefined;
  user: User;
};

export function composeOptimisticPost({
  submission,
  user,
}: Props) {
  const title = submission?.formData.get('title') as string;
  const content = submission?.formData.get(
    'content'
  ) as string;

  const post = {
    id: '',
    content,
    title,
    author: user!,
    authorId: user?.id,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };

  return post;
}
