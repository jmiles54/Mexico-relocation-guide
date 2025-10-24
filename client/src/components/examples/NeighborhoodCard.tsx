import NeighborhoodCard from '../NeighborhoodCard';
import zonaImage from '@assets/stock_images/colorful_street_colo_1e0fdd01.jpg';

export default function NeighborhoodCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      <NeighborhoodCard
        name="Zona Romántica"
        city="Puerto Vallarta"
        image={zonaImage}
        affordabilityScore={72}
        rentPrice="14,000 MXN"
        expatRating={9}
        walkability={9}
        beachDistance="3 min walk"
      />
      <NeighborhoodCard
        name="Versalles"
        city="Puerto Vallarta"
        image={zonaImage}
        affordabilityScore={82}
        rentPrice="7,800 MXN"
        expatRating={6}
        walkability={7}
        beachDistance="25 min bus"
      />
      <NeighborhoodCard
        name="Marina Vallarta"
        city="Puerto Vallarta"
        image={zonaImage}
        affordabilityScore={65}
        rentPrice="12,200 MXN"
        expatRating={7}
        walkability={6}
        beachDistance="12 min walk"
      />
    </div>
  );
}
