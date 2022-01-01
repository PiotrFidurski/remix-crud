import {
  createCookieSessionStorage,
  redirect,
} from 'remix';

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error(
    'SESSION_SECRET must be set in your environment variables.'
  );
}

export const storage = createCookieSessionStorage({
  cookie: {
    name: 'AUTH_session',
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  },
});

type CreateUserSession = {
  userId: string;
  redirectTo: string;
};

export async function createUserSession({
  userId,
  redirectTo,
}: CreateUserSession) {
  const session = await storage.getSession();

  session.set('userId', userId);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}
