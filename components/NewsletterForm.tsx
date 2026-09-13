'use client';

import { useState } from 'react';

interface Props {
  locale: string;
  className?: string;
  variant?: 'light' | 'dark';
}

export default function NewsletterForm({ locale, className = '', variant = 'light' }: Props) {
  const loc = locale as 'nl' | 'en';
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? 'success' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <p className={`text-sm font-medium text-green-600 ${className}`}>
        ✓ {loc === 'nl' ? 'Je staat op de lijst!' : "You're on the list!"}
      </p>
    );
  }

  const inputClass = variant === 'dark'
    ? 'flex-1 px-4 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40'
    : 'flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white';

  const btnClass = variant === 'dark'
    ? 'bg-amber-400 text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-300 transition-colors disabled:opacity-60'
    : 'bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60';

  return (
    <form onSubmit={submit} className={`flex gap-2 ${className}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={loc === 'nl' ? 'jouw@email.nl' : 'your@email.com'}
        className={inputClass}
      />
      <button type="submit" disabled={state === 'loading'} className={btnClass}>
        {state === 'loading'
          ? '...'
          : loc === 'nl' ? 'Aanmelden' : 'Sign up'}
      </button>
      {state === 'error' && (
        <span className="text-xs text-red-500 self-center">
          {loc === 'nl' ? 'Probeer opnieuw' : 'Try again'}
        </span>
      )}
    </form>
  );
}
