export function getUserId() {
    let userId = localStorage.getItem('user-id');

    if (!userId) {
        userId = crypto.randomUUID();

        localStorage.setItem('user-id', userId);
    }

    return userId;
}

export const FIRST_LIMIT = 20;
export const NEXT_LIMIT = 10;
