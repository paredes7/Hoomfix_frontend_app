import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../api/auth";
import {
  getAccessToken,
  getUser,
  removeAccessToken,
  removeUser,
  setAccessToken,
  setUser,
} from "../storage/authStorage";

type AuthContextValue = {
  accessToken: string | null;
  user: User | null;
  isHydrated: boolean;
  setSession: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const clearSession = useCallback(async () => {
    await Promise.all([removeAccessToken(), removeUser()]);
    setAccessTokenState(null);
    setUserState(null);
  }, []);

  const hydrate = useCallback(async () => {
    const [storedToken, storedUser] = await Promise.all([
      getAccessToken(),
      getUser<User>(),
    ]);

    if (storedToken && storedUser) {
      setAccessTokenState(storedToken);
      setUserState(storedUser);
    }
    setIsHydrated(true);
  }, []);

  const setSession = useCallback(async (token: string, nextUser: User) => {
    await Promise.all([setAccessToken(token), setUser(nextUser)]);
    setAccessTokenState(token);
    setUserState(nextUser);
  }, []);

  const logout = useCallback(async () => {
    await clearSession();
  }, [clearSession]);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const value = useMemo(
    () => ({ accessToken, user, isHydrated, setSession, logout }),
    [accessToken, user, isHydrated, setSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
