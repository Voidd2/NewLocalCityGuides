"use client";

import { createContext, useContext, useSyncExternalStore, useCallback, type ReactNode } from "react";
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
const listeners = new Set<() => void>();
let cachedUser: User | null = null;
let hasReadStorage = false;

function readUserFromStorage(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.email) return parsed;
    }
  } catch {
    // ignore
  }
  return null;
}

function getSnapshot(): User | null {
  if (!hasReadStorage) {
    cachedUser = readUserFromStorage();
    hasReadStorage = true;
  }
  return cachedUser;
}

function getServerSnapshot(): User | null {
  return null;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setStoredUser(user: User | null): void {
  cachedUser = user;
  hasReadStorage = true;
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore
  }
  listeners.forEach((listener) => listener());
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore resolves the real client value (localStorage) before the
  // browser paints, so no separate `isLoading` gate is needed for hydration safety.
  const user = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const login = useCallback((email: string, password: string): User | null => {
    const result = validateLogin(email, password);
    if (result) {
      setStoredUser(result);
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    setStoredUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      hasPaid: user?.hasPaid ?? false,
      isLoading: false,
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
