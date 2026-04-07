import './AllCats.css';
import CatCard from '../../components/CatCard/CatCard.tsx';
import { useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { catsService } from '../../api/cats/service.ts';

const LIMIT = 10;

export default function AllCats() {
    const {
        data: cats,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['cats'],
        queryFn: ({ pageParam }) => catsService.findAll(pageParam, LIMIT),
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

    const allCats = cats?.pages.flatMap(page => page) ?? [];

    return (
        <>
            <div className="all-cats__grid">
                {
                    allCats.map(cat => {
                        return <CatCard
                            key={cat.id}
                            {...cat}
                            isLiked={false} // todo: чекать лайки до установки false
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
