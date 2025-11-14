import { Star, TrendingUp, Heart } from "lucide-react";

interface SocialProofBadgeProps {
  label: string;
}

const getIcon = (label: string) => {
  if (label.includes('Top')) return <Star className="w-3 h-3 fill-current" />;
  if (label.includes('Saved')) return <Heart className="w-3 h-3 fill-current" />;
  if (label.includes('Favorite')) return <TrendingUp className="w-3 h-3 fill-current" />;
  return null;
};

export default function SocialProofBadge({ label }: SocialProofBadgeProps) {
  return (
    <div className="absolute top-2 left-2 z-10 px-3 py-1 bg-yellow-600/90 backdrop-blur-sm rounded-full text-white text-xs font-bold shadow-md flex items-center gap-1" data-testid={`badge-social-proof-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      {getIcon(label)}
      <span>{label}</span>
    </div>
  );
}
