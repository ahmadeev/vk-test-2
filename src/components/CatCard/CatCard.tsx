import './CatCard.css';
import Like from '../../shared/icons/favorite_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import LikeFilled from '../../shared/icons/favorite_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg?react';
import { Button } from '../../shared/ui/Button/Button.tsx';
import { useState } from 'react';
import { useFavoriteCatsContext } from '../../contexts/FavoriteCats/hook.ts';
import type { CatCard } from '../../api/cats/dto.ts';
import { useMutation } from '@tanstack/react-query';
import { favoritesService } from '../../api/favorites/service.ts';
import { queryClient } from '../../api/queryClient.ts';
import type { CreateFavoriteRequestDto } from '../../api/favorites/dto.ts';
import { getUserId } from '../../shared/utils.ts';

type CatCardProps = CatCard & { isLiked: boolean };

export default function CatCard({ id, url, isLiked }: CatCardProps) {
    const [isFilled, setIsFilled] = useState(isLiked);
    const [isActive, setIsActive] = useState(isLiked);

    const { addFavorite, removeFavorite } = useFavoriteCatsContext();

    const mutation = useMutation({
        mutationFn: (favorite: CreateFavoriteRequestDto) => {
            return favoritesService.put(favorite);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });

    const toggleLikeButton = () => {
        setIsActive((prev) => {
            const newValue = !prev;

            if (newValue) {
                setIsFilled(true);
                addFavorite(id);
            } else {
                removeFavorite(id);
            }

            return newValue;
        });

        mutation.mutate({ image_id: id, sub_id: getUserId() });
    };

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
                onClick={toggleLikeButton}
            >
                {isFilled ? <LikeFilled /> : <Like />}
            </Button>
        </div>
    );
}
