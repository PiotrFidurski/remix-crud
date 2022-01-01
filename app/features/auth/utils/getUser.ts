import { redirect } from 'remix';
import { db } from '~/utils/db.server';
import {
  getUserSession,
  logout,
} from '../session/session.server';

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');

  if (!userId || typeof userId !== 'string') return null;

  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([
      ['redirectTo', redirectTo],
    ]);
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== 'string') {
    return null;
  }
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw logout(request);
  }
}
