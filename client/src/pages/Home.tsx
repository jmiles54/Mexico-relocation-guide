import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState } from "react";
import NeighborhoodCard from "@/components/NeighborhoodCard";
import heroImage from '@assets/stock_images/puerto_vallarta_mexi_37c839b6.jpg';
import zonaImage from '@assets/stock_images/zona_romantica_puert_63220432.jpg';
import versallesImage from '@assets/stock_images/versalles_neighborho_6f389286.jpg';
import marinaImage from '@assets/stock_images/marina_vallarta_yach_12d6d0ec.jpg';
import meridaImage from '@assets/stock_images/centro_merida_mexico_c24e5b95.jpg';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const featuredNeighborhoods = [
    {
      name: "Zona Romántica",
      city: "Puerto Vallarta",
      image: zonaImage,
      affordabilityScore: 72,
      rentPrice: "14,000 MXN",
      expatRating: 9,
      walkability: 9,
      beachDistance: "3 min walk"
    },
    {
      name: "Versalles",
      city: "Puerto Vallarta",
      image: versallesImage,
      affordabilityScore: 82,
      rentPrice: "7,800 MXN",
      expatRating: 6,
      walkability: 7,
      beachDistance: "25 min bus"
    },
    {
      name: "Marina Vallarta",
      city: "Puerto Vallarta",
      image: marinaImage,
      affordabilityScore: 65,
      rentPrice: "12,200 MXN",
      expatRating: 7,
      walkability: 6,
      beachDistance: "12 min walk"
    },
    {
      name: "Centro",
      city: "Mérida",
      image: meridaImage,
      affordabilityScore: 78,
      rentPrice: "8,500 MXN",
      expatRating: 8,
      walkability: 8
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Mexico Beach"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" data-testid="text-hero-title">
              Find Your Perfect Mexico Home
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Granular, neighborhood-level data for informed relocation decisions
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search cities, neighborhoods, or features..."
                    className="pl-10 h-12 bg-white/95 backdrop-blur"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search"
                  />
                </div>
                <Button
                  size="lg"
                  onClick={handleSearch}
                  className="h-12"
                  data-testid="button-search"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Neighborhoods - NOW FIRST! */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Featured Neighborhoods</h2>
          <p className="text-muted-foreground">
            Popular choices for expats with detailed cost and community data
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredNeighborhoods.map((neighborhood, index) => (
            <NeighborhoodCard key={index} {...neighborhood} />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Use Our Guide?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Move beyond vague city ratings to actionable, neighborhood-specific insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Transparent Data</h3>
                <p className="text-sm text-muted-foreground">
                  Every metric shows its source, timestamp, and methodology. No vague scores.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4">📹</div>
                <h3 className="text-xl font-semibold mb-2">Live Webcams</h3>
                <p className="text-sm text-muted-foreground">
                  See beaches, plazas, and neighborhoods in real-time before you visit.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2">Expat Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Wine bars, meetups, and social venues curated for mature relocators.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-primary to-secondary text-primary-foreground overflow-hidden">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Exploring?</h2>
            <p className="text-lg mb-8 opacity-90">
              Compare neighborhoods, view live data, and make informed decisions
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" variant="secondary" data-testid="button-explore-cities">
                Explore Cities
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur border-white/30 hover:bg-white/20" data-testid="button-compare">
                Compare Neighborhoods
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subtle Stats Footer */}
      <div className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">Cities Covered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">48</div>
              <div className="text-sm text-muted-foreground">Neighborhoods Indexed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">120+</div>
              <div className="text-sm text-muted-foreground">Expat Venues Mapped</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Live Data Feeds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
