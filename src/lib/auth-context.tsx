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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.email) {
            setUser(parsed);
          }
        }
      } catch {
        // ignore
      }
      setIsLoading(false);
    });
    return () => cancelAnimationFrame(frame);
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
      hasPaid: user?.hasPaid ?? false,
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
