"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";

const paidNavItems = [
  {
    key: "home",
    href: "/dashboard",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 0 : 1.5}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        {!active && <path d="M9 21V12h6v9" />}
      </svg>
    ),
  },
  {
    key: "routes",
    href: "/routes",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 2.5 : 1.5}>
        <path d="M9 18l6-6-6-6" />
        <path d="M4 4v16" strokeLinecap="round" />
        <path d="M20 4v16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "ontdek",
    href: "/ontdek",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 0 : 1.5}>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "map",
    href: "/map",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 0 : 1.5}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" fill={active ? "white" : "none"} />
      </svg>
    ),
  },
  {
    key: "account",
    href: "/account",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 0 : 1.5}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
];

const publicNavItems = [
  {
    key: "home",
    href: "/",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 0 : 1.5}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        {!active && <path d="M9 21V12h6v9" />}
      </svg>
    ),
  },
  {
    key: "routes",
    href: "/routes",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 2.5 : 1.5}>
        <path d="M9 18l6-6-6-6" />
        <path d="M4 4v16" strokeLinecap="round" />
        <path d="M20 4v16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "ontdek",
    href: "/ontdek",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 0 : 1.5}>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "login",
    href: "/login",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="w-6 h-6" stroke="currentColor" strokeWidth={active ? 0 : 1.5}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { hasPaid, isLoggedIn } = useAuth();

  const navItems = hasPaid ? paidNavItems : publicNavItems;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-lg shadow-black/5"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && item.href !== "/dashboard" && pathname.startsWith(item.href));
          const label = t(item.key);
          return (
            <Link
              key={item.key + item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors duration-200 ${
                isActive ? "text-orange-500" : "text-gray-400"
              }`}
            >
              {item.icon(isActive)}
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
