import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, ArrowLeft, Waves, Users, Coffee, DollarSign, Shield, Sun, Video, ExternalLink, Heart, Zap, Scale, TrendingUp, Thermometer, ChevronRight, Mountain, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import WeatherWidget from "@/components/WeatherWidget";
import CostBreakdown from "@/components/CostBreakdown";
import VenueCard from "@/components/VenueCard";
import WebcamFeed from "@/components/WebcamFeed";
import ProximityCalculator from "@/components/ProximityCalculator";
import MetricCard from "@/components/MetricCard";
import MapView from "@/components/MapView";
import StreetView from "@/components/StreetView";
import BudgetEngine from "@/components/BudgetEngine";
import HealthcareMap from "@/components/HealthcareMap";
import { useFavorites } from '@/hooks/useFavorites';
import zonaImage from '@assets/stock_images/colorful_street_colo_1e0fdd01.jpg';
import wineBarImage from '@assets/stock_images/wine_bar_restaurant__5c42922c.jpg';
import beachImage from '@assets/stock_images/puerto_vallarta_mexi_37c839b6.jpg';

export default function Neighborhood() {
  const [activeTab, setActiveTab] = useState("overview");
  const [seniorScoreLoading, setSeniorScoreLoading] = useState(false);
  const [seniorScoreData, setSeniorScoreData] = useState<{score: number; justification: string} | null>(null);
  const [seniorScoreError, setSeniorScoreError] = useState<string | null>(null);
  const [eventLoading, setEventLoading] = useState(false);
  const [eventData, setEventData] = useState<{headline: string; description: string} | null>(null);
  const [heroLoading, setHeroLoading] = useState(false);
  const [heroData, setHeroData] = useState<{subHeadline: string; insight: string} | null>(null);
  const [sentimentLoading, setSentimentLoading] = useState(false);
  const [sentimentData, setSentimentData] = useState<{score: number; summary: string} | null>(null);
  const [climateLoading, setClimateLoading] = useState(false);
  const [climateData, setClimateData] = useState<{fitScore: number; justification: string} | null>(null);
  const [maxTempInput, setMaxTempInput] = useState('85');
  const [minTempInput, setMinTempInput] = useState('65');
  const [humidityInput, setHumidityInput] = useState('Low');
  const [climateError, setClimateError] = useState<string | null>(null);
  const [accessibilityLoading, setAccessibilityLoading] = useState(false);
  const [accessibilityData, setAccessibilityData] = useState<{
    accessibilityScore: number;
    terrainType: string;
    inclineDescription: string;
    benchFrequency: string;
    restSpotDetails: string;
  } | null>(null);
  const [accessibilityError, setAccessibilityError] = useState<string | null>(null);
  const [safetyLoading, setSafetyLoading] = useState(false);
  const [safetyData, setSafetyData] = useState<{
    safetyScore: number;
    safetyLevel: string;
    crimeProfile: string;
    recommendations: string;
  } | null>(null);
  const [safetyError, setSafetyError] = useState<string | null>(null);
  
  const neighborhood = {
    cityId: 'pv' as const,
    name: 'Zona Romántica',
    city: 'Puerto Vallarta',
    state: 'Jalisco',
    centerLat: 20.6075,
    centerLng: -105.2375
  };

  // Healthcare facilities near Zona Romántica, Puerto Vallarta
  const healthcareFacilities = [
    {
      id: 1,
      name: 'Farmacia Guadalajara',
      type: 'pharmacy' as const,
      lat: 20.6095,
      lng: -105.2355,
      address: 'Calle Francisca Rodríguez 136',
      hours: '7:00 AM - 11:00 PM',
      phone: '+52 322 222 0000'
    },
    {
      id: 2,
      name: 'Farmacia Similares',
      type: 'pharmacy' as const,
      lat: 20.6050,
      lng: -105.2340,
      address: 'Av. Olas Altas 425',
      hours: '24 Hours',
      phone: '+52 322 223 1111'
    },
    {
      id: 3,
      name: 'CMQ Premier Hospital',
      type: 'hospital' as const,
      lat: 20.6180,
      lng: -105.2450,
      address: 'Av. Los Tules 136',
      hours: '24 Hours Emergency',
      phone: '+52 322 226 6500'
    },
    {
      id: 4,
      name: 'Hospital Joya Marina',
      type: 'hospital' as const,
      lat: 20.6220,
      lng: -105.2520,
      address: 'Blvd. Francisco Medina Ascencio 2760',
      hours: '24 Hours Emergency',
      phone: '+52 322 226 1010'
    },
    {
      id: 5,
      name: 'Clinica Vida',
      type: 'clinic' as const,
      lat: 20.6065,
      lng: -105.2390,
      address: 'Calle Basilio Badillo 365',
      hours: '9:00 AM - 8:00 PM',
      phone: '+52 322 222 3456'
    },
    {
      id: 6,
      name: 'Centro Médico Urgencias',
      type: 'clinic' as const,
      lat: 20.6110,
      lng: -105.2410,
      address: 'Calle Insurgentes 175',
      hours: '8:00 AM - 10:00 PM',
      phone: '+52 322 223 7890'
    },
    {
      id: 7,
      name: 'Farmacia del Ahorro',
      type: 'pharmacy' as const,
      lat: 20.6130,
      lng: -105.2400,
      address: 'Av. Francisco Villa 1260',
      hours: '6:00 AM - 12:00 AM',
      phone: '+52 322 222 5555'
    },
    {
      id: 8,
      name: 'Clinica Hospital San Javier Marina',
      type: 'clinic' as const,
      lat: 20.6250,
      lng: -105.2580,
      address: 'Blvd. Francisco Medina Ascencio 2760',
      hours: '24 Hours',
      phone: '+52 322 226 1010'
    }
  ];
  
  const { isFavorite, toggleFavorite, favorites } = useFavorites();
  const favorite = isFavorite(neighborhood.cityId);

  const getSeniorScore = async () => {
    setSeniorScoreLoading(true);
    setSeniorScoreError(null);
    setSeniorScoreData(null);

    try {
      const response = await fetch('/api/senior_score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: neighborhood.city })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setSeniorScoreError(data.error || 'Failed to fetch score.');
        return;
      }

      setSeniorScoreData(data);

    } catch (error) {
      console.error('Fetch error:', error);
      setSeniorScoreError('Connection Error. Please try again.');
    } finally {
      setSeniorScoreLoading(false);
    }
  };

  const getSeasonalContent = async () => {
    setEventLoading(true);

    try {
      const response = await fetch('/api/seasonal_content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: neighborhood.city })
      });
      
      const data = await response.json();
      if (response.ok && !data.error) {
        setEventData(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setEventLoading(false);
    }
  };

  const getNeighborhoodHero = async () => {
    setHeroLoading(true);

    try {
      const response = await fetch('/api/neighborhood_hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          city: neighborhood.city, 
          neighborhoodName: neighborhood.name
        })
      });
      
      const data = await response.json();
      if (response.ok && !data.error) {
        setHeroData(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setHeroLoading(false);
    }
  };

  const getExpatSentiment = async () => {
    setSentimentLoading(true);

    try {
      const response = await fetch('/api/expat_sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: neighborhood.city })
      });

      const data = await response.json();
      if (response.ok && !data.error) {
        setSentimentData(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setSentimentLoading(false);
    }
  };

  const calculateClimateFit = async () => {
    setClimateLoading(true);
    setClimateError(null);
    setClimateData(null);

    try {
      const response = await fetch('/api/climate_fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          city: neighborhood.city,
          maxTemp: maxTempInput,
          minTemp: minTempInput,
          humidityPreference: humidityInput,
        })
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to calculate climate fit.');
      }
      
      setClimateData(data);

    } catch (error: any) {
      setClimateError(error.message || 'Error connecting to climate engine.');
    } finally {
      setClimateLoading(false);
    }
  };

  const getAccessibilityScore = async () => {
    setAccessibilityLoading(true);
    setAccessibilityError(null);

    try {
      const response = await fetch('/api/accessibility_score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          city: neighborhood.city,
          neighborhood: neighborhood.name
        })
      });

      const data = await response.json();
      
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to load accessibility data');
      }
      
      setAccessibilityData(data);
      setAccessibilityError(null);
    } catch (error: any) {
      console.error('Accessibility fetch error:', error);
      setAccessibilityError(error.message || 'Unable to load accessibility analysis. Please try again.');
      setAccessibilityData(null);
    } finally {
      setAccessibilityLoading(false);
    }
  };

  const getSafetyRating = async () => {
    setSafetyLoading(true);
    setSafetyError(null);

    try {
      const response = await fetch('/api/safety_rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          city: neighborhood.city,
          neighborhood: neighborhood.name
        })
      });

      const data = await response.json();
      
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to load safety data');
      }
      
      setSafetyData(data);
      setSafetyError(null);
    } catch (error: any) {
      console.error('Safety rating fetch error:', error);
      setSafetyError(error.message || 'Unable to load safety analysis. Please try again.');
      setSafetyData(null);
    } finally {
      setSafetyLoading(false);
    }
  };

  useEffect(() => {
    if (!eventData && !eventLoading) {
      getSeasonalContent();
    }
    if (!heroData && !heroLoading) {
      getNeighborhoodHero();
    }
    if (!sentimentData && !sentimentLoading) {
      getExpatSentiment();
    }
    if (!accessibilityData && !accessibilityLoading) {
      getAccessibilityScore();
    }
    if (!safetyData && !safetyLoading) {
      getSafetyRating();
    }
  }, [neighborhood.cityId]);

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
      tags: ["wine", "mature", "expat"]
    },
    {
      id: 2,
      name: "La Copa Wine Bar",
      category: "wine-bar" as const,
      address: "Pulpito 102",
      priceRange: "$$" as const,
      crowdDemographic: "Ladies Night Thursdays",
      specialEvent: "Reserve tasting: 210 MXN",
      image: wineBarImage,
      rating: 4.6,
      tags: ["wine", "women", "expat"]
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
      tags: ["cafe", "books", "expat"]
    }
  ];

  const mapVenues = [
    { id: 1, name: "Elixir Wine Bar", type: "wine-bar" as const, lat: 20.6053, lng: -105.2357 },
    { id: 2, name: "La Copa Wine Bar", type: "wine-bar" as const, lat: 20.6048, lng: -105.2365 },
    { id: 3, name: "A Page in the Sun", type: "cafe" as const, lat: 20.6061, lng: -105.2370 },
    { id: 4, name: "Playa Olas Altas", type: "beach" as const, lat: 20.6065, lng: -105.2385 },
    { id: 5, name: "Los Muertos Pier", type: "beach" as const, lat: 20.6055, lng: -105.2380 },
    { id: 6, name: "Los Arcos", type: "charco" as const, lat: 20.5945, lng: -105.2650 }
  ];

  const zonaRomanticaBoundary = {
    type: "Feature" as const,
    geometry: {
      type: "Polygon" as const,
      coordinates: [[
        [-105.2400, 20.6100],
        [-105.2300, 20.6100],
        [-105.2300, 20.6000],
        [-105.2400, 20.6000],
        [-105.2400, 20.6100]
      ]]
    },
    properties: {
      name: "Zona Romántica",
      color: "#3b82f6"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with breadcrumb */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" className="mb-2" data-testid="button-back" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Puerto Vallarta
            </Link>
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold" data-testid="text-neighborhood-title">{neighborhood.name}</h1>
                <Button
                  size="icon"
                  variant={favorite ? "default" : "outline"}
                  onClick={() => toggleFavorite(neighborhood.cityId)}
                  title={favorite ? "Remove from Compare" : "Add to Compare"}
                  data-testid="button-toggle-favorite"
                >
                  <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                <span>{neighborhood.city}, {neighborhood.state}</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">
                  Affordability: 72/100
                </Badge>
                <Badge variant="outline">
                  Expat Friendly: 9/10
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Neighborhood Sub-Hero Section (Task #13) */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-l-8 border-primary shadow-lg" data-testid="card-neighborhood-hero">
          {heroLoading && (
            <div className="text-center py-4">
              <p className="text-xl font-semibold text-primary">Synthesizing local character...</p>
              <p className="text-sm text-muted-foreground">Generating hyper-local insights for {neighborhood.name}...</p>
            </div>
          )}

          {heroData && (
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary/70">
                Neighborhood Vibe Report
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight" data-testid="text-hero-headline">
                {heroData.subHeadline}
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-hero-insight">
                {heroData.insight}
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 h-auto" data-testid="tabs-navigation">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-overview">
              Overview
            </TabsTrigger>
            <TabsTrigger value="costs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-costs">
              Costs
            </TabsTrigger>
            <TabsTrigger value="budget" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-budget">
              Budget Tool
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

          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            </section>

            {/* Weather & Highlights */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Current Conditions & Highlights</h2>
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
                    <h3 className="text-xl font-semibold mb-4">Why Live Here?</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Waves className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold">Beach Access</h4>
                        </div>
                        <p className="text-muted-foreground">
                          3-minute walk to Playa Olas Altas. Prime beachfront location with easy access to all coastal activities.
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold">Expat Community</h4>
                        </div>
                        <p className="text-muted-foreground">
                          Highly active expat scene with 9 weekly meetups, wine bars, and social venues popular with 50+ crowd.
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Coffee className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold">Dining Scene</h4>
                        </div>
                        <p className="text-muted-foreground">
                          Mix of local fondas (90 MXN menu del día) and upscale restaurants. Easy walking to all amenities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tours & Events Card (Task #10) */}
                <Card data-testid="card-seasonal-content">
                  <CardContent className="p-6">
                    {eventLoading && <p className="text-center text-yellow-500">Generating latest event data...</p>}
                    
                    {eventData && (
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-primary" data-testid="text-event-headline">{eventData.headline}</h3>
                        <p className="text-muted-foreground" data-testid="text-event-description">
                          {eventData.description}
                        </p>
                        <a href="#" className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300" data-testid="link-event-details">
                          View Details →
                        </a>
                      </div>
                    )}
                    
                    {!eventData && !eventLoading && (
                      <p className="text-muted-foreground">Local events feed offline.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Live Expat Sentiment Index Card (Task #14) */}
                <Card data-testid="card-expat-sentiment" className="col-span-1 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      Live Expat Sentiment Index
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {sentimentLoading && <p className="text-center text-primary">Calculating community vibe...</p>}
                    
                    {sentimentData && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-1 flex justify-center">
                          <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-green-500/20">
                            <p className="text-6xl font-extrabold text-green-400" data-testid="text-sentiment-score">
                              {sentimentData.score}
                            </p>
                            <span className="absolute bottom-2 right-2 text-sm text-green-400">/100</span>
                          </div>
                        </div>
                        
                        <div className="md:col-span-2 space-y-2">
                          <p className="text-lg font-semibold text-foreground">
                            Current Vibe: {sentimentData.score >= 85 ? 'Strongly Positive' : 'Generally Positive'}
                          </p>
                          <p className="text-muted-foreground italic" data-testid="text-sentiment-summary">
                            "{sentimentData.summary}"
                          </p>
                          <p className="text-xs text-primary/70">
                            *Score based on synthesized analysis of recent expat discussions.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {!sentimentData && !sentimentLoading && (
                      <p className="text-muted-foreground">Expat sentiment feed offline.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Crime Safety Rating (Task #16.2) */}
                <Card data-testid="card-safety" className="col-span-1 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      Safety & Security Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {safetyLoading && <p className="text-center text-primary">Analyzing safety conditions...</p>}
                    
                    {safetyError && !safetyLoading && (
                      <div className="text-center space-y-4" data-testid="safety-error-state">
                        <p className="text-destructive">{safetyError}</p>
                        <Button 
                          variant="outline" 
                          onClick={getSafetyRating}
                          data-testid="button-retry-safety"
                          className="mx-auto"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Retry Analysis
                        </Button>
                      </div>
                    )}
                    
                    {safetyData && !safetyError && (
                      <div className="space-y-6">
                        {/* Score Header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Safety Score</p>
                            <p className="text-5xl font-extrabold text-emerald-400" data-testid="text-safety-score">
                              {safetyData.safetyScore}/100
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="text-base px-4 py-2" data-testid="badge-safety-level">
                              {safetyData.safetyLevel}
                            </Badge>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Crime Profile */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              <Shield className="w-4 h-4 text-emerald-400" />
                              Crime Profile
                            </h4>
                            <p className="text-sm text-muted-foreground" data-testid="text-crime-profile">
                              {safetyData.crimeProfile}
                            </p>
                          </div>

                          {/* Safety Recommendations */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-emerald-400" />
                              Safety Tips
                            </h4>
                            <p className="text-sm text-muted-foreground" data-testid="text-safety-recommendations">
                              {safetyData.recommendations}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-primary/70 text-center mt-4">
                          *Analysis based on regional crime data synthesis. Always consult official sources and local authorities.
                        </p>
                      </div>
                    )}
                    
                    {!safetyData && !safetyLoading && !safetyError && (
                      <p className="text-muted-foreground">Safety data unavailable.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Healthcare Proximity Map (Task #16.3) */}
                <div className="col-span-1 lg:col-span-2" data-testid="healthcare-map-wrapper">
                  <HealthcareMap 
                    neighborhoodName={neighborhood.name}
                    centerLat={neighborhood.centerLat}
                    centerLng={neighborhood.centerLng}
                    facilities={healthcareFacilities}
                  />
                </div>

                {/* Incline & Benches Index - Accessibility Score (Task #16.1) */}
                <Card data-testid="card-accessibility" className="col-span-1 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Mountain className="w-5 h-5 text-purple-400" />
                      Walkability & Accessibility Index
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {accessibilityLoading && <p className="text-center text-primary">Analyzing terrain and rest spots...</p>}
                    
                    {accessibilityError && !accessibilityLoading && (
                      <div className="text-center space-y-4" data-testid="accessibility-error-state">
                        <p className="text-destructive">{accessibilityError}</p>
                        <Button 
                          variant="outline" 
                          onClick={getAccessibilityScore}
                          data-testid="button-retry-accessibility"
                          className="mx-auto"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Retry Analysis
                        </Button>
                      </div>
                    )}
                    
                    {accessibilityData && !accessibilityError && (
                      <div className="space-y-6">
                        {/* Score Header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Overall Accessibility</p>
                            <p className="text-5xl font-extrabold text-purple-400" data-testid="text-accessibility-score">
                              {accessibilityData.accessibilityScore}/100
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="text-base px-4 py-2" data-testid="badge-terrain-type">
                              {accessibilityData.terrainType}
                            </Badge>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Incline Details */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              <Mountain className="w-4 h-4 text-purple-400" />
                              Street Inclines
                            </h4>
                            <p className="text-sm text-muted-foreground" data-testid="text-incline-description">
                              {accessibilityData.inclineDescription}
                            </p>
                          </div>

                          {/* Rest Spots */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              <Coffee className="w-4 h-4 text-purple-400" />
                              Rest Spots & Benches
                            </h4>
                            <Badge variant="outline" className="mb-2" data-testid="badge-bench-frequency">
                              {accessibilityData.benchFrequency}
                            </Badge>
                            <p className="text-sm text-muted-foreground" data-testid="text-rest-spot-details">
                              {accessibilityData.restSpotDetails}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-primary/70 text-center mt-4">
                          *Analysis based on synthesized urban mobility patterns and terrain data
                        </p>
                      </div>
                    )}
                    
                    {!accessibilityData && !accessibilityLoading && !accessibilityError && (
                      <p className="text-muted-foreground">Accessibility data unavailable.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Hyper-Local Climate Fit Score Section (Task #15) */}
                <Card data-testid="card-climate-fit" className="col-span-1 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Thermometer className="w-5 h-5 text-blue-400" />
                      Hyper-Local Climate Fit Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      <div className="lg:col-span-3 space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Define your ideal climate to see how well {neighborhood.city} matches your long-term comfort profile.
                        </p>
                        <form onSubmit={(e) => { e.preventDefault(); calculateClimateFit(); }} className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="maxTemp">Max Avg Temp (°F)</Label>
                              <Input id="maxTemp" type="number" value={maxTempInput} onChange={(e) => setMaxTempInput(e.target.value)} required min={50} max={110} data-testid="input-max-temp" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="minTemp">Min Avg Temp (°F)</Label>
                              <Input id="minTemp" type="number" value={minTempInput} onChange={(e) => setMinTempInput(e.target.value)} required min={30} max={80} data-testid="input-min-temp" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="humidity">Humidity Vibe</Label>
                              <Input id="humidity" type="text" value={humidityInput} onChange={(e) => setHumidityInput(e.target.value)} placeholder="Low, Moderate, High" required data-testid="input-humidity" />
                            </div>
                          </div>
                          
                          {climateError && <p className="text-sm text-destructive" data-testid="text-climate-error">{climateError}</p>}
                          
                          <Button type="submit" className="w-full" disabled={climateLoading} data-testid="button-calculate-fit">
                            {climateLoading ? 'Analyzing 30 Years of Data...' : (
                              <>
                                Calculate Fit Score <ChevronRight className="w-4 h-4 ml-2" />
                              </>
                            )}
                          </Button>
                        </form>
                      </div>

                      <div className={`lg:col-span-2 p-4 rounded-lg flex flex-col justify-center items-center text-center ${climateData ? 'bg-blue-500/10 border border-blue-500/50' : 'bg-muted/50'}`}>
                        {climateData ? (
                          <div className="space-y-3">
                            <p className="text-7xl font-extrabold text-blue-400" data-testid="text-fit-score">
                              {climateData.fitScore}%
                            </p>
                            <p className="text-sm text-muted-foreground italic" data-testid="text-fit-justification">
                              "{climateData.justification}"
                            </p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground py-4">
                            Enter your temperature ranges and humidity preference to get an instant Climate Fit Score.
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Neighborhood Image */}
            <section>
              <Card>
                <CardContent className="p-0">
                  <img
                    src={zonaImage}
                    alt="Zona Romántica street view"
                    className="w-full h-80 object-cover"
                  />
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="costs">
            <CostBreakdown neighborhoodName="Zona Romántica" items={costItems} />
          </TabsContent>

          <TabsContent value="budget" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Budget Calculator & Senior Comfort</h2>
              <p className="text-muted-foreground mb-6">
                Calculate your personalized monthly budget and assess senior-friendly amenities
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Budget Engine */}
                <BudgetEngine cityId="pv" cityName="Puerto Vallarta" />
                
                {/* Senior Comfort Suite */}
                <Card data-testid="card-senior-comfort">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" />
                      Senior Comfort Suite
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Get an AI-powered assessment of this neighborhood's suitability for seniors (55-80) based on mobility, healthcare access, and safety factors.
                    </p>
                    
                    <Button 
                      className="w-full"
                      data-testid="button-senior-score"
                      onClick={getSeniorScore}
                      disabled={seniorScoreLoading}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {seniorScoreLoading ? 'Calculating...' : 'Get Real-Time Senior Score'}
                    </Button>

                    {seniorScoreError && (
                      <div className="p-4 border rounded-lg bg-destructive/10 border-destructive" data-testid="text-senior-error">
                        <p className="text-sm text-destructive">
                          {seniorScoreError}
                        </p>
                      </div>
                    )}

                    {seniorScoreData && (
                      <div className="p-4 border rounded-lg bg-muted/50" data-testid="card-senior-result">
                        <div className="text-5xl font-extrabold text-primary mb-2" data-testid="text-senior-score">
                          {seniorScoreData.score}% Fit
                        </div>
                        <p className="text-sm text-muted-foreground" data-testid="text-senior-justification">
                          {seniorScoreData.justification}
                        </p>
                      </div>
                    )}

                    {!seniorScoreData && !seniorScoreError && !seniorScoreLoading && (
                      <div className="p-4 border rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">
                          Click the button above to get an instant AI-powered senior comfort analysis
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">Expat Social Venues</h2>
              <p className="text-muted-foreground mb-6">
                Wine bars, restaurants, and cafés popular with the expat community
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map(venue => (
                  <VenueCard key={venue.id} {...venue} />
                ))}
              </div>
            </section>
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

          <TabsContent value="webcams" className="space-y-8">
            {/* Street View Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Virtual Street Exploration</h2>
              <p className="text-muted-foreground mb-6">
                Explore the neighborhood at street level with 360° panoramic views
              </p>
              
              <StreetView
                lat={20.6055}
                lng={-105.2365}
                heading={90}
                pitch={0}
                zoom={1}
                title="Zona Romántica Street View"
              />
            </section>
              
            {/* Webcams Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Live Webcam Feeds</h2>
              <p className="text-muted-foreground mb-6">
                Real-time beach conditions and weather
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WebcamFeed
                  location="Los Muertos Beach South"
                  title="Vallarta Shores - Live Beach Webcam"
                  streamUrl="https://vallartashores.com/live-vallarta-webcam/"
                  embedType="iframe"
                  isLive={true}
                />
                <WebcamFeed
                  location="Hotel Zone Beach"
                  title="Grand Park Royal - PTZ Beach Cam"
                  streamUrl="https://www.puertovallarta.net/interactive/large-webcam/"
                  embedType="iframe"
                  isLive={true}
                />
                <Card className="overflow-hidden" data-testid="webcam-external-links">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Video className="w-5 h-5 text-primary" />
                      External Webcam Links
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Most Puerto Vallarta webcams cannot be embedded due to security restrictions. Click below to view live feeds in new windows:
                    </p>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => window.open('https://langostinos.click2stream.com/', '_blank')}
                        data-testid="button-langostinos-webcam"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Langostinos - 360° HD Beach Cam
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => window.open('http://www.cuatesycuetes.com/en/index.php/webcam', '_blank')}
                        data-testid="button-cuates-webcam"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Cuates y Cuetes - Los Muertos Pier
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => window.open('https://puertovallarta.garzablancaresort.com/live-webcam', '_blank')}
                        data-testid="button-garza-blanca-webcam"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Garza Blanca - Luxury Resort Views
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => window.open('https://embed.windy.com/embed2.html?lat=20.653&lon=-105.250&zoom=11', '_blank')}
                        data-testid="button-windy-webcam"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Windy - Live Weather Conditions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden col-span-1 md:col-span-2" data-testid="webcam-info">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Video className="w-5 h-5 text-primary" />
                      About These Webcams
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Vallarta Shores</strong> shows Los Muertos Beach with the iconic Seahorse statue, perfect for checking current beach conditions and sunset timing.
                      <strong> Grand Park Royal</strong> features a PTZ (pan-tilt-zoom) camera that moves throughout the day, showing dynamic views of the beach, pool areas, and Banderas Bay.
                      Both streams use direct RTSP/HLS protocols rather than YouTube infrastructure.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="proximity" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Neighborhood Map</h2>
              <p className="text-muted-foreground mb-6">
                Interactive map showing key venues, beaches, and amenities
              </p>
              <MapView
                neighborhoodName="Zona Romántica"
                centerLat={20.6055}
                centerLng={-105.2365}
                venues={mapVenues}
                boundary={zonaRomanticaBoundary}
              />
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Distance Calculator</h2>
              <p className="text-muted-foreground mb-6">
                How far are you from the places you care about?
              </p>
              <ProximityCalculator
                neighborhoodName="Zona Romántica"
                items={proximityItems}
              />
            </section>
          </TabsContent>
        </Tabs>
      </div>

      {/* Task #12: Fixed Compare Button */}
      {favorites.length > 0 && (
        <Button 
          className="fixed bottom-6 right-6 z-50 p-6 text-xl font-extrabold shadow-lg transition-all duration-300 hover:scale-[1.02]"
          onClick={() => alert("Compare Drawer is ready! It needs to be placed in your main App.tsx to appear on this page.")}
          data-testid="button-open-compare"
        >
          <Scale className="w-6 h-6 mr-3" />
          Compare ({favorites.length})
        </Button>
      )}
    </div>
  );
}
