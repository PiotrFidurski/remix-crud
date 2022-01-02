import bcrypt from 'bcrypt';
import { redirect } from 'remix';
import { db } from '~/utils/db.server';
import { getUserSession, storage } from './session.server';

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

export async function logout(request: Request) {
  const session = await getUserSession(request);

  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}
