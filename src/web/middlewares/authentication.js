import _ from 'lodash';
import jws from 'jws';
import config from 'config';
import StandarError from 'standard-error';

function checkNecessary(ctx, opt) {
  const { path } = ctx;
  const { includes, excludes } = opt;
  const isMatchExclude = _.findIndex(excludes, (regex) => regex.test(path)) >= 0;
  if (isMatchExclude === true) {
    return false;
  }
  return _.findIndex(includes, (regex) => regex instanceof RegExp && regex.test(path)) >= 0;
}

/**
 * User authenticate middleware.
 * Check if anyone has login using jwt mechanism.
 */
export default function genAuth(opt = {}) {
  const options = _.extend({ includes: [], excludes: [] }, opt);

  return async function authMiddleware(ctx, next) {
    // !1. 从 authorization 头部读取token
    const authToken = ctx.req.headers.authorization;
    let isTokenValid = false;
    // !2. 空值判断
    if (_.isString(authToken) && authToken.length > 0) {
      const token = authToken.replace('Bearer ', '');
      // !3. 解码 jwt 串
      const {
        // retrive signate algorithm
        header: { alg },
        payload
      } = jws.decode(token);
      // !4. [重要] 使用安全秘钥验证签名有效性
      isTokenValid = jws.verify(token, alg, config.get('JWT_SECRET'));
      if (isTokenValid) {
        ctx.currentUser = payload;
      }
    }
    const necessary = checkNecessary(ctx, options);
    if (necessary && isTokenValid === false) {
      throw new StandarError({ status: 401, message: 'Token invalid' });
    } else {
      await next();
    }
  };
}
