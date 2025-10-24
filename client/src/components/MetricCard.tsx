import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  variant?: "default" | "success" | "warning" | "danger";
}

export default function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
  trendDirection,
  variant = "default",
}: MetricCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "bg-green-50 border-green-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "danger":
        return "bg-red-50 border-red-200";
      default:
        return "bg-card";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "danger":
        return "text-red-600";
      default:
        return "text-primary";
    }
  };

  const getTrendIcon = () => {
    if (trendDirection === "up") return "↑";
    if (trendDirection === "down") return "↓";
    return "→";
  };

  return (
    <Card className={`${getVariantClasses()} border-2`} data-testid={`metric-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Icon className={`w-8 h-8 ${getIconColor()}`} />
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold" data-testid={`text-metric-value-${label.toLowerCase().replace(/\s+/g, '-')}`}>
            {value}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            {label}
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
              <span>{getTrendIcon()}</span>
              <span>{trend}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
