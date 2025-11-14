import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Waves, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import NeighborhoodCard from "@/components/NeighborhoodCard";
import SocialProofBadge from '../components/SocialProofBadge';
import heroImage from '@assets/stock_images/puerto_vallarta_mexi_37c839b6.jpg';
import zonaImage from '@assets/stock_images/zona_romantica_puert_63220432.jpg';
import versallesImage from '@assets/stock_images/versalles_neighborho_6f389286.jpg';
import marinaImage from '@assets/stock_images/marina_vallarta_yach_12d6d0ec.jpg';
import pitillalImage from '@assets/stock_images/colorful_street_colo_1e0fdd01.jpg';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [citySentiments, setCitySentiments] = useState<Record<string, string>>({});

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const featuredNeighborhoods = [
    {
      name: "Zona Romántica",
      city: "Puerto Vallarta",
      cityId: "pv",
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
      cityId: "pv",
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
      cityId: "pv",
      image: marinaImage,
      affordabilityScore: 65,
      rentPrice: "12,200 MXN",
      expatRating: 7,
      walkability: 6,
      beachDistance: "12 min walk"
    },
    {
      name: "Pitillal",
      city: "Puerto Vallarta",
      cityId: "pv",
      image: pitillalImage,
      affordabilityScore: 88,
      rentPrice: "6,500 MXN",
      expatRating: 4,
      walkability: 5,
      beachDistance: "40 min bus"
    }
  ];

  const fetchAllSentiments = async () => {
    const citiesToFetch = Array.from(new Set(featuredNeighborhoods.map(n => n.city)));
    
    const results = await Promise.all(citiesToFetch.map(async (city) => {
      try {
        const response = await fetch('/api/city_sentiment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city })
        });
        const data = await response.json();
        return { city, label: data.label };
      } catch (error) {
        console.error(`Error fetching sentiment for ${city}:`, error);
        return { city, label: 'Local Favorite' };
      }
    }));

    const sentimentMap = results.reduce((acc, result) => {
      acc[result.city] = result.label;
      return acc;
    }, {} as Record<string, string>);

    setCitySentiments(sentimentMap);
  };

  useEffect(() => {
    fetchAllSentiments();
  }, []);

  const testimonials = [
    {
      text: "Now I have more friends in Vallarta than I ever have had in all my life",
      author: "Jay, Retiree"
    },
    {
      text: "Four years later, Puerto Vallarta feels more like home than anywhere else I've lived",
      author: "Digital Nomad from Toronto"
    },
    {
      text: "I used to pay double for half the space",
      author: "Toronto Expat"
    },
    {
      text: "After buying our condo, we have never been happier or so free of financial worries",
      author: "Retired Couple"
    },
    {
      text: "Street tacos under $2, 20-minute Uber rides for a few dollars",
      author: "Multiple Expats"
    },
    {
      text: "I have never looked back",
      author: "Meagan, Relocated 2013"
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
          {featuredNeighborhoods.map((neighborhood, index) => {
            const dynamicLabel = citySentiments[neighborhood.city];
            
            return (
              <div key={index} className="relative">
                {dynamicLabel && (
                  <SocialProofBadge label={dynamicLabel} />
                )}
                <NeighborhoodCard {...neighborhood} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What Expats Are Saying</h2>
            <p className="text-muted-foreground">
              Real experiences from people who made the move to Mexico
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-testimonial-${index}`}>
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  <p className="text-foreground italic mb-4">
                    "{testimonial.text}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    — {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Puerto Vallarta vs Sayulita Comparison */}
      <div className="py-16 bg-secondary/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Puerto Vallarta vs Sayulita</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Two popular expat destinations in Nayarit - choose the lifestyle that fits you best
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card data-testid="card-comparison-pv">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Puerto Vallarta</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Best For:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Mature expats seeking established community</li>
                      <li>Those who want urban amenities + beach access</li>
                      <li>Healthcare access (multiple hospitals)</li>
                      <li>Year-round international airport access</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cost of Living:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">1BR Furnished Rent</span>
                        <span className="font-semibold">6,500-14,000 MXN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Meal at Restaurant</span>
                        <span className="font-semibold">90-250 MXN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Budget</span>
                        <span className="font-semibold">25,000-45,000 MXN</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Lifestyle:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Urban Beach Town</Badge>
                      <Badge variant="outline">Wine Bars</Badge>
                      <Badge variant="outline">Walkable</Badge>
                      <Badge variant="outline">Cultural Events</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card data-testid="card-comparison-sayulita">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Waves className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Sayulita</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Best For:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Active expats (surfing, yoga, outdoor life)</li>
                      <li>Those seeking smaller village vibe</li>
                      <li>Digital nomads and younger crowd</li>
                      <li>Beach-centered lifestyle</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cost of Living:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">1BR Furnished Rent</span>
                        <span className="font-semibold">12,000-20,000 MXN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Meal at Restaurant</span>
                        <span className="font-semibold">120-300 MXN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Budget</span>
                        <span className="font-semibold">30,000-50,000 MXN</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Lifestyle:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Beach Village</Badge>
                      <Badge variant="outline">Surf Culture</Badge>
                      <Badge variant="outline">Bohemian</Badge>
                      <Badge variant="outline">Yoga Studios</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Both destinations are ~45 minutes apart by car. Many expats split time between both locations.
            </p>
            <Button variant="outline" data-testid="button-view-full-comparison">
              View Detailed Comparison
            </Button>
          </div>
        </div>
      </div>

      {/* Interactive Tools Section */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Interactive Decision Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our personalized tools to discover your ideal neighborhood and plan your move
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-elevate cursor-pointer" onClick={() => window.location.href = '/neighborhood-matcher'} data-testid="card-tool-matcher">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Neighborhood Matcher</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Answer a few questions and get personalized neighborhood recommendations based on your budget, lifestyle, and preferences.
                </p>
                <Button variant="outline" className="w-full" data-testid="button-start-matcher">
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate cursor-pointer" onClick={() => window.location.href = '/activities'} data-testid="card-tool-activities">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🍷</div>
                <h3 className="text-xl font-semibold mb-2">Activity Discovery</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Filter expat venues by demographics, interests, and events. Find your social scene before you arrive.
                </p>
                <Button variant="outline" className="w-full" data-testid="button-explore-venues">
                  Explore Venues
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate cursor-pointer" onClick={() => window.location.href = '/checklist'} data-testid="card-tool-checklist">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-semibold mb-2">Relocation Checklist</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Step-by-step timeline from 6 months before your move to your first month in Mexico.
                </p>
                <Button variant="outline" className="w-full" data-testid="button-view-checklist">
                  View Checklist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
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
