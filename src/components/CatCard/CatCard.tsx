import './CatCard.css';
import Like from '../../shared/icons/favorite_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import LikeFilled from '../../shared/icons/favorite_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg?react';
import { Button } from '../../shared/ui/Button/Button.tsx';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { favoritesService } from '../../api/favorites/service.ts';
import { queryClient } from '../../api/queryClient.ts';
import type { CreateFavoriteRequestDto } from '../../api/favorites/dto.ts';
import { getUserId } from '../../shared/utils.ts';
import { useFavorites } from '../../hooks/useFavorites.tsx';

interface CatCardProps {
    id: string;
    url: string;
}

export default function CatCard({ id, url }: CatCardProps) {
    const { getFavoriteId, isFavorite } = useFavorites();

    const isLiked = isFavorite(id);

    const [isFilled, setIsFilled] = useState(isLiked);
    const [isActive, setIsActive] = useState(isLiked);

    const favId = getFavoriteId(id) as number;

    const addToFavs = useMutation({
        mutationFn: (favorite: CreateFavoriteRequestDto) => {
            return favoritesService.put(favorite);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['favorites'] });
            setIsFilled(true);
        },
    });

    const removeFromFavs = useMutation({
        mutationFn: (favId: number) => {
            return favoritesService.delete(favId);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
        onError: () => {
            setIsFilled(true);
        },
    });

    const toggleLikeButton = () => {
        setIsActive((prev) => {
            const newValue = !prev;

            if (newValue) {
                addToFavs.mutate({ image_id: id, sub_id: getUserId() });
            } else {
                removeFromFavs.mutate(favId);
            }

            return newValue;
        });
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
