import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronRight, Zap } from 'lucide-react';

interface RecommendationFormProps {
  onRecommend: (data: { city: string; justification: string }) => void;
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({ onRecommend }) => {
  const [age, setAge] = useState('65');
  const [budget, setBudget] = useState('2500');
  const [mobility, setMobility] = useState('Fully Mobile');
  const [interests, setInterests] = useState('Beach, Art, Food');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, budget, mobility, interests })
      });
      
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to get recommendation.');
      }
      
      onRecommend(data);

    } catch (err: any) {
      setError(err.message || 'Error connecting to recommendation engine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-2xl border-primary/50" data-testid="card-recommendation-form">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2 text-primary">
          <Zap className="w-6 h-6" />
          Find Your Perfect City
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Your Age</Label>
              <Input 
                id="age" 
                type="number" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                required 
                min={18}
                data-testid="input-age"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Budget (USD)</Label>
              <Input 
                id="budget" 
                type="number" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)} 
                required 
                min={1000}
                data-testid="input-budget"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mobility">Mobility Needs</Label>
            <Input 
              id="mobility" 
              type="text" 
              value={mobility} 
              onChange={(e) => setMobility(e.target.value)} 
              placeholder="e.g., Fully Mobile, Uses Walker, Wheelchair" 
              required
              data-testid="input-mobility"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="interests">Key Interests</Label>
            <Input 
              id="interests" 
              type="text" 
              value={interests} 
              onChange={(e) => setInterests(e.target.value)} 
              placeholder="e.g., Nightlife, Colonial History, Beaches, Hiking" 
              required
              data-testid="input-interests"
            />
          </div>
          
          {error && <p className="text-sm text-destructive" data-testid="text-error">{error}</p>}

          <Button type="submit" className="w-full text-lg" disabled={loading} data-testid="button-submit-recommendation">
            {loading ? (
              'Analyzing...'
            ) : (
              <>
                Get AI Recommendation <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RecommendationForm;
