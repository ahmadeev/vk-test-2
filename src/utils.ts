export function loadFavorites() {
    return new Set(localStorage.getItem('favorite-cat-ids') ?? []);
}
