import { favoritesService } from '../../api/favorites/service.ts';
import { getUserId } from '../../shared/utils.ts';
import type { CatCardData } from '../../api/cats/dto.ts';
import CatGrid from '../../components/CatGrid/CatGrid.tsx';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.tsx';
import type { Favorite } from '../../api/favorites/dto.ts';

export default function FavoriteCats() {
    const {
        data, triggerRef, isFetchingNextPage, isLoading, isError,
    } = useInfiniteScroll<Favorite>({
        queryKey: ['favorites'],
        queryFn: (pageParam: number, limit: number) => {
            return favoritesService.findAll(pageParam, limit, getUserId(), 'DESC');
        },
    });

    const cats = data?.pages.flatMap(page => page).map(fav => ({
        id: fav.image_id,
        url: fav.image.url,
    } as CatCardData)) ?? [];

    return (
        <>
            <CatGrid
                cats={cats}
                triggerRef={triggerRef}
                isError={isError}
                isLoading={isLoading}
                isFetchingNextPage={isFetchingNextPage}
            />
        </>
    );
}
