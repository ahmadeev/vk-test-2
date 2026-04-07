import { type ReactNode, useState } from 'react';
import { FavoriteCatsContext } from './context.ts';
import { loadFavorites } from '../../shared/utils.ts';
import type { FavoriteCats } from '../../shared/types/types.ts';

export const FavoriteCatsProvider = ({ children }: { children: ReactNode }) => {
    const [favoriteIds, setFavoriteIds] = useState(() => loadFavorites());

    const addFavorite = (id: string) => {
        if (favoriteIds.has(id)) {
            return;
        }

        setFavoriteIds((prev: FavoriteCats) => new Set([...prev, id]) as FavoriteCats);
    };
    const removeFavorite = (id: string) => {
        if (!favoriteIds.has(id)) {
            return;
        }

        const list = structuredClone(favoriteIds);

        list.delete(id);

        setFavoriteIds(list);
    };
    const isFavorite = (id: string) => {
        return favoriteIds.has(id);
    };

    return (
        <FavoriteCatsContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoriteCatsContext.Provider>
    );
};