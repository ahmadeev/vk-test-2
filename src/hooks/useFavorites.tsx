import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { favoritesService } from '../api/favorites/service.ts';
import { getUserId } from '../shared/utils.ts';

const FIRST_LIMIT = 20;
const NEXT_LIMIT = 10;

export const useFavorites = () => {
    const {
        data,
    } = useInfiniteQuery({
        queryKey: ['favorites'],
        queryFn: ({ pageParam }) => {
            const limit = pageParam === 0 ? FIRST_LIMIT : NEXT_LIMIT;

            return favoritesService.findAll(pageParam, limit, getUserId());
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, _2, lastPageParam) => {
            if (lastPageParam === 0) {
                return 2;
            }

            if (lastPage.length === 0) {
                return lastPageParam;
            }

            return lastPageParam + 1;
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
