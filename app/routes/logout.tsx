import type { ActionFunction, LoaderFunction } from 'remix';
import { redirect } from 'remix';
import { logout } from '~/features/auth/utils/getUser';

export const action: ActionFunction = async ({
  request,
}) => {
  return logout(request);
};

export const loader: LoaderFunction = async () => {
  return redirect('/');
};
