import Koa from 'koa';
import * as http from 'http';

const mockFile = 'http://img9.doubanio.com/view/photo/s_ratio_poster/public/p2574278284.webp';

function fileProxyByStream(ctx) {
  // http.request 是一个异步操作，这里必须返回promise对象
  // 确保符合洋葱模型的规则
  return new Promise((r, j) => {
    const req = http.request(new URL(mockFile), (res) => {
      ctx.status = 200;
      res.pipe(ctx.res);
      // http.request 结束，触发 end 方法时，promise 再执行resolve
      res.on('end', r);
    });
    // 出现任何异常时，直接讲异常抛回给客户端
    req.on('error', j);
    // 执行 end 方法，立即发出请求
    req.end();
  });
}

function run() {
  const app = new Koa();
  app.use(fileProxyByStream);
  const server = http.createServer(app.callback());
  server.listen('8089', () => {
    console.log('server is listening at 8089');
  });
}

run();
