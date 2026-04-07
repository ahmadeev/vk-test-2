import './AllCats.css';
import CatCard from '../../components/CatCard/CatCard.tsx';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { catsService } from '../../api/cats/service.ts';
import { useFavorites } from '../../hooks/useFavorites.tsx';
import CatCardSkeleton from '../../components/CatCard/CatCardSkeleton/CatCardSkeleton.tsx';

const FIRST_LIMIT = 20;
const NEXT_LIMIT = 10;

export default function AllCats() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ['cats'],
        queryFn: ({ pageParam }) => {
            const limit = pageParam === 0 ? FIRST_LIMIT : NEXT_LIMIT;

            return catsService.findAll(pageParam, limit);
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, _2, lastPageParam) => {
            if (lastPageParam === 0) {
                if (lastPage.length < FIRST_LIMIT) {
                    return undefined;
                }

                return 2;
            }

            if (lastPage.length < NEXT_LIMIT) {
                return undefined;
            }

            return lastPageParam + 1;
        },
    });

    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = triggerRef.current;

        if (!node) return;

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage().catch((err: unknown) => { console.error(err); });
            }
        });

        obs.observe(node);

        return () => { obs.disconnect(); };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const cats = data?.pages.flatMap(page => page) ?? [];

    const { isFavorite } = useFavorites();

    if (isError) {
        return (
            <>
                <span>Котики не были загружены :(</span>
            </>
        );
    }

    return (
        <>
            <div className="all-cats__grid">
                {isLoading
                    ? Array.from({ length: FIRST_LIMIT }).map((_, i) => (
                        <CatCardSkeleton key={i} />
                    ))
                    : cats.map(cat => (
                        <CatCard
                            key={cat.id}
                            id={cat.id}
                            url={cat.url}
                            isLiked={isFavorite(cat.id)}
                        />
                    ))
                }
                {isFetchingNextPage && (
                    Array.from({ length: NEXT_LIMIT }).map((_, i) => (
                        <CatCardSkeleton key={`next-${String(i)}`} />
                    ))
                )}
            </div>
            <div ref={triggerRef} className="all-cats__info-loader">
                {isFetchingNextPage && '... загружаем еще котиков ...'}
            </div>
        </>
    );
}
