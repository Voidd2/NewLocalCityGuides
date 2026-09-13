'use client';
import { Play, Pause, X } from 'lucide-react';

interface Props {
  title: string;
  playing: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  onPlay: () => void;
  onPause: () => void;
  onClose: () => void;
  onSeek: (progress: number) => void;
}

function fmt(secs: number) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayerBar({
  title,
  playing,
  progress,
  currentTime,
  duration,
  onPlay,
  onPause,
  onClose,
  onSeek,
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-3 shadow-2xl">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div
          className="h-1 bg-gray-700 rounded-full mb-3 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onSeek((e.clientX - rect.left) / rect.width);
          }}
        >
          <div
            className="h-full bg-amber-400 rounded-full transition-all"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={playing ? onPause : onPlay}
            className="w-9 h-9 rounded-full bg-amber-400 text-gray-900 flex items-center justify-center shrink-0 hover:bg-amber-300 transition-colors"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{title}</p>
            <p className="text-xs text-gray-400">
              {fmt(currentTime)} / {fmt(duration)}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
