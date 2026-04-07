import './CatCard.css';
import Like from '../../shared/icons/favorite_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import LikeFilled from '../../shared/icons/favorite_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg?react';
import { Button } from '../../shared/ui/Button/Button.tsx';
import { useState } from 'react';
import { useFavoriteCatsContext } from '../../contexts/FavoriteCats/hook.ts';
import { useMutation } from '@tanstack/react-query';
import { favoritesService } from '../../api/favorites/service.ts';
import { queryClient } from '../../api/queryClient.ts';
import type { CreateFavoriteRequestDto } from '../../api/favorites/dto.ts';
import { getUserId } from '../../shared/utils.ts';

interface CatCardProps {
    id: string;
    url: string;
    isLiked: boolean;
    favId?: number;
}

export default function CatCard({ id, url, isLiked, favId }: CatCardProps) {
    const [isFilled, setIsFilled] = useState(isLiked);
    const [isActive, setIsActive] = useState(isLiked);

    const { addFavorite, removeFavorite } = useFavoriteCatsContext();

    const addToFavs = useMutation({
        mutationFn: (favorite: CreateFavoriteRequestDto) => {
            return favoritesService.put(favorite);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
        onError: () => {
            removeFavorite(id);
        },
    });

    const removeFromFavs = useMutation({
        mutationFn: (favId: number | undefined) => {
            if (!favId) {
                return Promise.reject(new Error('no favorite id'));
            }

            return favoritesService.delete(favId);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
        onError: () => {
            setIsFilled(true);
            addFavorite(id);
        },
    });

    const toggleLikeButton = () => {
        setIsActive((prev) => {
            const newValue = !prev;

            if (newValue) {
                setIsFilled(true);
                addFavorite(id);
                addToFavs.mutate({ image_id: id, sub_id: getUserId() });
            } else {
                removeFavorite(id);
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
