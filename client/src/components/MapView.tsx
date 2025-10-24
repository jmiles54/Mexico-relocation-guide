import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Coffee, Wine, Waves, Droplet } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Venue {
  id: number;
  name: string;
  type: 'wine-bar' | 'cafe' | 'restaurant' | 'beach' | 'charco';
  lat: number;
  lng: number;
}

interface NeighborhoodBoundary {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: {
    name: string;
    color: string;
  };
}

interface MapViewProps {
  neighborhoodName: string;
  centerLat: number;
  centerLng: number;
  venues?: Venue[];
  boundary?: NeighborhoodBoundary;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapView({
  neighborhoodName,
  centerLat,
  centerLng,
  venues = [],
  boundary
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN || !mapContainer.current) return;
    
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [centerLng, centerLat],
      zoom: 13.5
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      if (boundary) {
        map.current.addSource('neighborhood-boundary', {
          type: 'geojson',
          data: boundary as GeoJSON.Feature
        });

        map.current.addLayer({
          id: 'neighborhood-fill',
          type: 'fill',
          source: 'neighborhood-boundary',
          paint: {
            'fill-color': boundary.properties.color,
            'fill-opacity': 0.15
          }
        });

        map.current.addLayer({
          id: 'neighborhood-outline',
          type: 'line',
          source: 'neighborhood-boundary',
          paint: {
            'line-color': boundary.properties.color,
            'line-width': 2,
            'line-opacity': 0.8
          }
        });
      }

      venues.forEach((venue) => {
        if (!map.current) return;

        const markerColor = getMarkerColor(venue.type);
        
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = markerColor;
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';

        new mapboxgl.Marker(el)
          .setLngLat([venue.lng, venue.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<strong>${venue.name}</strong><br/>${getVenueTypeLabel(venue.type)}`)
          )
          .addTo(map.current);
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [centerLat, centerLng, venues, boundary]);

  const getMarkerColor = (type: Venue['type']) => {
    switch (type) {
      case 'wine-bar':
        return '#a855f7';
      case 'cafe':
        return '#f59e0b';
      case 'beach':
        return '#3b82f6';
      case 'charco':
        return '#06b6d4';
      default:
        return '#ef4444';
    }
  };

  const getVenueTypeLabel = (type: Venue['type']) => {
    switch (type) {
      case 'wine-bar':
        return 'Wine Bar';
      case 'cafe':
        return 'Café';
      case 'beach':
        return 'Beach';
      case 'charco':
        return 'Natural Pool';
      default:
        return 'Venue';
    }
  };

  return (
    <Card data-testid="map-view">
      <CardContent className="p-0">
        <div className="relative">
          <div
            ref={mapContainer}
            className="h-[500px] rounded-t-lg"
            style={{ width: '100%' }}
          />
          {!MAPBOX_TOKEN && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-t-lg">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-2 text-slate-400" />
                <p className="text-sm text-slate-500">Map loading...</p>
                <p className="text-xs text-slate-400 mt-1">Mapbox token required</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t">
          <h3 className="font-semibold mb-3">Map Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-purple-500 text-white p-1.5 rounded-full">
                <Wine className="w-3 h-3" />
              </div>
              <span className="text-xs">Wine Bars</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-amber-500 text-white p-1.5 rounded-full">
                <Coffee className="w-3 h-3" />
              </div>
              <span className="text-xs">Cafés</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 text-white p-1.5 rounded-full">
                <Waves className="w-3 h-3" />
              </div>
              <span className="text-xs">Beaches</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-cyan-500 text-white p-1.5 rounded-full">
                <Droplet className="w-3 h-3" />
              </div>
              <span className="text-xs">Natural Pools</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
