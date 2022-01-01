import { User } from '@prisma/client';
import * as React from 'react';
import { AuthContext } from './authContext';

type AuthProviderProps = {
  children: React.ReactNode;
  user: User;
};

export default function AuthProvider({
  children,
  user,
}: AuthProviderProps) {
  const contextValue = React.useMemo(
    () => ({ user }),
    [user]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
