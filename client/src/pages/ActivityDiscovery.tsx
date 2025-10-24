import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenueCard from "@/components/VenueCard";
import { Filter } from "lucide-react";
import wineBarImage from '@assets/stock_images/wine_bar_restaurant__5c42922c.jpg';

export default function ActivityDiscovery() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
    console.log('Filters updated:', activeFilters);
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  // Mock venue data with demographics
  const venues = [
    {
      id: 1,
      name: "Elixir Wine Bar",
      category: "wine-bar" as const,
      address: "Calle Basilio Badillo 289",
      priceRange: "$$" as const,
      crowdDemographic: "50+ Mature Expats",
      specialEvent: "Wine Mondays 6-9pm",
      image: wineBarImage,
      rating: 4.8,
      tags: ["50+", "wine", "evening", "english"]
    },
    {
      id: 2,
      name: "La Copa Wine Bar",
      category: "wine-bar" as const,
      address: "Pulpito 102",
      priceRange: "$$" as const,
      crowdDemographic: "Women 50+ Thursdays",
      specialEvent: "Ladies Night - Reserve tasting: 210 MXN",
      image: wineBarImage,
      rating: 4.6,
      tags: ["50+", "women", "wine", "evening"]
    },
    {
      id: 3,
      name: "A Page in the Sun",
      category: "cafe" as const,
      address: "Olas Altas 399",
      priceRange: "$" as const,
      crowdDemographic: "60% English speakers",
      specialEvent: "Book club Wednesdays",
      rating: 4.7,
      tags: ["english", "book-club", "daytime", "coffee"]
    },
    {
      id: 4,
      name: "Mercado Emiliano Zapata",
      category: "restaurant" as const,
      address: "Av. Emiliano Zapata",
      priceRange: "$" as const,
      crowdDemographic: "100% Local - Minimal English",
      specialEvent: "Fresh seafood daily",
      rating: 4.9,
      tags: ["local", "authentic", "affordable", "lunch"]
    },
    {
      id: 5,
      name: "Café de Olla",
      category: "cafe" as const,
      address: "Calle Lázaro Cárdenas 234",
      priceRange: "$" as const,
      crowdDemographic: "Mixed - 40% Expats",
      specialEvent: "Spanish practice group Fridays",
      rating: 4.5,
      tags: ["language-learning", "morning", "coffee", "balanced"]
    },
    {
      id: 6,
      name: "Vino & Amigos",
      category: "wine-bar" as const,
      address: "Zona Romántica",
      priceRange: "$$" as const,
      crowdDemographic: "Couples 45+",
      specialEvent: "Live jazz Saturdays",
      image: wineBarImage,
      rating: 4.7,
      tags: ["couples", "45+", "music", "evening"]
    }
  ];

  const filteredVenues = venues.filter(venue => {
    if (activeFilters.length === 0) return true;
    return activeFilters.some(filter => venue.tags.includes(filter));
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-activity-title">Activity Discovery</h1>
          <p className="text-muted-foreground">
            Find venues and events curated by demographic and interest
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Filter by Interest</h2>
            </div>
            {activeFilters.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} data-testid="button-clear-filters">
                Clear all
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={activeFilters.includes("50+") ? "default" : "outline"}
              className="cursor-pointer hover-elevate"
              onClick={() => toggleFilter("50+")}
              data-testid="filter-50plus"
            >
              50+ Crowd
            </Badge>
            <Badge
              variant={activeFilters.includes("women") ? "default" : "outline"}
              className="cursor-pointer hover-elevate"
              onClick={() => toggleFilter("women")}
              data-testid="filter-women"
            >
              Women's Groups
            </Badge>
            <Badge
              variant={activeFilters.includes("couples") ? "default" : "outline"}
              className="cursor-pointer hover-elevate"
              onClick={() => toggleFilter("couples")}
              data-testid="filter-couples"
            >
              Couples
            </Badge>
            <Badge
              variant={activeFilters.includes("english") ? "default" : "outline"}
              className="cursor-pointer hover-elevate"
              onClick={() => toggleFilter("english")}
              data-testid="filter-english"
            >
              English-Friendly
            </Badge>
            <Badge
              variant={activeFilters.includes("local") ? "default" : "outline"}
              className="cursor-pointer hover-elevate"
              onClick={() => toggleFilter("local")}
              data-testid="filter-local"
            >
              Authentic Local
            </Badge>
            <Badge
              variant={activeFilters.includes("wine") ? "default" : "outline"}
              className="cursor-pointer hover-elevate"
              onClick={() => toggleFilter("wine")}
              data-testid="filter-wine"
            >
              Wine Lovers
            </Badge>
            <Badge
              variant={activeFilters.includes("book-club") ? "default" : "outline"}
              className="cursor-pointer hover-elevate"
              onClick={() => toggleFilter("book-club")}
              data-testid="filter-book-club"
            >
              Book Clubs
            </Badge>
            <Badge
              variant={activeFilters.includes("language-learning") ? "default" : "outline"}
              className="cursor-pointer hover-elevate"
              onClick={() => toggleFilter("language-learning")}
              data-testid="filter-language"
            >
              Language Practice
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList data-testid="tabs-venue-type">
            <TabsTrigger value="all">All Venues</TabsTrigger>
            <TabsTrigger value="wine-bars">Wine Bars</TabsTrigger>
            <TabsTrigger value="cafes">Cafés</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredVenues.length} of {venues.length} venues
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard key={venue.id} {...venue} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wine-bars">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues
                .filter(v => v.category === "wine-bar")
                .map((venue) => (
                  <VenueCard key={venue.id} {...venue} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="cafes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues
                .filter(v => v.category === "cafe")
                .map((venue) => (
                  <VenueCard key={venue.id} {...venue} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="restaurants">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues
                .filter(v => v.category === "restaurant")
                .map((venue) => (
                  <VenueCard key={venue.id} {...venue} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredVenues.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No venues match your selected filters. Try adjusting your criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
