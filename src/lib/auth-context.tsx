"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

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
  login: (email: string, password: string) => Promise<{ user?: User; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ user?: User; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadSession() {
      try {
        const response = await fetch("/api/auth/status", { cache: "no-store", credentials: "same-origin" });
        if (response.ok) {
          const status = await response.json() as { user?: User | null };
          if (!cancelled) setUser(status.user ?? null);
        }
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void loadSession();
    return () => { cancelled = true; };
  }, []);

  const authenticate = useCallback(async (path: string, payload: Record<string, string>) => {
    try {
      const response = await fetch(path, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({})) as { user?: User; error?: string };
      if (!response.ok || !result.user) return { error: result.error ?? "request_failed" };
      setUser(result.user);
      return { user: result.user };
    } catch {
      return { error: "request_failed" };
    }
  }, []);

  const login = useCallback((email: string, password: string) => authenticate("/api/auth/login", { email, password }), [authenticate]);
  const register = useCallback((name: string, email: string, password: string) => authenticate("/api/auth/register", { name, email, password }), [authenticate]);

  const logout = useCallback(() => {
    setUser(null);
    void fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      hasPaid: user?.hasPaid ?? false,
      isLoading,
      login,
      register,
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
