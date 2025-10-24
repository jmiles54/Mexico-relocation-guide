import WebcamFeed from '../WebcamFeed';
import beachImage from '@assets/generated_images/Puerto_Vallarta_beach_hero_image_a9e31d9a.png';

export default function WebcamFeedExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-background">
      <WebcamFeed
        location="Zona Romántica"
        title="Playa Olas Altas"
        isLive={true}
        placeholderImage={beachImage}
      />
      <WebcamFeed
        location="Marina Vallarta"
        title="Marina Beach View"
        isLive={true}
        placeholderImage={beachImage}
      />
      <WebcamFeed
        location="Downtown"
        title="Malecón Boardwalk"
        isLive={false}
        placeholderImage={beachImage}
      />
      <WebcamFeed
        location="Conchas Chinas"
        title="South Beach"
        isLive={true}
      />
    </div>
  );
}
