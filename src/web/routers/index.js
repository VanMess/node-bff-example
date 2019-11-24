import Router from 'koa-router';
import PingRouter from './ping';

export default new Router()
  // Registe ping routers
  .use(PingRouter.routes());
