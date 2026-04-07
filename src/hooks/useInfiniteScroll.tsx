import { useInfiniteQuery } from '@tanstack/react-query';
import { FIRST_LIMIT, NEXT_LIMIT } from '../shared/utils.ts';
import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions<T> {
    queryKey: string[];
    queryFn: (pageParam: number, limit: number) => Promise<T[]>;
}

export function useInfiniteScroll<T>({ queryKey, queryFn }: UseInfiniteScrollOptions<T>) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useInfiniteQuery({
            queryKey,
            queryFn: ({ pageParam }) => {
                const limit = pageParam === 0 ? FIRST_LIMIT : NEXT_LIMIT;

                return queryFn(pageParam, limit);
            },
            initialPageParam: 0,
            getNextPageParam: (lastPage: T[], _2, lastPageParam) => {
                if (lastPageParam === 0) {
                    return lastPage.length < FIRST_LIMIT ? undefined : 2;
                }

                return lastPage.length < NEXT_LIMIT ? undefined : lastPageParam + 1;
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

    return { data, triggerRef, isFetchingNextPage, isLoading, isError };
}
