import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import NeighborhoodCard from "@/components/NeighborhoodCard";
import zonaImage from '@assets/stock_images/zona_romantica_puert_63220432.jpg';
import versallesImage from '@assets/stock_images/versalles_neighborho_6f389286.jpg';
import marinaImage from '@assets/stock_images/marina_vallarta_yach_12d6d0ec.jpg';

export default function NeighborhoodMatcher() {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState([12000]);
  const [beachImportance, setBeachImportance] = useState<string>("");
  const [socialScene, setSocialScene] = useState<string>("");
  const [lifestyle, setLifestyle] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const handleComplete = () => {
    console.log('Quiz completed:', { budget, beachImportance, socialScene, lifestyle });
    setShowResults(true);
  };

  const handleReset = () => {
    setStep(1);
    setBudget([12000]);
    setBeachImportance("");
    setSocialScene("");
    setLifestyle("");
    setShowResults(false);
  };

  // Mock recommendations based on answers
  const getRecommendations = () => {
    const recommendations = [];
    
    // Budget-based recommendations
    if (budget[0] < 10000) {
      recommendations.push({
        name: "Versalles",
        city: "Puerto Vallarta",
        image: versallesImage,
        affordabilityScore: 82,
        rentPrice: "7,800 MXN",
        expatRating: 6,
        walkability: 7,
        beachDistance: "25 min bus",
        matchScore: socialScene === "local" ? 95 : 85
      });
    }
    
    // Beach importance
    if (beachImportance === "essential") {
      recommendations.push({
        name: "Zona Romántica",
        city: "Puerto Vallarta",
        image: zonaImage,
        affordabilityScore: 72,
        rentPrice: "14,000 MXN",
        expatRating: 9,
        walkability: 9,
        beachDistance: "3 min walk",
        matchScore: budget[0] >= 12000 ? 95 : 82
      });
    }
    
    // Lifestyle preferences
    if (lifestyle === "lively") {
      const score = recommendations.some(r => r.name === "Zona Romántica") ? 88 : 93;
      if (!recommendations.some(r => r.name === "Zona Romántica")) {
        recommendations.push({
          name: "Zona Romántica",
          city: "Puerto Vallarta",
          image: zonaImage,
          affordabilityScore: 72,
          rentPrice: "14,000 MXN",
          expatRating: 9,
          walkability: 9,
          beachDistance: "3 min walk",
          matchScore: score
        });
      }
    }
    
    if (lifestyle === "quiet" || beachImportance === "nice") {
      recommendations.push({
        name: "Marina Vallarta",
        city: "Puerto Vallarta",
        image: marinaImage,
        affordabilityScore: 65,
        rentPrice: "12,200 MXN",
        expatRating: 7,
        walkability: 6,
        beachDistance: "12 min walk",
        matchScore: lifestyle === "quiet" ? 90 : 85
      });
    }
    
    // Social scene preferences
    if (socialScene === "expat-heavy" && !recommendations.some(r => r.name === "Zona Romántica")) {
      recommendations.push({
        name: "Zona Romántica",
        city: "Puerto Vallarta",
        image: zonaImage,
        affordabilityScore: 72,
        rentPrice: "14,000 MXN",
        expatRating: 9,
        walkability: 9,
        beachDistance: "3 min walk",
        matchScore: 91
      });
    }
    
    // Remove duplicates and sort
    const unique = recommendations.filter((rec, index, self) =>
      index === self.findIndex((r) => r.name === rec.name)
    );
    
    return unique.sort((a, b) => b.matchScore - a.matchScore);
  };

  if (showResults) {
    const recommendations = getRecommendations();
    
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" onClick={handleReset} className="mb-6" data-testid="button-restart-quiz">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold">Your Perfect Matches</h1>
            </div>
            <p className="text-muted-foreground">
              Based on your preferences, here are the neighborhoods we recommend:
            </p>
          </div>
          
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((neighborhood, index) => (
                <div key={index} className="relative">
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-lg">
                      {neighborhood.matchScore}%
                    </div>
                  </div>
                  <NeighborhoodCard {...neighborhood} />
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  No perfect matches yet. Try adjusting your preferences!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Neighborhood</h1>
          <p className="text-muted-foreground">
            Answer a few questions to get personalized recommendations
          </p>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card data-testid="card-step-1">
            <CardHeader>
              <CardTitle>What's your monthly housing budget?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2" data-testid="text-budget-value">
                  {budget[0].toLocaleString()} MXN
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  For a furnished 1-bedroom apartment
                </p>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  min={5000}
                  max={20000}
                  step={500}
                  data-testid="slider-budget"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>5,000 MXN</span>
                  <span>20,000 MXN</span>
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="w-full" data-testid="button-next-step">
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card data-testid="card-step-2">
            <CardHeader>
              <CardTitle>How important is beach access?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={beachImportance} onValueChange={setBeachImportance}>
                <div className="flex items-center space-x-2 p-3 border rounded hover-elevate">
                  <RadioGroupItem value="essential" id="essential" data-testid="radio-beach-essential" />
                  <Label htmlFor="essential" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Essential</div>
                    <div className="text-xs text-muted-foreground">Walking distance (under 10 min)</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded hover-elevate">
                  <RadioGroupItem value="nice" id="nice" data-testid="radio-beach-nice" />
                  <Label htmlFor="nice" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Nice to have</div>
                    <div className="text-xs text-muted-foreground">Within 20-30 min by bus</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded hover-elevate">
                  <RadioGroupItem value="not-important" id="not-important" data-testid="radio-beach-not-important" />
                  <Label htmlFor="not-important" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Not important</div>
                    <div className="text-xs text-muted-foreground">Occasional visits are fine</div>
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={!beachImportance} className="flex-1" data-testid="button-next-step-2">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card data-testid="card-step-3">
            <CardHeader>
              <CardTitle>What kind of social scene appeals to you?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={socialScene} onValueChange={setSocialScene}>
                <div className="flex items-center space-x-2 p-3 border rounded hover-elevate">
                  <RadioGroupItem value="expat-heavy" id="expat-heavy" data-testid="radio-social-expat" />
                  <Label htmlFor="expat-heavy" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Active expat community</div>
                    <div className="text-xs text-muted-foreground">Wine bars, meetups, English-friendly</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded hover-elevate">
                  <RadioGroupItem value="balanced" id="balanced" data-testid="radio-social-balanced" />
                  <Label htmlFor="balanced" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Mix of expat and local</div>
                    <div className="text-xs text-muted-foreground">Both communities accessible</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded hover-elevate">
                  <RadioGroupItem value="local" id="local" data-testid="radio-social-local" />
                  <Label htmlFor="local" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Authentic local experience</div>
                    <div className="text-xs text-muted-foreground">Immerse in Mexican culture</div>
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={() => setStep(4)} disabled={!socialScene} className="flex-1" data-testid="button-next-step-3">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card data-testid="card-step-4">
            <CardHeader>
              <CardTitle>What's your ideal lifestyle pace?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={lifestyle} onValueChange={setLifestyle}>
                <div className="flex items-center space-x-2 p-3 border rounded hover-elevate">
                  <RadioGroupItem value="lively" id="lively" data-testid="radio-lifestyle-lively" />
                  <Label htmlFor="lively" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Lively & walkable</div>
                    <div className="text-xs text-muted-foreground">Restaurants, nightlife, bustling streets</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded hover-elevate">
                  <RadioGroupItem value="quiet" id="quiet" data-testid="radio-lifestyle-quiet" />
                  <Label htmlFor="quiet" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Quiet & residential</div>
                    <div className="text-xs text-muted-foreground">Peaceful, residential feel</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded hover-elevate">
                  <RadioGroupItem value="suburban" id="suburban" data-testid="radio-lifestyle-suburban" />
                  <Label htmlFor="suburban" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Suburban comfort</div>
                    <div className="text-xs text-muted-foreground">Car-friendly, spacious, calm</div>
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={handleComplete} disabled={!lifestyle} className="flex-1" data-testid="button-get-results">
                  Get Results <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
