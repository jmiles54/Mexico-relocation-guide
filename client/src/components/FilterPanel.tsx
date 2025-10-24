import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface FilterPanelProps {
  onFilterChange?: (filters: any) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [budget, setBudget] = useState([5000, 15000]);
  const [features, setFeatures] = useState({
    beachProximity: false,
    expatCommunity: false,
    highSafety: false,
    warmClimate: false,
  });

  const handleBudgetChange = (value: number[]) => {
    setBudget(value);
    console.log('Budget range changed:', value);
  };

  const handleFeatureToggle = (feature: keyof typeof features) => {
    setFeatures(prev => {
      const updated = { ...prev, [feature]: !prev[feature] };
      console.log('Features updated:', updated);
      return updated;
    });
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', { budget, features });
    onFilterChange?.({ budget, features });
  };

  const handleResetFilters = () => {
    setBudget([5000, 15000]);
    setFeatures({
      beachProximity: false,
      expatCommunity: false,
      highSafety: false,
      warmClimate: false,
    });
    console.log('Filters reset');
  };

  return (
    <Card data-testid="panel-filter">
      <CardHeader>
        <CardTitle className="text-lg">Filter Neighborhoods</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-semibold mb-3 block">
            Monthly Budget (MXN)
          </Label>
          <Slider
            value={budget}
            onValueChange={handleBudgetChange}
            min={3000}
            max={25000}
            step={500}
            className="mb-3"
            data-testid="slider-budget"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span data-testid="text-budget-min">{budget[0].toLocaleString()} MXN</span>
            <span data-testid="text-budget-max">{budget[1].toLocaleString()} MXN</span>
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold mb-3 block">
            Must-Have Features
          </Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="beach"
                checked={features.beachProximity}
                onCheckedChange={() => handleFeatureToggle('beachProximity')}
                data-testid="checkbox-beach-proximity"
              />
              <Label htmlFor="beach" className="text-sm cursor-pointer">
                🏖️ Close to Beach
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="expat"
                checked={features.expatCommunity}
                onCheckedChange={() => handleFeatureToggle('expatCommunity')}
                data-testid="checkbox-expat-community"
              />
              <Label htmlFor="expat" className="text-sm cursor-pointer">
                👥 Active Expat Community
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="safety"
                checked={features.highSafety}
                onCheckedChange={() => handleFeatureToggle('highSafety')}
                data-testid="checkbox-high-safety"
              />
              <Label htmlFor="safety" className="text-sm cursor-pointer">
                🛡️ High Safety Rating
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="climate"
                checked={features.warmClimate}
                onCheckedChange={() => handleFeatureToggle('warmClimate')}
                data-testid="checkbox-warm-climate"
              />
              <Label htmlFor="climate" className="text-sm cursor-pointer">
                ☀️ Warm Year-Round
              </Label>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleApplyFilters}
            className="flex-1"
            data-testid="button-apply-filters"
          >
            Apply Filters
          </Button>
          <Button
            onClick={handleResetFilters}
            variant="outline"
            data-testid="button-reset-filters"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
