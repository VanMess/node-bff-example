import Router from 'koa-router';
import BizUsers from '../../services/Users';

const route = new Router();

route.get('/api/users', async (ctx) => {
  const authToken = ctx.req.headers.authorization;
  const service = new BizUsers(authToken);
  const users = await service.fetchUsers();
  ctx.ok({ status: 200, data: users });
});

export default route;
