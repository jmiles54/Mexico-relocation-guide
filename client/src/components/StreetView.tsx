/// <reference types="google.maps" />
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StreetViewProps {
  lat: number;
  lng: number;
  heading?: number;
  pitch?: number;
  zoom?: number;
  title?: string;
}

export default function StreetView({
  lat,
  lng,
  heading = 0,
  pitch = 0,
  zoom = 1,
  title = "Street View"
}: StreetViewProps) {
  const streetViewRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (document.getElementById('google-maps-script')) {
        initializeStreetView();
        return;
      }

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        setError('Google Maps API key not found in environment variables');
        setIsLoading(false);
        return;
      }

      console.log('Loading Google Maps with API key:', apiKey.substring(0, 10) + '...');

      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeStreetView();
      script.onerror = () => {
        setError('Failed to load Google Maps API. Please check your API key configuration.');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    };

    const initializeStreetView = () => {
      if (!streetViewRef.current || !window.google) {
        setError('Google Maps API not available');
        setIsLoading(false);
        return;
      }

      try {
        const position = { lat, lng };

        const panorama = new google.maps.StreetViewPanorama(
          streetViewRef.current,
          {
            position,
            pov: {
              heading,
              pitch,
            },
            zoom,
            addressControl: false,
            enableCloseButton: false,
            fullscreenControl: true,
            motionTracking: true,
            motionTrackingControl: true,
          }
        );

        const streetViewService = new google.maps.StreetViewService();
        streetViewService.getPanorama(
          { location: position, radius: 50 },
          (data: google.maps.StreetViewPanoramaData | null, status: google.maps.StreetViewStatus) => {
            if (status === google.maps.StreetViewStatus.OK && data?.location?.latLng) {
              panorama.setPosition(data.location.latLng);
              setIsLoading(false);
              setError(null);
            } else if (status === google.maps.StreetViewStatus.ZERO_RESULTS) {
              setError('No Street View imagery available for this location');
              setIsLoading(false);
            } else {
              setError('Unable to load Street View panorama');
              setIsLoading(false);
            }
          }
        );

        google.maps.event.addListener(panorama, 'status_changed', () => {
          const status = panorama.getStatus();
          if (status === google.maps.StreetViewStatus.OK) {
            setIsLoading(false);
            setError(null);
          }
        });
      } catch (err) {
        console.error('Street View initialization error:', err);
        setError('Error initializing Street View. The API may not be enabled for this project.');
        setIsLoading(false);
      }
    };

    loadGoogleMapsScript();
  }, [lat, lng, heading, pitch, zoom]);

  if (error) {
    return (
      <Card className="overflow-hidden" data-testid="street-view-card">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Street View Unavailable</h3>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              {error.includes('API') && (
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md p-4 mb-4">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>Setup Required:</strong> To enable Street View, ensure the following APIs are activated in your Google Cloud Console:
                  </p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1 text-left">
                    <li>• Maps JavaScript API</li>
                    <li>• Street View Static API</li>
                  </ul>
                </div>
              )}
              <Button
                variant="outline"
                onClick={() => window.open(`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`, '_blank')}
                data-testid="button-open-google-maps"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Google Maps
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden" data-testid="street-view-card">
      <CardContent className="p-0">
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted z-20">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading Street View...</p>
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3 z-10 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-md border">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">{title}</span>
            </div>
          </div>
          <div
            ref={streetViewRef}
            className="w-full h-[500px]"
            data-testid="street-view-container"
          />
        </div>
      </CardContent>
    </Card>
  );
}
