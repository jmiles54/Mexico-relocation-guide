import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterPanel from "@/components/FilterPanel";
import ComparisonTable from "@/components/ComparisonTable";
import { ArrowLeft } from "lucide-react";

export default function Compare() {
  const [filters, setFilters] = useState<any>(null);

  const neighborhoods = [
    {
      name: "Zona Romántica",
      rent: "14,000 MXN",
      groceries: "1,200 MXN",
      safety: 8,
      expatCommunity: 9,
      beachDistance: "3 min walk"
    },
    {
      name: "Versalles",
      rent: "7,800 MXN",
      groceries: "1,050 MXN",
      safety: 9,
      expatCommunity: 6,
      beachDistance: "25 min bus"
    },
    {
      name: "Marina Vallarta",
      rent: "12,200 MXN",
      groceries: "1,250 MXN",
      safety: 9,
      expatCommunity: 7,
      beachDistance: "12 min walk"
    },
    {
      name: "Pitillal",
      rent: "6,300 MXN",
      groceries: "850 MXN",
      safety: 6,
      expatCommunity: 4,
      beachDistance: "N/A"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" className="mb-2" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold" data-testid="text-compare-title">Compare Neighborhoods</h1>
          <p className="text-muted-foreground mt-2">
            Side-by-side comparison of key metrics across neighborhoods
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={setFilters} />
          </div>
          
          <div className="lg:col-span-3">
            <ComparisonTable neighborhoods={neighborhoods} />
            
            {filters && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Active Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Filters applied - results updated
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
