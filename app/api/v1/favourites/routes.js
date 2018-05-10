import Router from "koa-router";
import favourites from "./index";

const router = new Router({ prefix: '/favourites' });

router.get("/:userId", async (ctx, next) => {
  const { userId } = ctx.params;
  const op = await favourites.getFavourites(userId);
  ctx.body = { favourites: op };
});

router.post("/", async (ctx, next) => {
  const { userId, favourite } = ctx.request.body;
  const op = await favourites.createFavourites(userId, favourite);
  ctx.body = { result: op.length };
});

export default router;
