import _ from 'lodash';
import pathLib from 'path';
import send from 'koa-send';
import fs from 'fs-extra';

const STATIC_FOLD = pathLib.join(__dirname, '../../static');
const STATIC_ROOT_FILE = 'index.html';
const STATIC_SERVER_OPTIONS = {
  maxage: 365 * 24 * 60 * 60 * 1000,
  immutable: true,
  root: STATIC_FOLD,
  gzip: true,
  index: 'index.html'
};
const EXCLUDES = [/^\/api\/*/];

export default function genStatic() {
  return async function staticMiddleware(ctx, next) {
    if (ctx.method !== 'GET') {
      return next();
    }
    if (_.findIndex(EXCLUDES, (r) => r.test(ctx.path)) >= 0) {
      return next();
    }

    if (/\.\w+$/.test(ctx.path)) {
      // 带后缀的路径
      // 尝试找到对应文件
      const exists = await fs.pathExists(pathLib.join(STATIC_FOLD, ctx.path));
      if (exists === false) {
        return ctx.notFound(`Path "${ctx.path}" not found.`);
      }
      return send(ctx, ctx.path, STATIC_SERVER_OPTIONS);
    }
    // 不带后缀的路径，默认返回index文件
    // 用于兼容SPA场景
    return send(ctx, STATIC_ROOT_FILE, STATIC_SERVER_OPTIONS);
  };
}
