import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NeighborhoodComparison {
  name: string;
  rent: string;
  groceries: string;
  safety: number;
  expatCommunity: number;
  beachDistance: string;
}

interface ComparisonTableProps {
  neighborhoods: NeighborhoodComparison[];
}

export default function ComparisonTable({ neighborhoods }: ComparisonTableProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-600";
    if (rating >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card data-testid="table-comparison">
      <CardHeader>
        <CardTitle>Neighborhood Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Neighborhood</th>
                <th className="text-left p-3 font-semibold">1BR Rent</th>
                <th className="text-left p-3 font-semibold">Weekly Groceries</th>
                <th className="text-left p-3 font-semibold">Safety</th>
                <th className="text-left p-3 font-semibold">Expat Community</th>
                <th className="text-left p-3 font-semibold">Beach Access</th>
              </tr>
            </thead>
            <tbody>
              {neighborhoods.map((neighborhood, index) => (
                <tr
                  key={index}
                  className="border-b hover-elevate"
                  data-testid={`row-neighborhood-${index}`}
                >
                  <td className="p-3">
                    <div className="font-semibold" data-testid={`text-neighborhood-${index}`}>
                      {neighborhood.name}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-mono text-sm" data-testid={`text-rent-${index}`}>
                      {neighborhood.rent}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-mono text-sm">
                      {neighborhood.groceries}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${getRatingColor(neighborhood.safety)}`}>
                        {neighborhood.safety}/10
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${getRatingColor(neighborhood.expatCommunity)}`}>
                        {neighborhood.expatCommunity}/10
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className="text-xs">
                      {neighborhood.beachDistance}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
