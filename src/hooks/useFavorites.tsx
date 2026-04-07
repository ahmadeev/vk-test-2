import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { favoritesService } from '../api/favorites/service.ts';
import { getUserId } from '../shared/utils.ts';

const LIMIT = 10;
const userId = getUserId();

export const useFavorites = () => {
    const {
        data,
    } = useInfiniteQuery({
        queryKey: ['favorites'],
        queryFn: ({ pageParam }) => favoritesService.findAll(pageParam, LIMIT, userId),
        initialPageParam: 0,
        getNextPageParam: (_1, _2, lastPageParam) => {
            return lastPageParam + LIMIT;
        },
    });

    const favorites = useMemo(() => {
        return new Map(
            data?.pages.flatMap(page =>
                page.map(fav => [fav.image_id, fav.id]),
            ) ?? [],
        );
    }, [data]);

    const isFavorite = (id: string) => {
        return favorites.has(id);
    };

    const getFavoriteId = (id: string) => {
        return favorites.get(id);
    };

    return {
        isFavorite,
        getFavoriteId,
    };
};
