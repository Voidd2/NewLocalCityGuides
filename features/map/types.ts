/** Map adapter types — swappable without touching UI components */

export interface MapMarker {
  id: string;
  lng: number;
  lat: number;
  label: string;
  theme: string;
}

export interface MapConfig {
  center: [lng: number, lat: number];
  zoom: number;
  markers: MapMarker[];
}
