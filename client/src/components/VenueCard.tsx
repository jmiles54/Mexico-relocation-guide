import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Calendar, DollarSign } from "lucide-react";

interface VenueCardProps {
  id: number;
  name: string;
  category: "wine-bar" | "cafe" | "restaurant";
  address: string;
  priceRange: "$" | "$$" | "$$$";
  crowdDemographic: string;
  specialEvent: string;
  image?: string;
  rating: number;
  tags: string[];
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
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "wine-bar":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "cafe":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "restaurant":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "wine-bar":
        return "Wine Bar";
      case "cafe":
        return "Café";
      case "restaurant":
        return "Restaurant";
      default:
        return cat;
    }
  };

  return (
    <Card className="overflow-hidden hover-elevate cursor-pointer transition-all" data-testid={`card-venue-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      {image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge className={`${getCategoryColor(category)} border`}>
              {getCategoryLabel(category)}
            </Badge>
          </div>
        </div>
      )}
      <CardContent className={image ? "p-4" : "p-5"}>
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-lg font-semibold text-foreground" data-testid={`text-venue-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
              {name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{rating}</span>
            </div>
          </div>
          {!image && (
            <Badge className={`${getCategoryColor(category)} border text-xs mb-2`}>
              {getCategoryLabel(category)}
            </Badge>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{address}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>Price Range</span>
            </div>
            <span className="font-semibold">{priceRange}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Typical Crowd</span>
            </div>
            <span className="font-semibold text-xs text-right max-w-[140px]">{crowdDemographic}</span>
          </div>
          
          {specialEvent && (
            <div className="pt-2 border-t">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-xs text-primary font-medium leading-tight">
                  {specialEvent}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
