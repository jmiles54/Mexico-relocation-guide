import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Activity, Cross } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';

interface HealthcareFacility {
  id: number;
  name: string;
  type: 'pharmacy' | 'clinic' | 'hospital';
  lat: number;
  lng: number;
  address: string;
  hours?: string;
  phone?: string;
}

interface HealthcareMapProps {
  neighborhoodName: string;
  centerLat: number;
  centerLng: number;
  facilities: HealthcareFacility[];
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function HealthcareMap({
  neighborhoodName,
  centerLat,
  centerLng,
  facilities
}: HealthcareMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN || !mapContainer.current) return;
    
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [centerLng, centerLat],
        zoom: 13
      });
    } catch (error) {
      console.warn('Mapbox initialization failed (WebGL not available):', error);
      return;
    }

    if (!map.current) return;

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add neighborhood center marker with React icon
    const centerEl = document.createElement('div');
    centerEl.className = 'w-4 h-4 rounded-full bg-primary border-2 border-background shadow-md';
    
    new mapboxgl.Marker(centerEl)
      .setLngLat([centerLng, centerLat])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<div class="p-2 bg-background text-foreground"><strong class="text-sm">${neighborhoodName}</strong><br/><span class="text-xs text-muted-foreground">Neighborhood Center</span></div>`))
      .addTo(map.current);

    // Add healthcare facility markers with React icons
    facilities.forEach((facility) => {
      const distance = calculateDistance(centerLat, centerLng, facility.lat, facility.lng);
      
      const el = document.createElement('div');
      const root = createRoot(el);
      
      // Render lucide-react icon based on facility type
      let IconComponent = Pill;
      let colorClass = 'bg-emerald-500 dark:bg-emerald-600';
      let textColorClass = 'text-emerald-500 dark:text-emerald-400';
      
      if (facility.type === 'clinic') {
        IconComponent = Activity;
        colorClass = 'bg-blue-500 dark:bg-blue-600';
        textColorClass = 'text-blue-500 dark:text-blue-400';
      } else if (facility.type === 'hospital') {
        IconComponent = Cross;
        colorClass = 'bg-red-500 dark:bg-red-600';
        textColorClass = 'text-red-500 dark:text-red-400';
      }

      root.render(
        <div className={`w-8 h-8 rounded-full ${colorClass} border-2 border-background shadow-lg flex items-center justify-center cursor-pointer`}>
          <IconComponent className="w-4 h-4 text-white" />
        </div>
      );

      const popupContent = `
        <div class="p-3 min-w-[200px] bg-background text-foreground">
          <div class="font-semibold text-sm mb-2 ${textColorClass}">
            ${facility.name}
          </div>
          <div class="text-xs text-muted-foreground uppercase tracking-wide mb-2">
            ${facility.type}
          </div>
          <div class="text-xs text-foreground mb-1">
            ${facility.address}
          </div>
          ${facility.hours ? `<div class="text-xs text-muted-foreground mb-1">${facility.hours}</div>` : ''}
          ${facility.phone ? `<div class="text-xs text-muted-foreground mb-1">${facility.phone}</div>` : ''}
          <div class="text-sm font-semibold ${textColorClass} mt-2 pt-2 border-t border-border">
            ${distance.toFixed(2)} km away
          </div>
        </div>
      `;

      new mapboxgl.Marker(el)
        .setLngLat([facility.lng, facility.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25, className: 'healthcare-popup' }).setHTML(popupContent))
        .addTo(map.current as mapboxgl.Map);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [neighborhoodName, centerLat, centerLng, facilities]);

  if (!MAPBOX_TOKEN) {
    // Calculate facility stats for fallback view
    const pharmacyCount = facilities.filter(f => f.type === 'pharmacy').length;
    const clinicCount = facilities.filter(f => f.type === 'clinic').length;
    const hospitalCount = facilities.filter(f => f.type === 'hospital').length;

    const nearestFacility = facilities.reduce((nearest, facility) => {
      const distance = calculateDistance(centerLat, centerLng, facility.lat, facility.lng);
      if (!nearest || distance < nearest.distance) {
        return { facility, distance };
      }
      return nearest;
    }, null as { facility: HealthcareFacility; distance: number } | null);

    return (
      <Card data-testid="card-healthcare-map">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cross className="w-5 h-5 text-red-500 dark:text-red-400" />
            Healthcare Proximity Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Interactive map unavailable. Here's a summary of nearby healthcare facilities:
          </p>
          
          {/* Facility Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Pharmacies</p>
              <p className="text-2xl font-bold text-emerald-500 dark:text-emerald-400" data-testid="text-pharmacy-count">{pharmacyCount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Clinics</p>
              <p className="text-2xl font-bold text-blue-500 dark:text-blue-400" data-testid="text-clinic-count">{clinicCount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Hospitals</p>
              <p className="text-2xl font-bold text-red-500 dark:text-red-400" data-testid="text-hospital-count">{hospitalCount}</p>
            </div>
            {nearestFacility && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Nearest Facility</p>
                <p className="text-lg font-bold" data-testid="text-nearest-distance">
                  {nearestFacility.distance.toFixed(2)} km
                </p>
                <Badge variant="secondary" className="text-xs" data-testid="badge-nearest-name">
                  {nearestFacility.facility.name}
                </Badge>
              </div>
            )}
          </div>

          {/* Facility List */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">All Facilities</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {facilities.map((facility) => {
                const distance = calculateDistance(centerLat, centerLng, facility.lat, facility.lng);
                return (
                  <div key={facility.id} className="p-3 border rounded-md bg-muted/30 dark:bg-muted/10">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1">
                        {facility.type === 'pharmacy' && <Pill className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-0.5" />}
                        {facility.type === 'clinic' && <Activity className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5" />}
                        {facility.type === 'hospital' && <Cross className="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{facility.name}</p>
                          <p className="text-xs text-muted-foreground uppercase">{facility.type}</p>
                          <p className="text-xs text-muted-foreground mt-1">{facility.address}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        {distance.toFixed(2)} km
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate facility stats
  const pharmacyCount = facilities.filter(f => f.type === 'pharmacy').length;
  const clinicCount = facilities.filter(f => f.type === 'clinic').length;
  const hospitalCount = facilities.filter(f => f.type === 'hospital').length;

  const nearestFacility = facilities.reduce((nearest, facility) => {
    const distance = calculateDistance(centerLat, centerLng, facility.lat, facility.lng);
    if (!nearest || distance < nearest.distance) {
      return { facility, distance };
    }
    return nearest;
  }, null as { facility: HealthcareFacility; distance: number } | null);

  return (
    <Card data-testid="card-healthcare-map" className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Cross className="w-5 h-5 text-red-500" />
          Healthcare Proximity Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Stats Bar */}
        <div className="px-6 py-4 bg-muted/30 dark:bg-muted/10 border-b grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Pharmacies</p>
            <p className="text-2xl font-bold text-emerald-500 dark:text-emerald-400" data-testid="text-pharmacy-count">{pharmacyCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Clinics</p>
            <p className="text-2xl font-bold text-blue-500 dark:text-blue-400" data-testid="text-clinic-count">{clinicCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Hospitals</p>
            <p className="text-2xl font-bold text-red-500 dark:text-red-400" data-testid="text-hospital-count">{hospitalCount}</p>
          </div>
          {nearestFacility && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Nearest Facility</p>
              <p className="text-lg font-bold text-foreground" data-testid="text-nearest-distance">
                {nearestFacility.distance.toFixed(2)} km
              </p>
              <Badge variant="secondary" className="text-xs" data-testid="badge-nearest-name">
                {nearestFacility.facility.name}
              </Badge>
            </div>
          )}
        </div>

        {/* Map Container */}
        <div 
          ref={mapContainer} 
          style={{ height: '400px', width: '100%' }}
          data-testid="healthcare-map-container"
        />

        {/* Legend */}
        <div className="px-6 py-4 border-t bg-muted/20 dark:bg-muted/5">
          <p className="text-xs text-muted-foreground mb-3 font-semibold">Map Legend</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2" data-testid="legend-pharmacy">
              <div className="w-6 h-6 rounded-full bg-emerald-500 dark:bg-emerald-600 border-2 border-background flex items-center justify-center">
                <Pill className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Pharmacy</span>
            </div>
            <div className="flex items-center gap-2" data-testid="legend-clinic">
              <div className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-600 border-2 border-background flex items-center justify-center">
                <Activity className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Clinic</span>
            </div>
            <div className="flex items-center gap-2" data-testid="legend-hospital">
              <div className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-600 border-2 border-background flex items-center justify-center">
                <Cross className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Hospital</span>
            </div>
            <div className="flex items-center gap-2" data-testid="legend-center">
              <div className="w-4 h-4 rounded-full bg-primary border-2 border-background"></div>
              <span className="text-xs text-muted-foreground">Neighborhood Center</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
