import Router from 'koa-router';

const route = new Router();

route.get('/ping', (ctx) => ctx.ok('pong'));

route.get('/', (ctx) => ctx.ok('Hello World'));

export default route;
