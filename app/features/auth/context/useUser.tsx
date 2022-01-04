import * as React from 'react';
import { AuthContext } from './AuthContext';

export function useUser() {
  const context = React.useContext(AuthContext);

  if (!context)
    throw new Error(
      `You are using AuthContext outside of AuthProvider,
      please wrap your dom element in AuthProvider and provide
      it a value`
    );

  return context.user;
}
