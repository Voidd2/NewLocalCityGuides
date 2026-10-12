"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { validateLogin } from "./auth";

interface User {
  email: string;
  name: string;
  hasPaid: boolean;
  city: string;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  hasPaid: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "ylcg_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [serverHasPaid, setServerHasPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadSession() {
      let storedUser: User | null = null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw && process.env.NODE_ENV !== "production") {
          const parsed = JSON.parse(raw);
          if (parsed?.email) {
            storedUser = parsed;
          }
        }
      } catch {
        // ignore
      }
      try {
        const response = await fetch("/api/premium/status", { cache: "no-store", credentials: "same-origin" });
        if (response.ok) {
          const status = await response.json() as { hasPaid?: boolean; subject?: string };
          if (status.hasPaid && status.subject) {
            if (!cancelled) {
              setServerHasPaid(true);
              setUser({ email: status.subject, name: storedUser?.email === status.subject ? storedUser.name : status.subject, hasPaid: true, city: "leiden" });
            }
          } else if (!cancelled) {
            setUser(storedUser);
          }
        } else if (!cancelled) {
          setUser(storedUser);
        }
      } catch {
        if (!cancelled) setUser(storedUser);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void loadSession();
    return () => { cancelled = true; };
  }, []);

  const login = useCallback((email: string, password: string): User | null => {
    const result = validateLogin(email, password);
    if (result) {
      setUser(result);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      } catch {
        // ignore
      }
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setServerHasPaid(false);
    void fetch("/api/premium/logout", { method: "POST", credentials: "same-origin" });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      hasPaid: serverHasPaid,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
