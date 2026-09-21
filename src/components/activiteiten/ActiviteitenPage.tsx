"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "@/i18n/navigation";

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  rating: number;
  reviewCount: number;
  image: string | null;
  affiliateUrl: string;
  commission: string;
  category: "rondvaart" | "wandeltour" | "fietstour" | "museum" | "overig";
}

const activities: Activity[] = [
  {
    id: "stadsrondvaart",
    title: "Leiden: Stadsrondvaart met gids",
    description: "Ontdek Leiden vanaf het water met een begeleide grachtenrondvaart. Zie het historische stadscentrum en dwaal langs eeuwenoude grachten.",
    duration: "1 uur",
    price: "12,50",
    rating: 4.5,
    reviewCount: 989,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    commission: "2,00",
    category: "rondvaart",
  },
  {
    id: "historische-rondvaart",
    title: "Leiden: Rondvaart door de historische binnenstad met gids",
    description: "Verken de mooiste bezienswaardigheden van Leiden tijdens een rondleiding. Ervaar het stadscentrum met zijn schilderachtige grachten.",
    duration: "50 minuten",
    price: "13,50",
    rating: 4.5,
    reviewCount: 738,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    commission: "2,16",
    category: "rondvaart",
  },
  {
    id: "elektrische-boot",
    title: "Leiden: Elektrische Bootverhuur",
    description: "Wees je eigen kapitein en ontdek Leiden vanaf het water met 8 personen op een elektrische sloep. Geen vaarbewijs nodig.",
    duration: "2 uur",
    price: "120,00",
    rating: 5,
    reviewCount: 218,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    commission: "19,20",
    category: "rondvaart",
  },
  {
    id: "stadswandeling",
    title: "De mooiste stadswandeling met gids in Leiden",
    description: "Ontdek plaatsen die je niet in een reisgids vindt. Wandel door het historische centrum met een lokale gids.",
    duration: "2 uur",
    price: "24,00",
    rating: 4.5,
    reviewCount: 25,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    commission: "3,84",
    category: "wandeltour",
  },
  {
    id: "molen-rondvaart",
    title: "Leiden: Molen- en Plattelandsrondvaart bij Keukenhof",
    description: "Maak een schilderachtige molenrondvaart door het platteland van Leiden, op slechts 10 minuten van de Keukenhof.",
    duration: "1 uur",
    price: "19,50",
    rating: 4.5,
    reviewCount: 240,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    commission: "3,12",
    category: "rondvaart",
  },
  {
    id: "hortus-botanicus",
    title: "Leiden: toegangsbewijs voor de Hortus Botanicus Leiden",
    description: "Ontdek de oudste botanische tuin van Nederland met dit toegangsbewijs. Wandel door de Hortus Botanicus.",
    duration: "-",
    price: "14,00",
    rating: 4,
    reviewCount: 114,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    commission: "2,24",
    category: "museum",
  },
  {
    id: "rembrandt-wandeltour",
    title: "Leiden: wandeltour met gids en toegang tot Rembrandt Studio",
    description: "Dit is de enige stadswandeling in Leiden met een gids in Nederland die je kunt combineren met een bezoek aan het Rembrandt atelier.",
    duration: "1 uur 30 minuten",
    price: "74,00",
    rating: 5,
    reviewCount: 1,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    commission: "11,84",
    category: "wandeltour",
  },
  {
    id: "space-expo",
    title: "Noordwijk: toegangsbewijs voor de Space Expo",
    description: "Bij Space Expo ontdek je de wereld van de ruimtevaart in al zijn facetten. Perfect voor gezinnen.",
    duration: "-",
    price: "18,50",
    rating: 4.5,
    reviewCount: 90,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    commission: "2,96",
    category: "museum",
  },
];

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            viewBox="0 0 20 20"
            fill={star <= rating ? "#F59E0B" : star - 0.5 <= rating ? "url(#half)" : "#E5E7EB"}
            className="w-4 h-4"
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}

function BookingHelpForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    groupSize: "",
    children: "",
    elderly: "",
    interests: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3">
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-green-800 mb-2">Aanvraag ontvangen!</h3>
        <p className="text-sm text-green-600">
          We gaan voor je aan de slag en nemen zo snel mogelijk contact op met de beste opties voor jouw groep.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Naam</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="Je naam"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">E-mail</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="je@email.nl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Welke dag?</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Groepsgrootte</label>
          <input
            type="number"
            min="1"
            required
            value={form.groupSize}
            onChange={(e) => setForm({ ...form, groupSize: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="Aantal personen"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Kinderen (0-12)</label>
          <input
            type="number"
            min="0"
            value={form.children}
            onChange={(e) => setForm({ ...form, children: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Ouderen (65+)</label>
          <input
            type="number"
            min="0"
            value={form.elderly}
            onChange={(e) => setForm({ ...form, elderly: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Wat willen jullie doen in Leiden?</label>
        <select
          value={form.interests}
          onChange={(e) => setForm({ ...form, interests: e.target.value })}
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        >
          <option value="">Kies een activiteit...</option>
          <option value="rondvaart">Rondvaart door de grachten</option>
          <option value="wandeltour">Wandeltour met gids</option>
          <option value="fietstour">Fietstour door de stad</option>
          <option value="museum">Musea bezoeken</option>
          <option value="boot-huren">Zelf een boot huren</option>
          <option value="eten-drinken">Eten en drinken tips</option>
          <option value="combinatie">Combinatie van alles</option>
          <option value="anders">Iets anders</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Extra wensen of vragen</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={3}
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
          placeholder="Bijv. rolstoeltoegankelijk, speciale dieetwensen, tijdvoorkeur..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full text-sm transition-colors flex items-center justify-center gap-2"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
        </svg>
        Verstuur aanvraag
      </button>
    </form>
  );
}

export function ActiviteitenPage() {
  const { hasPaid, isLoading } = useAuth();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("alle");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-gray-400">Laden...</div>
      </div>
    );
  }

  if (!hasPaid) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-orange-500" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-navy-800 mb-2">Activiteiten ontgrendelen</h2>
        <p className="text-sm text-gray-500 mb-4">
          Koop het Leiden pakket voor toegang tot de beste activiteiten en persoonlijke hulp bij het boeken.
        </p>
        <Link
          href="/pricing"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
        >
          Bekijk het Leiden pakket
        </Link>
      </div>
    );
  }

  const categories = [
    { key: "alle", label: "Alles" },
    { key: "rondvaart", label: "Rondvaarten" },
    { key: "wandeltour", label: "Wandeltours" },
    { key: "museum", label: "Musea" },
    { key: "overig", label: "Overig" },
  ];

  const filtered = activeCategory === "alle"
    ? activities
    : activities.filter((a) => a.category === activeCategory);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-b from-navy-800 to-navy-900 text-white px-4 py-8 pb-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Activiteiten in Leiden</h1>
            <p className="text-white/70 text-sm">
              Boek de leukste tours en activiteiten, of laat ons persoonlijk helpen met jouw perfecte dag.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-5">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-navy-800 text-sm mb-1">Persoonlijke hulp bij het boeken</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Weet je niet welke tour het beste past bij jouw groep? Wij helpen je gratis!
                Vertel ons wat je wilt doen en wij zoeken de perfecte activiteit voor je uit.
              </p>
              <a href="#hulp-boeken" className="inline-flex items-center gap-1 mt-2 text-orange-600 text-xs font-semibold hover:text-orange-700">
                Vraag hulp aan
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-6">
        <h2 className="text-lg font-bold text-navy-800 mb-4">Topactiviteiten in Leiden</h2>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                activeCategory === cat.key
                  ? "bg-navy-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((activity) => (
            <a
              key={activity.id}
              href={activity.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <div className="w-32 md:w-44 bg-gray-200 shrink-0 aspect-[4/3] flex items-center justify-center">
                  {activity.image ? (
                    <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-gray-300" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="3" />
                      <circle cx="8" cy="8" r="2" />
                      <path d="M2 16l5-5 3 3 4-4 8 8" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="font-bold text-navy-800 text-sm leading-tight mb-1 line-clamp-2">
                      {activity.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{activity.description}</p>
                    {activity.duration !== "-" && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                        </svg>
                        Duur: {activity.duration}
                      </div>
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <StarRating rating={activity.rating} count={activity.reviewCount} />
                    <div className="text-right">
                      <p className="text-sm font-bold text-navy-800">Vanaf &euro;{activity.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="hulp-boeken" className="max-w-7xl mx-auto px-4 py-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-orange-500" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-navy-800 mb-1">Hulp bij het boeken?</h2>
            <p className="text-sm text-gray-500">
              Vertel ons over je groep en wat jullie willen doen. Wij zoeken de perfecte activiteit en helpen persoonlijk met boeken.
            </p>
          </div>

          <BookingHelpForm />
        </div>
      </section>
    </div>
  );
}
