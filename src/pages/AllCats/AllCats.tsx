import './AllCats.css';
import CatCard from '../../components/CatCard/CatCard.tsx';
import { useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { catsService } from '../../api/cats/service.ts';
import { useFavorites } from '../../hooks/useFavorites.tsx';

const FIRST_LIMIT = 20;
const NEXT_LIMIT = 10;

export default function AllCats() {
    const {
        data,
        fetchNextPage,
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
        getNextPageParam: (_1, _2, lastPageParam) => {
            if (lastPageParam === 0) {
                return FIRST_LIMIT;
            }

            return lastPageParam + NEXT_LIMIT;
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
            {isLoading && <span>Котики загружаются!</span>}

            <div className="all-cats__grid">
                {
                    cats.map(cat => {
                        return <CatCard
                            key={cat.id}
                            id={cat.id}
                            url={cat.url}
                            isLiked={isFavorite(cat.id)}
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
