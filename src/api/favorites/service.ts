import type { CreateFavoriteRequestDto, FavoriteResponseDto } from './dto.ts';
import { AbstractService } from '../abstractService.ts';

class FavoritesService extends AbstractService<FavoriteResponseDto, CreateFavoriteRequestDto> {}

export const favoritesService = new FavoritesService('https://api.thecatapi.com/v1/favourites');
