import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import WeatherWidget from "@/components/WeatherWidget";
import CostBreakdown from "@/components/CostBreakdown";
import VenueCard from "@/components/VenueCard";
import WebcamFeed from "@/components/WebcamFeed";
import ProximityCalculator from "@/components/ProximityCalculator";
import MetricCard from "@/components/MetricCard";
import { DollarSign, Users, Shield, Sun } from "lucide-react";
import zonaImage from '@assets/generated_images/Zona_Romantica_neighborhood_street_d505923a.png';
import wineBarImage from '@assets/generated_images/Expat_wine_bar_scene_f31e2caf.png';
import beachImage from '@assets/generated_images/Puerto_Vallarta_beach_hero_image_a9e31d9a.png';

export default function Neighborhood() {
  const [activeTab, setActiveTab] = useState("overview");

  const costItems = [
    {
      category: "Housing",
      item: "1BR Furnished Apartment",
      price: "14,000",
      comparison: "18% above avg",
      source: "FB Marketplace",
      lastUpdated: "Oct 2025"
    },
    {
      category: "Food",
      item: "Weekly Groceries",
      price: "1,200",
      comparison: "5% above avg",
      source: "User survey",
      lastUpdated: "Oct 2025"
    },
    {
      category: "Food",
      item: "Menu del Día",
      price: "90",
      comparison: "Average",
      source: "Restaurant data",
      lastUpdated: "Oct 2025"
    },
    {
      category: "Transportation",
      item: "Local Bus Ride",
      price: "12",
      comparison: "Standard rate",
      source: "City transit",
      lastUpdated: "Oct 2025"
    }
  ];

  const proximityItems = [
    {
      name: "Playa Olas Altas",
      type: "beach" as const,
      distance: "400m",
      walkTime: "3 min walk",
    },
    {
      name: "Elixir Wine Bar",
      type: "venue" as const,
      distance: "600m",
      walkTime: "8 min walk",
    },
    {
      name: "Los Arcos Natural Pool",
      type: "charco" as const,
      distance: "12km",
      transitTime: "25 min drive",
    }
  ];

  const forecast = [
    { day: "Mon", high: 32, low: 24, condition: "sunny" as const },
    { day: "Tue", high: 31, low: 23, condition: "sunny" as const },
    { day: "Wed", high: 30, low: 24, condition: "cloudy" as const },
    { day: "Thu", high: 29, low: 23, condition: "rainy" as const },
    { day: "Fri", high: 31, low: 24, condition: "sunny" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with breadcrumb */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" className="mb-2" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Puerto Vallarta
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2" data-testid="text-neighborhood-title">Zona Romántica</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                <span>Puerto Vallarta, Jalisco</span>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  Affordability: 72/100
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                  Expat Friendly: 9/10
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 h-auto" data-testid="tabs-navigation">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-overview">
              Overview
            </TabsTrigger>
            <TabsTrigger value="costs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-costs">
              Costs
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-social">
              Social Scene
            </TabsTrigger>
            <TabsTrigger value="safety" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-safety">
              Safety
            </TabsTrigger>
            <TabsTrigger value="webcams" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-webcams">
              Live Views
            </TabsTrigger>
            <TabsTrigger value="proximity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-proximity">
              Proximity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                icon={DollarSign}
                label="Affordability"
                value={72}
                trend="18% better than avg"
                trendDirection="up"
                variant="success"
              />
              <MetricCard
                icon={Users}
                label="Expat Community"
                value="9/10"
                trend="Very active"
                variant="default"
              />
              <MetricCard
                icon={Shield}
                label="Safety Rating"
                value={81}
                trend="High"
                variant="success"
              />
              <MetricCard
                icon={Sun}
                label="Climate"
                value="30°C"
                trend="Tropical"
                variant="warning"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeatherWidget
                location="Zona Romántica"
                currentTemp={30}
                condition="sunny"
                humidity={65}
                windSpeed={12}
                forecast={forecast}
              />
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Neighborhood Highlights</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">🏖️ Beach Access</h4>
                      <p className="text-muted-foreground">
                        3-minute walk to Playa Olas Altas. Prime beachfront location with easy access to all coastal activities.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">👥 Expat Community</h4>
                      <p className="text-muted-foreground">
                        Highly active expat scene with 9 weekly meetups, wine bars, and social venues popular with 50+ crowd.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">🍽️ Dining Scene</h4>
                      <p className="text-muted-foreground">
                        Mix of local fondas (90 MXN menu del día) and upscale restaurants. Easy walking to all amenities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <img
                  src={zonaImage}
                  alt="Zona Romántica street view"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs">
            <CostBreakdown neighborhoodName="Zona Romántica" items={costItems} />
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Expat Social Venues</h2>
              <p className="text-muted-foreground mb-6">
                Wine bars, restaurants, and cafés popular with the expat community
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VenueCard
                  name="Elixir Wine Bar"
                  category="wine-bar"
                  address="Calle Basilio Badillo 289"
                  priceRange="$$"
                  crowdDemographic="50+ Mature Expats"
                  specialEvent="Wine Mondays 6-9pm"
                  image={wineBarImage}
                  rating={4.8}
                />
                <VenueCard
                  name="La Copa Wine Bar"
                  category="wine-bar"
                  address="Pulpito 102"
                  priceRange="$$"
                  crowdDemographic="Ladies Night Thursdays"
                  specialEvent="Reserve tasting: 210 MXN"
                  image={wineBarImage}
                  rating={4.6}
                />
                <VenueCard
                  name="A Page in the Sun"
                  category="cafe"
                  address="Olas Altas 399"
                  priceRange="$"
                  crowdDemographic="60% English speakers"
                  specialEvent="Book club Wednesdays"
                  rating={4.7}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="safety">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Safety & Healthcare</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Safety Score: 81/100</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Night Safety</span>
                        <span className="font-semibold">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tourist Area</span>
                        <span className="font-semibold">Very Safe</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Police Presence</span>
                        <span className="font-semibold">Regular Patrols</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Healthcare Access</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nearest Hospital</span>
                        <span className="font-semibold">1.2 km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">English-Speaking Doctors</span>
                        <span className="font-semibold">Available</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pharmacies</span>
                        <span className="font-semibold">5 within 500m</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Safety data sourced from local police reports and expat community surveys.
                    Last updated: October 2025
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webcams" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Live Webcam Feeds</h2>
              <p className="text-muted-foreground mb-6">
                See real-time views of beaches, plazas, and key locations
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WebcamFeed
                  location="Zona Romántica"
                  title="Playa Olas Altas"
                  isLive={true}
                  placeholderImage={beachImage}
                />
                <WebcamFeed
                  location="Downtown"
                  title="Malecón Boardwalk"
                  isLive={true}
                  placeholderImage={beachImage}
                />
                <WebcamFeed
                  location="Marina Vallarta"
                  title="Marina Beach View"
                  isLive={false}
                  placeholderImage={beachImage}
                />
                <WebcamFeed
                  location="South Beach"
                  title="Conchas Chinas"
                  isLive={true}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="proximity">
            <ProximityCalculator
              neighborhoodName="Zona Romántica"
              items={proximityItems}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
