import bcrypt from 'bcrypt';
import {
  createCookieSessionStorage,
  redirect,
} from 'remix';
import { db } from '~/utils/db.server';

export type LoginProps = {
  username: string;
  password: string;
};

export async function register({
  username,
  password,
}: LoginProps) {
  const passwordHash = await bcrypt.hash(password, 10);

  return db.user.create({
    data: {
      username,
      password: passwordHash,
    },
  });
}

export async function login({
  username,
  password,
}: LoginProps) {
  const user = await db.user.findFirst({
    where: { username },
  });

  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!isCorrectPassword) return null;

  return user;
}

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

export async function logout(request: Request) {
  const session = await storage.getSession(
    request.headers.get('Cookie')
  );

  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

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
