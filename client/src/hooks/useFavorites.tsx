import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'mexico_relocation_favorites';

type CityId = string;

export function useFavorites() {
  const [favorites, setFavorites] = useState<CityId[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Could not load favorites from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Could not save favorites to localStorage", e);
    }
  }, [favorites]);

  const toggleFavorite = (cityId: CityId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(cityId)) {
        return prevFavorites.filter(id => id !== cityId);
      } else {
        if (prevFavorites.length >= 3) {
          alert("You can only save up to 3 cities for comparison. Please remove one first.");
          return prevFavorites;
        }
        return [...prevFavorites, cityId];
      }
    });
  };
  
  const isFavorite = (cityId: CityId) => favorites.includes(cityId);

  return { favorites, toggleFavorite, isFavorite };
}
