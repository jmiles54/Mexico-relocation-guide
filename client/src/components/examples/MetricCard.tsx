import MetricCard from '../MetricCard';
import { DollarSign, Users, Shield, Sun } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background">
      <MetricCard
        icon={DollarSign}
        label="Affordability Score"
        value={72}
        trend="18% better than avg"
        trendDirection="up"
        variant="success"
      />
      <MetricCard
        icon={Users}
        label="Expat Community"
        value="9/10"
        trend="Large & active"
        trendDirection="up"
        variant="default"
      />
      <MetricCard
        icon={Shield}
        label="Safety Rating"
        value={85}
        trend="Very high"
        trendDirection="neutral"
        variant="success"
      />
      <MetricCard
        icon={Sun}
        label="Climate Score"
        value="30°C"
        trend="Tropical coastal"
        trendDirection="neutral"
        variant="warning"
      />
    </div>
  );
}
