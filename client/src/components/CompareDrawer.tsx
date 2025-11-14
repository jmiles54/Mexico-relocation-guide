import { X, Heart, ChevronRight, Scale } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const CITY_METRICS: Record<string, any> = {
  pv: {
    name: "Puerto Vallarta",
    rent: "High ($1200+)",
    walkability: 9,
    safety: "Moderate",
    seniorScore: 88,
    vibe: "Vibrant Beach",
  },
  merida: {
    name: "Mérida",
    rent: "Low ($600-$900)",
    walkability: 7,
    safety: "High",
    seniorScore: 92,
    vibe: "Historic Colonial",
  },
  sma: {
    name: "San Miguel de Allende",
    rent: "High ($1000+)",
    walkability: 8,
    safety: "Moderate-High",
    seniorScore: 85,
    vibe: "Artistic & Cultural",
  },
  cancun: {
    name: "Cancún",
    rent: "Varied ($800+)",
    walkability: 5,
    safety: "Varied/Tourist",
    seniorScore: 75,
    vibe: "Tropical Resort",
  },
};

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompareDrawer({ isOpen, onClose }: CompareDrawerProps) {
  const { favorites, toggleFavorite } = useFavorites();

  if (!isOpen || favorites.length === 0) return null;

  const favoriteCities = favorites.map(id => ({ 
    id, 
    ...CITY_METRICS[id] 
  }));

  const metricsKeys = Object.keys(favoriteCities[0] || {}).filter(key => key !== 'name' && key !== 'id');

  return (
    <div 
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm transition-opacity duration-300 flex flex-col p-6"
      data-testid="compare-drawer"
    >
      <div className="flex justify-between items-center mb-6 border-b border-border/50 pb-4">
        <h2 className="text-3xl font-extrabold flex items-center gap-2 text-primary">
          <Scale className="w-6 h-6" />
          Compare {favorites.length} Saved Cities
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-drawer">
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${favorites.length + 1}, minmax(0, 1fr))` }}>
          
          <Card className="p-4 bg-muted/20 sticky top-0 h-full">
            <h3 className="text-lg font-bold mb-4">Metric</h3>
            <div className="space-y-4">
              {metricsKeys.map(key => (
                <div key={key} className="h-12 flex items-center font-semibold text-foreground/80 capitalize" data-testid={`metric-label-${key}`}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </div>
              ))}
            </div>
          </Card>

          {favoriteCities.map((city) => (
            <Card key={city.id} className="p-4 relative flex flex-col" data-testid={`city-column-${city.id}`}>
              <div className="mb-4">
                <h3 className="text-xl font-extrabold text-primary" data-testid={`city-name-${city.id}`}>{city.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Button variant="outline" size="sm" onClick={() => toggleFavorite(city.id)} data-testid={`remove-favorite-${city.id}`}>
                    <Heart className="w-4 h-4 fill-red-500 mr-1" /> Remove
                  </Button>
                  <Button variant="link" size="sm" asChild>
                    <a href={`/neighborhood/${city.id}`} className="text-blue-400" data-testid={`view-details-${city.id}`}>
                      View Details <ChevronRight className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 flex-1">
                {metricsKeys.map(key => (
                  <div key={key} className="h-12 flex items-center text-lg font-bold" data-testid={`metric-value-${city.id}-${key}`}>
                    {city[key]}
                  </div>
                ))}
              </div>
            </Card>
          ))}

        </div>
      </div>
      
      <div className="mt-6 p-4 border-t border-border/50 text-center">
        <p className="text-sm text-muted-foreground">Tip: Add up to 3 cities to your favorites (using the heart icon) to compare them here.</p>
      </div>
    </div>
  );
}
