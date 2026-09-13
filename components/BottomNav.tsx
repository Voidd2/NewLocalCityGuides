'use client';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Home, Map, Route, Heart, MoreHorizontal } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'nl';

  const tabs = [
    { label: 'Home', icon: Home, href: `/${locale}` },
    { label: 'Kaart', icon: Map, href: `/${locale}/cities/leiden` },
    { label: 'Routes', icon: Route, href: `/${locale}/cities/leiden/routes` },
    { label: 'Opgeslagen', icon: Heart, href: `/${locale}/account` },
    { label: 'Meer', icon: MoreHorizontal, href: `/${locale}/about` },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0F0E0D]/95 backdrop-blur border-t border-[rgba(255,255,255,0.08)]">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ label, icon: Icon, href }) => {
          const active = pathname === href || (href !== `/${locale}` && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                active ? 'text-[#C9A46B]' : 'text-[#5A4E42]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-medium tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
