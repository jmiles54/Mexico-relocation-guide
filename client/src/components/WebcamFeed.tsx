import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, MapPin, RefreshCw } from "lucide-react";
import { useState } from "react";

interface WebcamFeedProps {
  location: string;
  title: string;
  streamUrl?: string;
  isLive?: boolean;
  placeholderImage?: string;
}

export default function WebcamFeed({
  location,
  title,
  streamUrl,
  isLive = true,
  placeholderImage,
}: WebcamFeedProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    console.log('Refreshing webcam feed:', title);
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <Card className="overflow-hidden" data-testid={`webcam-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="relative">
        <div className="absolute top-3 right-3 z-10">
          {isLive && (
            <Badge className="bg-red-500 text-white border-red-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>LIVE</span>
              </div>
            </Badge>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 z-10">
          <div className="flex items-center gap-2 text-white text-sm">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{location}</span>
          </div>
        </div>
        
        <div className="aspect-video bg-slate-200 relative overflow-hidden">
          {placeholderImage ? (
            <img src={placeholderImage} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full bg-slate-100">
              <div className="text-center">
                <Video className="w-16 h-16 mx-auto mb-2 text-slate-400" />
                <p className="text-sm text-slate-500">Webcam feed placeholder</p>
                <p className="text-xs text-slate-400 mt-1">API integration ready</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-sm" data-testid={`text-webcam-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</h4>
            <p className="text-xs text-muted-foreground">Updated continuously</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleRefresh}
            disabled={refreshing}
            data-testid={`button-refresh-webcam-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
