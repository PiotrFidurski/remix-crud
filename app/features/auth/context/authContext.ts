import { User } from '@prisma/client';
import * as React from 'react';

type AuthContextProps = {
  user: User;
};

export const AuthContext =
  React.createContext<AuthContextProps | null>(null);
