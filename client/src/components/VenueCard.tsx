import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wine, Coffee, DollarSign } from "lucide-react";

interface VenueCardProps {
  name: string;
  category: "wine-bar" | "restaurant" | "cafe";
  address: string;
  priceRange: "$" | "$$" | "$$$";
  crowdDemographic: string;
  specialEvent?: string;
  image?: string;
  rating?: number;
}

export default function VenueCard({
  name,
  category,
  address,
  priceRange,
  crowdDemographic,
  specialEvent,
  image,
  rating,
}: VenueCardProps) {
  const getCategoryIcon = () => {
    switch (category) {
      case "wine-bar":
        return <Wine className="w-4 h-4" />;
      case "cafe":
        return <Coffee className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = () => {
    switch (category) {
      case "wine-bar":
        return "Wine Bar";
      case "cafe":
        return "Café";
      default:
        return "Restaurant";
    }
  };

  return (
    <Card className="hover-elevate cursor-pointer transition-all" data-testid={`card-venue-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      {image && (
        <div className="h-32 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base" data-testid={`text-venue-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>{name}</h3>
          {rating && (
            <Badge variant="outline" className="text-xs">
              ⭐ {rating}
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            {getCategoryIcon()}
            <span>{getCategoryLabel()}</span>
            <span className="mx-1">•</span>
            <span className="font-mono">{priceRange}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{address}</span>
          </div>
          
          <div className="pt-2">
            <Badge className="bg-purple-100 text-purple-800 border-purple-300 text-xs">
              {crowdDemographic}
            </Badge>
          </div>
          
          {specialEvent && (
            <div className="pt-2 mt-2 border-t">
              <p className="text-xs text-primary font-medium">
                📅 {specialEvent}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
