import './CatCard.css';
import type { CatCardData } from '../../types/types.ts';
import Like from '../../shared/icons/favorite_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import LikeFilled from '../../shared/icons/favorite_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg?react';
import { Button } from '../../shared/ui/Button/Button.tsx';
import { useEffect, useState } from 'react';

export default function CatCard({ id, url }: CatCardData) {
    const [isFilled, setIsFilled] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isActive) {
            setIsFilled(true);
        }
    }, [isActive]);

    return (
        <div className="cat-card__container">
            <img
                className="cat-card__img"
                src={url}
                alt={`Cat #${id}`}
            />
            <Button
                className="cat-card__like"
                variant={'secondary'}
                onMouseEnter={() => { setIsFilled(true); }}
                onMouseLeave={() => { setIsFilled(isActive); }}
                onClick={() => { setIsActive((prev) => !prev); } }
            >
                {isFilled ? <LikeFilled /> : <Like />}
            </Button>
        </div>
    );
}
