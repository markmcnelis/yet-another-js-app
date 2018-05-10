import { db } from "../../../db/index";

export default async function createFavourites(userId, favourites) {
  return await db.set(userId, favourites);
}
