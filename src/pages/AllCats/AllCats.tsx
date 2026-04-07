import { catsService } from '../../api/cats/service.ts';
import CatGrid from '../../components/CatGrid/CatGrid.tsx';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.tsx';
import type { CatCardData } from '../../api/cats/dto.ts';

export default function AllCats() {
    const {
        data, triggerRef, isFetchingNextPage, isLoading, isError,
    } = useInfiniteScroll<CatCardData>({
        queryKey: ['cats'],
        queryFn: (pageParam: number, limit: number) => {
            return catsService.findAll(pageParam, limit);
        },
    });

    const cats = data?.pages.flatMap(page => page) ?? [];

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
