import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const expatQuotes = [
  {
    text: "Now I have more friends in Vallarta than I ever have had in all my life",
    author: "Jay, Retiree"
  },
  {
    text: "Four years later, Puerto Vallarta feels more like home than anywhere else I've lived",
    author: "Digital Nomad from Toronto"
  },
  {
    text: "I used to pay double for half the space",
    author: "Toronto Expat"
  },
  {
    text: "After buying our condo, we have never been happier or so free of financial worries",
    author: "Retired Couple"
  },
  {
    text: "Street tacos under $2, 20-minute Uber rides for a few dollars",
    author: "Multiple Expats"
  },
  {
    text: "I have never looked back",
    author: "Meagan, Relocated 2013"
  }
];

export default function RotatingQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % expatQuotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const quote = expatQuotes[currentIndex];

  return (
    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent p-3 text-white">
      <div className="flex items-start gap-2">
        <Quote className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-70" />
        <div className="flex-1 min-w-0">
          <p className="text-xs italic line-clamp-1 mb-0.5">
            "{quote.text}"
          </p>
          <p className="text-[10px] opacity-70">
            — {quote.author}
          </p>
        </div>
      </div>
    </div>
  );
}
