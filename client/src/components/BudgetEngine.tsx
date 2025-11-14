import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

const BASE_COSTS = {
  pv: { rent: 800, groceries: 400, transport: 100, utilities: 100, insurance: 150 },
  merida: { rent: 600, groceries: 350, transport: 80, utilities: 80, insurance: 120 },
  sma: { rent: 950, groceries: 450, transport: 50, utilities: 120, insurance: 180 },
  cancun: { rent: 1100, groceries: 500, transport: 120, utilities: 150, insurance: 160 },
};

interface BudgetEngineProps {
  cityId: 'pv' | 'merida' | 'sma' | 'cancun';
  cityName: string;
}

export default function BudgetEngine({ cityId, cityName }: BudgetEngineProps) {
  const base = BASE_COSTS[cityId];
  
  const [rent, setRent] = useState(base.rent);
  const [groceries, setGroceries] = useState(base.groceries);
  const [transport, setTransport] = useState(base.transport);
  const [utilities, setUtilities] = useState(base.utilities);
  const [insurance, setInsurance] = useState(base.insurance);
  const [discretionary, setDiscretionary] = useState(300);

  const totalBudget = rent + groceries + transport + utilities + insurance + discretionary;

  const budgetItems = [
    { id: 'rent', label: 'Housing / Rent', value: rent, setter: setRent, base: base.rent },
    { id: 'groceries', label: 'Groceries / Food', value: groceries, setter: setGroceries, base: base.groceries },
    { id: 'transport', label: 'Transport / Mobility', value: transport, setter: setTransport, base: base.transport },
    { id: 'utilities', label: 'Utilities (Electric/Water/Gas)', value: utilities, setter: setUtilities, base: base.utilities },
    { id: 'insurance', label: 'Healthcare/Insurance', value: insurance, setter: setInsurance, base: base.insurance },
    { id: 'discretionary', label: 'Discretionary / Entertainment', value: discretionary, setter: setDiscretionary, base: 300 },
  ];

  return (
    <Card data-testid="card-budget-engine">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          {cityName} Monthly Budget Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {budgetItems.map(({ id, label, value, setter, base }) => (
          <div className="space-y-2" key={id}>
            <Label htmlFor={id} className="text-sm font-medium">
              {label} <span className="text-muted-foreground">(Base: ${base})</span>
            </Label>
            <Input 
              id={id} 
              type="number" 
              value={value} 
              onChange={(e) => setter(Number(e.target.value))} 
              min={0}
              data-testid={`input-budget-${id}`}
            />
          </div>
        ))}

        <div className="mt-6 pt-4 border-t">
          <h4 className="text-lg font-semibold mb-2">
            Total Estimated Monthly Budget:
          </h4>
          <p className="text-4xl font-bold text-primary" data-testid="text-budget-total">
            ${totalBudget.toLocaleString()} USD
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Adjust inputs above to personalize your cost of living estimate
          </p>
        </div>

      </CardContent>
    </Card>
  );
}
