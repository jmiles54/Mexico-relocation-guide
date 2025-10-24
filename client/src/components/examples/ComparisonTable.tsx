import ComparisonTable from '../ComparisonTable';

export default function ComparisonTableExample() {
  const mockNeighborhoods = [
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
    <div className="p-8 bg-background">
      <ComparisonTable neighborhoods={mockNeighborhoods} />
    </div>
  );
}
