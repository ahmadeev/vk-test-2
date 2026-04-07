import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import CatCard from '../../components/CatCard/CatCard.tsx';
import { favoritesService } from '../../api/favorites/service.ts';
import { getUserId } from '../../shared/utils.ts';

const FIRST_LIMIT = 20;
const NEXT_LIMIT = 10;

export default function FavoriteCats() {
    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
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

    const [, setObserver] = useState<IntersectionObserver>();

    const setEmptyDiv = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    fetchNextPage().then().catch((err: unknown) => { console.error(err); });
                }
            });

            obs.observe(node);
            setObserver(obs);
        }
    }, [fetchNextPage]);

    const cats = data?.pages.flatMap(page => page) ?? [];

    if (isError) {
        return (
            <>
                <span>Котики не были загружены :(</span>
            </>
        );
    }

    return (
        <>
            {isLoading && <span>Котики загружаются!</span>}

            <div className="all-cats__grid">
                {
                    cats.map(cat => {
                        return <CatCard
                            key={cat.image_id}
                            id={cat.image_id}
                            url={cat.image.url}
                            isLiked={true}
                        />;
                    })
                }
            </div>
            <div
                className="all-cats__info-loader"
                ref={setEmptyDiv}
            >{isFetchingNextPage && '... загружаем еще котиков ...'}</div>
        </>
    );
}
