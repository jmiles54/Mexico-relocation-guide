import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

interface DayForecast {
  day: string;
  high: number;
  low: number;
  condition: "sunny" | "cloudy" | "rainy";
}

interface WeatherWidgetProps {
  location: string;
  currentTemp: number;
  condition: "sunny" | "cloudy" | "rainy";
  humidity: number;
  windSpeed: number;
  forecast: DayForecast[];
}

export default function WeatherWidget({
  location,
  currentTemp,
  condition,
  humidity,
  windSpeed,
  forecast,
}: WeatherWidgetProps) {
  const getWeatherIcon = (cond: string, size: "large" | "small" = "large") => {
    const iconSize = size === "large" ? "w-20 h-20" : "w-8 h-8";
    switch (cond) {
      case "sunny":
        return <Sun className={`${iconSize} text-yellow-400`} />;
      case "cloudy":
        return <Cloud className={`${iconSize} text-gray-400`} />;
      case "rainy":
        return <CloudRain className={`${iconSize} text-blue-400`} />;
      default:
        return <Sun className={`${iconSize} text-yellow-400`} />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden" data-testid="widget-weather">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold opacity-90" data-testid="text-weather-location">{location}</h3>
          <p className="text-sm opacity-75">Current Weather</p>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-6xl font-bold" data-testid="text-current-temp">{currentTemp}°C</div>
            <div className="text-sm opacity-75 capitalize mt-1">{condition}</div>
          </div>
          <div>
            {getWeatherIcon(condition, "large")}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4" />
            <span>Wind: {windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💧</span>
            <span>Humidity: {humidity}%</span>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="grid grid-cols-5 gap-3">
            {forecast.map((day, index) => (
              <div key={index} className="text-center" data-testid={`forecast-day-${index}`}>
                <div className="text-xs opacity-75 mb-2">{day.day}</div>
                <div className="flex justify-center mb-2">
                  {getWeatherIcon(day.condition, "small")}
                </div>
                <div className="text-sm font-semibold">{day.high}°</div>
                <div className="text-xs opacity-75">{day.low}°</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
