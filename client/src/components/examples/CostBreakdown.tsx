import CostBreakdown from '../CostBreakdown';

export default function CostBreakdownExample() {
  const mockItems = [
    {
      category: "Housing",
      item: "1BR Furnished Apartment",
      price: "14,000",
      comparison: "18% above avg",
      source: "FB Marketplace",
      lastUpdated: "Oct 2025"
    },
    {
      category: "Housing",
      item: "Studio Apartment",
      price: "9,500",
      comparison: "12% above avg",
      source: "Local listing",
      lastUpdated: "Oct 2025"
    },
    {
      category: "Food",
      item: "Weekly Groceries",
      price: "1,200",
      comparison: "5% above avg",
      source: "User survey",
      lastUpdated: "Oct 2025"
    },
    {
      category: "Food",
      item: "Menu del Día",
      price: "90",
      comparison: "Average",
      source: "Restaurant data",
      lastUpdated: "Oct 2025"
    },
    {
      category: "Transportation",
      item: "Local Bus Ride",
      price: "12",
      comparison: "Standard rate",
      source: "City transit",
      lastUpdated: "Oct 2025"
    },
    {
      category: "Entertainment",
      item: "Movie Ticket",
      price: "80",
      comparison: "Average",
      source: "Cinepolis",
      lastUpdated: "Oct 2025"
    },
    {
      category: "Utilities",
      item: "Monthly Electric",
      price: "800",
      comparison: "15% below avg",
      source: "CFE average",
      lastUpdated: "Sep 2025"
    }
  ];

  return (
    <div className="p-8 bg-background">
      <CostBreakdown neighborhoodName="Zona Romántica" items={mockItems} />
    </div>
  );
}
