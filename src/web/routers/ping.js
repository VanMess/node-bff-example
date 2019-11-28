import Router from 'koa-router';

const route = new Router();

route.get('/api/ping', (ctx) => ctx.ok('pong'));

export default route;
