import { useFavoriteCatsContext } from '../../contexts/FavoriteCats/hook.ts';

export default function FavoriteCats() {
    const { favoriteIds } = useFavoriteCatsContext();

    return (
        <>
            {
                [...favoriteIds].map((id) => (
                    <p>{id}</p>
                ))
            }
        </>
    );
}
