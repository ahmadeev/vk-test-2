import type { CatCardResponseDto } from './dto.ts';
import { AbstractService } from '../abstractService.ts';

class CatsService extends AbstractService<CatCardResponseDto, never> {}

export const catsService = new CatsService('https://api.thecatapi.com/v1/images/search');
