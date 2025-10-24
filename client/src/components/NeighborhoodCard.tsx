import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MapPin, DollarSign, Users, Footprints, Info, Waves } from "lucide-react";
import { Link } from "wouter";
import RotatingQuotes from "./RotatingQuotes";

interface NeighborhoodCardProps {
  name: string;
  city: string;
  image?: string;
  webcamUrl?: string;
  affordabilityScore: number;
  rentPrice: string;
  expatRating: number;
  walkability: number;
  beachDistance?: string;
}

export default function NeighborhoodCard({
  name,
  city,
  image,
  webcamUrl,
  affordabilityScore,
  rentPrice,
  expatRating,
  walkability,
  beachDistance,
}: NeighborhoodCardProps) {
  const getAffordabilityColor = (score: number) => {
    if (score >= 70) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 40) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <Link href="/neighborhood/zona-romantica">
      <Card className="overflow-hidden hover-elevate cursor-pointer transition-all" data-testid={`card-neighborhood-${name.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="relative h-48 overflow-visible">
          {webcamUrl ? (
            <div className="relative h-48 overflow-hidden">
              <iframe
                src={webcamUrl}
                className="w-full h-full border-0 pointer-events-none"
                title={`${name} Live Webcam`}
                allow="autoplay; accelerometer; gyroscope; picture-in-picture"
                loading="eager"
                sandbox="allow-scripts allow-same-origin"
              />
              <RotatingQuotes />
              <div className="absolute top-3 right-3 z-10">
                <Badge className={`${getAffordabilityColor(affordabilityScore)} border`}>
                  Score: {affordabilityScore}
                </Badge>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
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
                <span>1BR Furnished</span>
              </div>
              <span className="font-mono font-semibold" data-testid={`text-rent-${name.toLowerCase().replace(/\s+/g, '-')}`}>{rentPrice}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Expat Community</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3 h-3 cursor-help" data-testid="icon-expat-info" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">
                      Based on: # of expat venues, weekly meetup frequency, 
                      Facebook group size, and English-speaking density. 
                      Updated monthly from community surveys.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-semibold">{expatRating}/10</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Footprints className="w-4 h-4" />
                <span>Walkability</span>
              </div>
              <span className="font-semibold">{walkability}/10</span>
            </div>
            
            {beachDistance && (
              <div className="pt-2 border-t flex items-center gap-1">
                <Waves className="w-3 h-3 text-primary" />
                <span className="text-primary text-xs font-medium">
                  {beachDistance} to beach
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
