import { axiosClient } from './axiosClient.ts';
import type { WithId } from '../shared/types/types.ts';

export abstract class AbstractService<RQ, RS> {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async findAll(page: number, limit: number, subId?: string, order?: 'ASC' | 'DESC'): Promise<RQ[]> {
        try {
            const res = await axiosClient.get<RQ[]>(this.url, {
                params: {
                    page,
                    limit,
                    sub_id: subId,
                    order,
                },
            });

            return res.data;
        } catch (error) {
            console.log(error);

            throw new Error('Ошибка загрузки');
        }
    }

    async put(obj: RS): Promise<WithId | null> {
        try {
            const res = await axiosClient.post<WithId>(this.url, obj);

            return res.data;
        } catch (error) {
            console.log(error);

            throw new Error('Ошибка создания');
        }
    }

    async delete(id: string | number): Promise<unknown> {
        try {
            const res = await axiosClient.delete<unknown>(`${this.url}/${String(id)}`);

            return res.data;
        } catch (error) {
            console.log(error);

            throw new Error('Ошибка удаления');
        }
    }
}