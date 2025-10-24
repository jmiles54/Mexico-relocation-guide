import WeatherWidget from '../WeatherWidget';

export default function WeatherWidgetExample() {
  const mockForecast = [
    { day: "Mon", high: 32, low: 24, condition: "sunny" as const },
    { day: "Tue", high: 31, low: 23, condition: "sunny" as const },
    { day: "Wed", high: 30, low: 24, condition: "cloudy" as const },
    { day: "Thu", high: 29, low: 23, condition: "rainy" as const },
    { day: "Fri", high: 31, low: 24, condition: "sunny" as const },
  ];

  return (
    <div className="p-8 bg-background">
      <WeatherWidget
        location="Puerto Vallarta"
        currentTemp={30}
        condition="sunny"
        humidity={65}
        windSpeed={12}
        forecast={mockForecast}
      />
    </div>
  );
}
