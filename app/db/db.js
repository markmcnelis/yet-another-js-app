import { randutil, unique } from "../util/index";

export default function createDb() {
  let store = {
    // userId: []
  };

  return {
    get: userId => delay().then(() => store[userId]),
    set: (userId, favourite) =>
      delay().then(() => {
        const o = store[userId]
          ? unique([...store[userId], favourite])
          : [favourite];
        store = Object.assign({}, store, { [`${userId}`]: o });
        return store[userId];
      }),
    find: favourite =>
      delay().then(() => {
        const indexes = Object.values(store)
          .map((arr, idx) => {
            if (arr.includes(favourite)) return idx;
          })
          .filter(i => Number.isInteger(i));
        const users = Object.keys(store).filter((i, idx) =>
          indexes.includes(idx)
        );
        return users;
      })
  };
}

export const db = createDb();

const delay = (ms = randutil(100, 400)) =>
  new Promise(resolve => setTimeout(resolve, ms));
