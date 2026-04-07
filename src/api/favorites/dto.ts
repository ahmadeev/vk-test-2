export interface Favorite {
    id: number;
    image_id: string;
    sub_id: string;
    created_at: string;
    image: {
        id: string;
        url: string;
    }
}

export type FavoriteResponseDto = Favorite;
export interface CreateFavoriteRequestDto {
    image_id: string;
    sub_id: string;
}
