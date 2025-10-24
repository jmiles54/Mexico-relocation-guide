import VenueCard from '../VenueCard';
import wineBarImage from '@assets/generated_images/Expat_wine_bar_scene_f31e2caf.png';

export default function VenueCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      <VenueCard
        name="Elixir Wine Bar"
        category="wine-bar"
        address="Calle Basilio Badillo 289"
        priceRange="$$"
        crowdDemographic="50+ Mature Expats"
        specialEvent="Wine Mondays 6-9pm"
        image={wineBarImage}
        rating={4.8}
      />
      <VenueCard
        name="La Copa Wine Bar"
        category="wine-bar"
        address="Pulpito 102, Zona Romántica"
        priceRange="$$"
        crowdDemographic="Ladies Night Thursdays"
        specialEvent="Reserve tasting: 210 MXN"
        image={wineBarImage}
        rating={4.6}
      />
      <VenueCard
        name="A Page in the Sun"
        category="cafe"
        address="Olas Altas 399"
        priceRange="$"
        crowdDemographic="60% English speakers"
        specialEvent="Book club Wednesdays"
        rating={4.7}
      />
    </div>
  );
}
