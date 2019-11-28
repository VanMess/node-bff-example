import Router from 'koa-router';
import PingRouter from './ping';
import UsersRouter from './users';

/*
 * Merge all routers in one place.
 */
export default new Router()
  // Registe ping routers
  .use(PingRouter.routes())
  .use(UsersRouter.routes());
