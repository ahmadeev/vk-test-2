import './CatGrid.css';
import CatCardSkeleton from '../CatCard/CatCardSkeleton/CatCardSkeleton.tsx';
import type { CatCardData } from '../../api/cats/dto.ts';
import { type RefObject } from 'react';
import { FIRST_LIMIT, NEXT_LIMIT } from '../../shared/utils.ts';
import CatCard from '../CatCard/CatCard.tsx';

interface CatGridProps {
    cats: CatCardData[];
    triggerRef: RefObject<HTMLDivElement | null>;
    isError: boolean;
    isLoading: boolean;
    isFetchingNextPage: boolean;
}

export default function CatGrid({ cats, triggerRef, isError, isLoading, isFetchingNextPage }: CatGridProps) {
    if (isError) {
        return (
            <>
                <span>Котики не были загружены :(</span>
            </>
        );
    }

    return (
        <>
            <div className="cats-roll__grid">
                {isLoading
                    ? Array.from({ length: FIRST_LIMIT }).map((_, i) => (
                        <CatCardSkeleton key={i} />
                    ))
                    : cats.map(cat => (
                        <CatCard
                            key={cat.id}
                            id={cat.id}
                            url={cat.url}
                        />
                    ))
                }
                {isFetchingNextPage && (
                    Array.from({ length: NEXT_LIMIT }).map((_, i) => (
                        <CatCardSkeleton key={`next-${String(i)}`} />
                    ))
                )}
            </div>
            <div ref={triggerRef} className="cats-roll__info-loader">
                {isFetchingNextPage && '... загружаем еще котиков ...'}
            </div>
        </>
    );
}
