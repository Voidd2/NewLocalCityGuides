'use client';

/**
 * CityMapClient — client wrapper around the dynamic CityMap import.
 * Required because `ssr: false` is only allowed in Client Components.
 */
import dynamic from 'next/dynamic';
import type { MapConfig } from './types';

const CityMap = dynamic(() => import('./CityMap'), { ssr: false });

interface Props {
  config: MapConfig;
  className?: string;
  onMarkerClick?: (id: string) => void;
}

export default function CityMapClient(props: Props) {
  return <CityMap {...props} />;
}
