'use client';

/**
 * LocationVideoModal — slides up from bottom when user arrives at a stop.
 *
 * Supports:
 *   - YouTube URLs (youtube.com/watch?v=... or youtu.be/...)  → iframe embed
 *   - Self-hosted MP4/WebM                                     → <video> element
 *   - mediaType 'audio'                                        → <audio> element
 *   - mediaType 'text'                                         → text-only card
 */
import { useEffect, useRef, useState } from 'react';
import { X, Volume2, Play, Pause, ChevronDown, CheckCircle, Film, Headphones, FileText } from 'lucide-react';

export interface ModalStop {
  id: string;
  name: string;
  subtitle: string;
  story: string;
  mediaType: 'video' | 'audio' | 'text';
  videoUrl?: string;
  audioUrl?: string;
  imageUrl?: string;
  distanceMetres: number;
}

interface Props {
  stop: ModalStop | null;
  onClose: () => void;
  onMarkVisited: (id: string) => void;
  isVisited: boolean;
}

/** Extract YouTube video ID from various URL formats */
function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

function fmt(secs: number) {
  if (!isFinite(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const MEDIA_ICONS = {
  video: Film,
  audio: Headphones,
  text: FileText,
} as const;

const MEDIA_LABELS = {
  video: 'Video',
  audio: 'Audio',
  text: 'Tekst',
} as const;

export default function LocationVideoModal({ stop, onClose, onMarkVisited, isVisited }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioTime, setAudioTime] = useState(0);

  // Reset audio state when stop changes
  useEffect(() => {
    if (!stop || stop.mediaType !== 'audio' || !stop.audioUrl) return;
    const audio = new Audio(stop.audioUrl);
    audioRef.current = audio;
    audio.addEventListener('timeupdate', () => {
      setAudioTime(audio.currentTime);
      setAudioProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    });
    audio.addEventListener('durationchange', () => setAudioDuration(audio.duration));
    audio.addEventListener('ended', () => setAudioPlaying(false));
    return () => {
      audio.pause();
      audio.src = '';
    };
    // Re-create the audio element only when the stop identity or its audio source changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stop?.id, stop?.audioUrl]);

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audioPlaying) { audio.pause(); setAudioPlaying(false); }
    else { audio.play(); setAudioPlaying(true); }
  }

  function seekAudio(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  }

  if (!stop) return null;

  const ytId = stop.videoUrl ? youtubeId(stop.videoUrl) : null;
  const MediaIcon = MEDIA_ICONS[stop.mediaType];

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative z-10 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-3 pb-4">
          <div className="flex-1 min-w-0 pr-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                <MediaIcon className="w-3 h-3" />
                {MEDIA_LABELS[stop.mediaType]}
              </span>
              {stop.distanceMetres <= 50 && (
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                  📍 Je bent hier
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">{stop.name}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{stop.subtitle}</p>
          </div>
          <button onClick={onClose} className="shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* ── VIDEO PLAYER ── */}
        {stop.mediaType === 'video' && stop.videoUrl && (
          <div className="px-5 mb-5">
            {ytId ? (
              /* YouTube embed */
              <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-md">
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  title={stop.name}
                />
              </div>
            ) : (
              /* Self-hosted MP4/WebM */
              <div className="rounded-2xl overflow-hidden bg-black shadow-md">
                <video
                  src={stop.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-72 object-contain"
                  poster={stop.imageUrl}
                >
                  Je browser ondersteunt geen video.
                </video>
              </div>
            )}
          </div>
        )}

        {/* ── AUDIO PLAYER ── */}
        {stop.mediaType === 'audio' && stop.audioUrl && (
          <div className="px-5 mb-5">
            {/* Thumbnail */}
            {stop.imageUrl && (
              <div className="h-40 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={stop.imageUrl} alt={stop.name} className="w-full h-full object-cover" />
              </div>
            )}
            {/* Controls */}
            <div className="bg-gray-900 rounded-2xl p-4 text-white">
              {/* Progress bar */}
              <div
                className="h-1.5 bg-gray-700 rounded-full mb-3 cursor-pointer"
                onClick={seekAudio}
              >
                <div
                  className="h-full bg-amber-400 rounded-full transition-all"
                  style={{ width: `${audioProgress * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAudio}
                  className="w-10 h-10 rounded-full bg-amber-400 text-gray-900 flex items-center justify-center hover:bg-amber-300 transition-colors"
                >
                  {audioPlaying
                    ? <Pause className="w-4 h-4" />
                    : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="flex-1">
                  <p className="text-sm font-medium">{stop.name}</p>
                  <p className="text-xs text-gray-400">{fmt(audioTime)} / {fmt(audioDuration)}</p>
                </div>
                <Volume2 className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* ── TEXT-ONLY (no media) ── */}
        {stop.mediaType === 'text' && stop.imageUrl && (
          <div className="px-5 mb-4">
            <div className="h-48 rounded-2xl overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={stop.imageUrl} alt={stop.name} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Story text */}
        <div className="px-5 pb-3">
          <p className="text-sm text-gray-700 leading-relaxed">{stop.story}</p>
        </div>

        {/* CTA */}
        <div className="px-5 pb-8 pt-3 flex gap-3">
          <button
            onClick={() => { onMarkVisited(stop.id); onClose(); }}
            disabled={isVisited}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-medium text-sm transition-colors ${
              isVisited
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            {isVisited ? 'Bezocht ✓' : 'Markeer als bezocht'}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-full font-medium text-sm border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors flex items-center gap-1"
          >
            <ChevronDown className="w-4 h-4" /> Sluit
          </button>
        </div>
      </div>
    </div>
  );
}
