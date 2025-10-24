import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Info } from "lucide-react";

interface CostItem {
  category: string;
  item: string;
  price: string;
  comparison?: string;
  source: string;
  lastUpdated: string;
}

interface CostBreakdownProps {
  neighborhoodName: string;
  items: CostItem[];
}

export default function CostBreakdown({ neighborhoodName, items }: CostBreakdownProps) {
  const handleSourceClick = (source: string, item: string) => {
    console.log('Opening source:', source, 'for item:', item);
  };

  return (
    <Card data-testid="card-cost-breakdown">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Cost of Living - {neighborhoodName}</span>
          <Badge variant="outline" className="font-mono text-xs">
            All prices in MXN
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 py-3 border-b last:border-b-0 hover-elevate rounded px-2"
              data-testid={`row-cost-item-${index}`}
            >
              <div className="col-span-4">
                <div className="font-medium text-sm">{item.item}</div>
                <div className="text-xs text-muted-foreground">{item.category}</div>
              </div>
              
              <div className="col-span-2 flex items-center">
                <span className="font-mono font-semibold" data-testid={`text-price-${index}`}>
                  {item.price}
                </span>
              </div>
              
              <div className="col-span-3 flex items-center">
                {item.comparison && (
                  <Badge variant="outline" className="text-xs">
                    {item.comparison}
                  </Badge>
                )}
              </div>
              
              <div className="col-span-3 flex items-center justify-end gap-2">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">{item.lastUpdated}</div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => handleSourceClick(item.source, item.item)}
                  data-testid={`button-source-${index}`}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Data Transparency</p>
            <p className="text-xs">
              All prices are sourced from recent user submissions, Facebook Marketplace, and local expat groups.
              Click the link icon to view the original source.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
