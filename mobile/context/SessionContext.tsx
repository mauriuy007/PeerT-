import React, { createContext, useContext } from 'react';

export type Session = {
  token: string;
  userId: number;
};

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
  );
}

/**
 * Access the current auth session (token + userId) from any screen inside the
 * authenticated navigator. Throws if used outside of `SessionProvider` so
 * misuse fails loudly instead of silently sending unauthenticated requests.
 *
 * NOTE: this is an in-memory-only session (no persistence). Token
 * persistence via expo-secure-store, session bootstrap on app launch, and
 * logout are covered by the companion ticket "Wire mobile auth screens to
 * backend signup/login endpoints" — not implemented here.
 */
export function useSession(): Session {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return ctx;
}
