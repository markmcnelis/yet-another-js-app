import { db } from '../../../db/index';

export default async function getFavourites(userId, favourites) {
    return await db.get(userId);
}