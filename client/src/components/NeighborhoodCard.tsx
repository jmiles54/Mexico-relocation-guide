import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Users, Sun } from "lucide-react";

interface NeighborhoodCardProps {
  name: string;
  city: string;
  image: string;
  affordabilityScore: number;
  rentPrice: string;
  expatRating: number;
  climate: string;
  beachDistance?: string;
}

export default function NeighborhoodCard({
  name,
  city,
  image,
  affordabilityScore,
  rentPrice,
  expatRating,
  climate,
  beachDistance,
}: NeighborhoodCardProps) {
  const getAffordabilityColor = (score: number) => {
    if (score >= 70) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 40) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <Card className="overflow-hidden hover-elevate cursor-pointer transition-all" data-testid={`card-neighborhood-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className={`${getAffordabilityColor(affordabilityScore)} border`}>
            Score: {affordabilityScore}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground" data-testid={`text-neighborhood-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            {name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{city}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>1BR Rent</span>
            </div>
            <span className="font-mono font-semibold" data-testid={`text-rent-${name.toLowerCase().replace(/\s+/g, '-')}`}>{rentPrice}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Expat Community</span>
            </div>
            <span className="font-semibold">{expatRating}/10</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sun className="w-4 h-4" />
              <span>Climate</span>
            </div>
            <span className="font-semibold">{climate}</span>
          </div>
          
          {beachDistance && (
            <div className="pt-2 border-t">
              <span className="text-primary text-xs font-medium">
                🏖️ {beachDistance} to beach
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
