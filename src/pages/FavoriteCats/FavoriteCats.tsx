import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import CatCard from '../../components/CatCard/CatCard.tsx';
import { favoritesService } from '../../api/favorites/service.ts';
import { getUserId } from '../../shared/utils.ts';

const LIMIT = 10;

export default function FavoriteCats() {
    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['favorites'],
        queryFn: ({ pageParam }) => favoritesService.findAll(pageParam, LIMIT, getUserId()),
        initialPageParam: 0,
        getNextPageParam: (_1, _2, lastPageParam) => {
            return lastPageParam + LIMIT;
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

    return (
        <>
            <div className="all-cats__grid">
                {
                    cats.map(cat => {
                        return <CatCard
                            key={cat.image_id}
                            id={cat.image_id}
                            url={cat.image.url}
                            favId={cat.id}
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
