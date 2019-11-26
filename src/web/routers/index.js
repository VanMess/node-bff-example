import Router from 'koa-router';
import PingRouter from './ping';

/*
 * Merge all routers in one place.
 */
export default new Router()
  // Registe ping routers
  .use(PingRouter.routes());
