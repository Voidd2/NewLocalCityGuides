"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { TEST_CREDENTIALS } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

export function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);

  if (isLoggedIn) {
    router.push("/dashboard");
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = login(email, password);
    if (result) {
      router.push("/dashboard");
    } else {
      setError("Onjuiste inloggegevens. Gebruik het testaccount hieronder.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-navy-800 mx-auto flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-navy-800">Inloggen</h1>
          <p className="text-sm text-gray-500 mt-1">Bekijk je gekochte stadspakket</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-navy-800 mb-1">
              E-mailadres
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="je@email.com"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-navy-800 mb-1">
              Wachtwoord
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="Wachtwoord"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-colors text-sm"
          >
            Inloggen
          </button>
        </form>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <button
            onClick={() => setShowCredentials(!showCredentials)}
            className="flex items-center justify-between w-full text-sm font-medium text-orange-700"
          >
            Testaccounts (voor demo)
            <svg viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${showCredentials ? "rotate-180" : ""}`}>
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {showCredentials && (
            <div className="mt-3 space-y-3 text-xs">
              <div className="bg-white rounded-lg p-3">
                <p className="font-bold text-green-700 mb-1">Betaald account (volledige toegang):</p>
                <p className="text-gray-600">Email: <code className="bg-gray-100 px-1 rounded">{TEST_CREDENTIALS.paid.email}</code></p>
                <p className="text-gray-600">Wachtwoord: <code className="bg-gray-100 px-1 rounded">{TEST_CREDENTIALS.paid.password}</code></p>
                <button
                  type="button"
                  onClick={() => { setEmail(TEST_CREDENTIALS.paid.email); setPassword(TEST_CREDENTIALS.paid.password); }}
                  className="text-orange-500 font-semibold mt-1 hover:underline"
                >
                  Vul in
                </button>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="font-bold text-gray-500 mb-1">Gratis account (beperkte toegang):</p>
                <p className="text-gray-600">Email: <code className="bg-gray-100 px-1 rounded">{TEST_CREDENTIALS.free.email}</code></p>
                <p className="text-gray-600">Wachtwoord: <code className="bg-gray-100 px-1 rounded">{TEST_CREDENTIALS.free.password}</code></p>
                <button
                  type="button"
                  onClick={() => { setEmail(TEST_CREDENTIALS.free.email); setPassword(TEST_CREDENTIALS.free.password); }}
                  className="text-orange-500 font-semibold mt-1 hover:underline"
                >
                  Vul in
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
