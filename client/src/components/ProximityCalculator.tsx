import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock } from "lucide-react";

interface ProximityItem {
  name: string;
  type: "beach" | "plaza" | "venue" | "charco";
  distance: string;
  walkTime?: string;
  transitTime?: string;
}

interface ProximityCalculatorProps {
  neighborhoodName: string;
  items: ProximityItem[];
}

export default function ProximityCalculator({
  neighborhoodName,
  items,
}: ProximityCalculatorProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "beach":
        return "🏖️";
      case "plaza":
        return "🏛️";
      case "venue":
        return "🍷";
      case "charco":
        return "💧";
      default:
        return "📍";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "beach":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Beach</Badge>;
      case "plaza":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300">Plaza</Badge>;
      case "venue":
        return <Badge className="bg-pink-100 text-pink-800 border-pink-300">Venue</Badge>;
      case "charco":
        return <Badge className="bg-cyan-100 text-cyan-800 border-cyan-300">Natural Pool</Badge>;
      default:
        return <Badge variant="outline">Location</Badge>;
    }
  };

  const handleViewMap = (name: string) => {
    console.log('Opening map for:', name);
  };

  return (
    <Card data-testid="card-proximity">
      <CardHeader>
        <CardTitle>Proximity to Key Locations - {neighborhoodName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
              data-testid={`proximity-item-${index}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="text-3xl">{getTypeIcon(item.type)}</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1" data-testid={`text-proximity-name-${index}`}>
                    {item.name}
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeBadge(item.type)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Navigation className="w-4 h-4" />
                    <span data-testid={`text-distance-${index}`}>{item.distance}</span>
                  </div>
                  {item.walkTime && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      <span>🚶 {item.walkTime}</span>
                    </div>
                  )}
                  {item.transitTime && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      <span>🚌 {item.transitTime}</span>
                    </div>
                  )}
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewMap(item.name)}
                  data-testid={`button-view-map-${index}`}
                >
                  View Map
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
