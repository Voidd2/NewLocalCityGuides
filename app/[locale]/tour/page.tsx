'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MapPin, Navigation, CheckCircle, Loader2, Film, Headphones, FileText } from 'lucide-react';
import { useGeolocation } from '@/features/tour/useGeolocation';
import { useProximity } from '@/features/tour/useProximity';
import LocationVideoModal from '@/features/tour/LocationVideoModal';
import type { ModalStop } from '@/features/tour/LocationVideoModal';

// Hardcoded stops — will be loaded from YAML/API once routes YAML is complete
const LEIDEN_STOPS = [
  {
    id: 'burcht-van-leiden',
    name: 'Burcht van Leiden',
    subtitle: 'Middeleeuws bolwerk boven de stad',
    story: 'De Burcht is een ringvormige stenen versterking op een kunstmatige heuvel uit de 11e eeuw. Vanuit de top heb je een uniek panorama over Leiden en de Oude en Nieuwe Rijn.',
    lat: 52.1601, lng: 4.4921, order: 1,
    mediaType: 'video' as const,
    videoUrl: undefined, // wordt gevuld zodra video gemaakt is
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Leiden_burcht.jpg/1280px-Leiden_burcht.jpg',
  },
  {
    id: 'pieterskerk',
    name: 'Pieterskerk',
    subtitle: 'Gothische kerk met 700 jaar Leidse geschiedenis',
    story: 'Onder de vloer liggen meer dan 30.000 mensen begraven, waaronder de schilder Jan Steen en John Robinson — de leider van de Pilgrimvaders.',
    lat: 52.1588, lng: 4.4910, order: 2,
    mediaType: 'video' as const,
    videoUrl: undefined,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Leiden_Pieterskerk_gezien_vanuit_het_Pieterskerkchoorsteeg.jpg/1280px-Leiden_Pieterskerk_gezien_vanuit_het_Pieterskerkchoorsteeg.jpg',
  },
  {
    id: 'molen-de-valk',
    name: 'Molen De Valk',
    subtitle: 'Leidse stadskorenmolen uit 1743',
    story: 'Gebouwd in 1743, was het een van de zeven molens die Leiden ooit had. De wieken zijn elk 27 meter lang en maalde tot 1964 actief graan.',
    lat: 52.1572, lng: 4.4894, order: 3,
    mediaType: 'video' as const,
    videoUrl: undefined,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Leiden_Molen_De_Valk_06.jpg/1280px-Leiden_Molen_De_Valk_06.jpg',
  },
  {
    id: 'hortus-botanicus',
    name: 'Hortus Botanicus',
    subtitle: 'Oudste botanische tuin van Nederland (1590)',
    story: 'Directeur Carolus Clusius introduceerde hier in 1593 de eerste tulp in Nederland — het begin van de Nederlandse tulpenhandel.',
    lat: 52.1607, lng: 4.4987, order: 4,
    mediaType: 'video' as const,
    videoUrl: undefined,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Leiden_Hortus_Botanicus.jpg/1280px-Leiden_Hortus_Botanicus.jpg',
  },
  {
    id: 'rijksmuseum-van-oudheden',
    name: 'Rijksmuseum van Oudheden',
    subtitle: 'Nationaal museum voor archeologie',
    story: 'Het pronkstuk: de Tempel van Taffeh, een complete Egyptische tempel uit 15 v.Chr. — steen voor steen herbouwd in Leiden en weegt meer dan 2.000 ton.',
    lat: 52.1596, lng: 4.4924, order: 5,
    mediaType: 'video' as const,
    videoUrl: undefined,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Museum_van_oudheden.jpg/1280px-Museum_van_oudheden.jpg',
  },
];

const MEDIA_ICONS = { video: Film, audio: Headphones, text: FileText } as const;

function fmtDist(m: number) {
  return m < 1000 ? `${Math.round(m)}m` : `${(m / 1000).toFixed(1)}km`;
}

export default function TourPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'nl';

  const { position, status, error, start } = useGeolocation();
  const nearby = useProximity(LEIDEN_STOPS, position, 50);

  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [modalStop, setModalStop] = useState<ModalStop | null>(null);
  // Use ref for autoOpened so updates don't trigger re-renders or effect loops
  const autoOpenedRef = useRef<Set<string>>(new Set());

  // Auto-open modal when arriving at a new stop
  useEffect(() => {
    if (nearby.length === 0) return;
    const nearest = nearby[0];
    if (!autoOpenedRef.current.has(nearest.id)) {
      const stop = LEIDEN_STOPS.find((s) => s.id === nearest.id);
      if (stop) {
        autoOpenedRef.current = new Set([...autoOpenedRef.current, nearest.id]);
        // GPS-triggered state update — useEffect is correct here (external system sync)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setModalStop({
          id: stop.id,
          name: stop.name,
          subtitle: stop.subtitle,
          story: stop.story,
          mediaType: stop.mediaType,
          videoUrl: stop.videoUrl,
          imageUrl: stop.imageUrl,
          distanceMetres: nearest.distanceMetres,
        });
      }
    }
  }, [nearby]);

  const markVisited = useCallback((id: string) => {
    setVisited((prev) => new Set([...prev, id]));
  }, []);

  const openStop = useCallback((stopId: string) => {
    const stop = LEIDEN_STOPS.find((s) => s.id === stopId);
    const nearbyStop = nearby.find((n) => n.id === stopId);
    if (!stop) return;
    setModalStop({
      id: stop.id,
      name: stop.name,
      subtitle: stop.subtitle,
      story: stop.story,
      mediaType: stop.mediaType,
      videoUrl: stop.videoUrl,
      imageUrl: stop.imageUrl,
      distanceMetres: nearbyStop?.distanceMetres ?? 9999,
    });
  }, [nearby]);

  // ── GPS permission screen ──
  if (status === 'idle' || status === 'unsupported') {
    return (
      <div className="min-h-screen bg-[#0F0E0D] pt-20 flex items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-[#C9A46B]/15 flex items-center justify-center mx-auto mb-5">
            <Navigation className="w-8 h-8 text-[#C9A46B]" />
          </div>
          <h1 className="text-2xl font-bold text-[#F5F0E8] mb-2">GPS wandeltour</h1>
          <p className="text-[#8B7D6B] text-sm mb-2 leading-relaxed">
            Loop door Leiden en krijg automatisch een <strong className="text-[#F5F0E8]">video</strong> te zien zodra je bij een locatie aankomt.
          </p>
          <p className="text-xs text-[#5A4E42] mb-6">Je locatie wordt nooit opgeslagen of gedeeld.</p>

          {status === 'unsupported' ? (
            <p className="text-red-300 text-sm bg-red-950/40 border border-red-900/50 rounded-xl p-3">GPS is niet beschikbaar in deze browser.</p>
          ) : (
            <button
              onClick={start}
              className="bg-[#C9A46B] text-[#0F0E0D] px-6 py-3 rounded-full font-bold hover:bg-[#D4B47E] transition-colors w-full"
            >
              GPS inschakelen en starten
            </button>
          )}

          {/* Preview of stops */}
          <div className="mt-8 text-left space-y-2">
            {LEIDEN_STOPS.map((s) => {
              const Icon = MEDIA_ICONS[s.mediaType];
              return (
                <div key={s.id} className="flex items-center gap-3 text-sm text-[#8B7D6B]">
                  <div className="w-7 h-7 rounded-full bg-[#1C1916] border border-[rgba(255,255,255,0.08)] flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#8B7D6B]" />
                  </div>
                  <span>{s.name}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <Link href={`/${locale}/cities/leiden`} className="text-sm text-[#5A4E42] hover:text-[#F5F0E8] transition-colors">
              ← Terug naar Leiden
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Active tour ──
  return (
    <div className="min-h-screen bg-[#0F0E0D] pt-14">
      {/* GPS status bar */}
      <div className="bg-[#1C1916] border-b border-[rgba(255,255,255,0.08)] text-[#F5F0E8] px-4 py-2 flex items-center justify-between text-xs sticky top-14 z-40">
        <div className="flex items-center gap-2">
          {status === 'watching' ? (
            <span className="flex items-center gap-1.5 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              GPS actief
              {position && <span className="text-[#8B7D6B] ml-1">±{Math.round(position.accuracy)}m</span>}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-yellow-400">
              <Loader2 className="w-3 h-3 animate-spin" /> GPS verbinden...
            </span>
          )}
        </div>
        <Link href={`/${locale}/cities/leiden`} className="text-[#8B7D6B] hover:text-[#F5F0E8] transition-colors">
          Tour stoppen ✕
        </Link>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-[#8B7D6B] mb-2">
            <span className="font-medium text-[#F5F0E8]">Historisch Leiden</span>
            <span>{visited.size}/{LEIDEN_STOPS.length} bezocht</span>
          </div>
          <div className="w-full bg-[#252118] rounded-full h-1.5">
            <div
              className="bg-[#C9A46B] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(visited.size / LEIDEN_STOPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Stop list */}
        <div className="space-y-3">
          {LEIDEN_STOPS.map((stop) => {
            const isVisited = visited.has(stop.id);
            const nearbyStop = nearby.find((n) => n.id === stop.id);
            const isNearby = !!nearbyStop;
            const MediaIcon = MEDIA_ICONS[stop.mediaType];

            return (
              <button
                key={stop.id}
                onClick={() => openStop(stop.id)}
                className={`w-full text-left rounded-2xl border p-4 transition-all ${
                  isNearby
                    ? 'border-[#C9A46B]/60 bg-[#C9A46B]/10 shadow-sm ring-1 ring-[#C9A46B]/30'
                    : isVisited
                    ? 'border-[#4A7C59]/40 bg-[#4A7C59]/10'
                    : 'border-[rgba(255,255,255,0.08)] bg-[#1C1916] hover:border-[rgba(255,255,255,0.16)] hover:bg-[#252118]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Status icon */}
                  <div className="shrink-0">
                    {isVisited ? (
                      <CheckCircle className="w-6 h-6 text-[#4A7C59]" />
                    ) : isNearby ? (
                      <div className="w-6 h-6 rounded-full bg-[#C9A46B] flex items-center justify-center">
                        <span className="text-xs font-bold text-[#0F0E0D]">{stop.order}</span>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-[rgba(255,255,255,0.15)] flex items-center justify-center">
                        <span className="text-xs text-[#5A4E42]">{stop.order}</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-semibold text-sm truncate ${
                        isNearby ? 'text-[#C9A46B]' : 'text-[#F5F0E8]'
                      }`}>
                        {stop.name}
                      </p>
                      {isNearby && (
                        <span className="text-xs bg-[#C9A46B] text-[#0F0E0D] font-bold px-2 py-0.5 rounded-full shrink-0">
                          Dichtbij!
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-[#8B7D6B]">
                        <MediaIcon className="w-3 h-3" />
                        {stop.mediaType === 'video' ? 'Video' : stop.mediaType === 'audio' ? 'Audio' : 'Tekst'}
                      </span>
                      {position && (
                        <span className="flex items-center gap-1 text-xs text-[#8B7D6B]">
                          <MapPin className="w-3 h-3" />
                          {nearbyStop
                            ? fmtDist(nearbyStop.distanceMetres)
                            : fmtDist(Math.sqrt(
                                Math.pow((stop.lat - position.lat) * 111320, 2) +
                                Math.pow((stop.lng - position.lng) * 111320 * Math.cos(position.lat * Math.PI / 180), 2)
                              ))}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chevron hint */}
                  <span className="text-[#5A4E42] text-lg shrink-0">›</span>
                </div>

                {/* Nearby prompt */}
                {isNearby && !isVisited && (
                  <div className="mt-2 ml-9 flex items-center gap-1.5 text-xs text-[#C9A46B] font-medium">
                    <Film className="w-3.5 h-3.5" />
                    Tik om de video te bekijken
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {error && (
          <div className="mt-4 bg-red-950/40 border border-red-900/50 rounded-xl p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {visited.size === LEIDEN_STOPS.length && (
          <div className="mt-6 bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">🎉</div>
            <h3 className="font-bold text-[#F5F0E8] mb-1">Tour voltooid!</h3>
            <p className="text-sm text-[#8B7D6B] mb-4">Je hebt alle {LEIDEN_STOPS.length} locaties van Historisch Leiden bezocht.</p>
            <Link href={`/${locale}/cities/leiden`} className="inline-flex items-center gap-2 bg-[#C9A46B] text-[#0F0E0D] px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#D4B47E] transition-colors">
              ← Terug naar Leiden
            </Link>
          </div>
        )}
      </div>

      {/* Video / media modal */}
      <LocationVideoModal
        stop={modalStop}
        onClose={() => setModalStop(null)}
        onMarkVisited={markVisited}
        isVisited={modalStop ? visited.has(modalStop.id) : false}
      />
    </div>
  );
}
