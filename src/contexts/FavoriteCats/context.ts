import { createContext } from 'react';

interface FavoriteCatsContextTypes {
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
    favoriteIds: Set<string>;
}

export const FavoriteCatsContext = createContext<FavoriteCatsContextTypes | undefined>(undefined);
