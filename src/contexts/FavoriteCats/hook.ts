import { useContext } from 'react';
import { FavoriteCatsContext } from './context.ts';

export const useFavoriteCatsContext = () => {
    const context = useContext(FavoriteCatsContext);

    if (!context) {
        throw new Error('useFavoriteCatsContext must be used within FavoriteCatsProvider');
    }

    return context;
};
