import './CatCard.css';
import Like from '../../shared/icons/favorite_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import LikeFilled from '../../shared/icons/favorite_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg?react';
import { Button } from '../../shared/ui/Button/Button.tsx';
import { useState } from 'react';
import { type InfiniteData, useMutation } from '@tanstack/react-query';
import { favoritesService } from '../../api/favorites/service.ts';
import { queryClient } from '../../api/queryClient.ts';
import type { CreateFavoriteRequestDto, Favorite } from '../../api/favorites/dto.ts';
import { getUserId } from '../../shared/utils.ts';
import { useFavorites } from '../../hooks/useFavorites.tsx';

interface CatCardProps {
    id: string;
    url: string;
}

export default function CatCard({ id, url }: CatCardProps) {
    const { getFavoriteId, isFavorite } = useFavorites();

    const isLiked = isFavorite(id);
    const favId = getFavoriteId(id);

    const [isHovered, setIsHovered] = useState(false);

    const addToFavs = useMutation({
        mutationFn: (favorite: CreateFavoriteRequestDto) => favoritesService.put(favorite),
        onMutate: (favorite) => {
            queryClient.setQueryData<InfiniteData<Favorite[]>>(
                ['favorites'],
                (old) => {
                    if (!old) return old;

                    const tempFavorite: Favorite = {
                        id: -1,
                        image_id: favorite.image_id,
                        image: { url },
                    } as Favorite;

                    return {
                        ...old,
                        pages: [[tempFavorite, ...old.pages[0]], ...old.pages.slice(1)],
                    };
                },
            );
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
        onError: () => {
            void queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });

    const removeFromFavs = useMutation({
        mutationFn: (favId: number) => favoritesService.delete(favId),
        onMutate: () => {
            queryClient.setQueryData<InfiniteData<Favorite[]>>(
                ['favorites'],
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        pages: old.pages.map(page =>
                            page.filter(fav => fav.image_id !== id),
                        ),
                    };
                },
            );
        },
        onError: () => {
            void queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });

    const toggleLike = () => {
        if (isLiked && favId !== undefined) {
            removeFromFavs.mutate(favId);
        } else if (!isLiked) {
            addToFavs.mutate({ image_id: id, sub_id: getUserId() });
        }
    };

    const isFilled = isHovered || isLiked;

    return (
        <div className="cat-card__container">
            <img className="cat-card__img" src={url} alt={`Cat #${id}`} />
            <Button
                className="cat-card__like"
                variant="secondary"
                onMouseEnter={() => { setIsHovered(true); }}
                onMouseLeave={() => { setIsHovered(false); }}
                onClick={toggleLike}
            >
                {isFilled ? <LikeFilled /> : <Like />}
            </Button>
        </div>
    );
}
