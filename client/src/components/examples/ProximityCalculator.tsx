import ProximityCalculator from '../ProximityCalculator';

export default function ProximityCalculatorExample() {
  const mockItems = [
    {
      name: "Playa Olas Altas",
      type: "beach" as const,
      distance: "400m",
      walkTime: "3 min walk",
    },
    {
      name: "Plaza Principal",
      type: "plaza" as const,
      distance: "1.2km",
      walkTime: "15 min walk",
      transitTime: "5 min bus",
    },
    {
      name: "Elixir Wine Bar",
      type: "venue" as const,
      distance: "600m",
      walkTime: "8 min walk",
    },
    {
      name: "Los Arcos Natural Pool",
      type: "charco" as const,
      distance: "12km",
      transitTime: "25 min drive",
    },
    {
      name: "Mercado Emiliano Zapata",
      type: "venue" as const,
      distance: "800m",
      walkTime: "10 min walk",
    },
  ];

  return (
    <div className="p-8 bg-background">
      <ProximityCalculator neighborhoodName="Zona Romántica" items={mockItems} />
    </div>
  );
}
