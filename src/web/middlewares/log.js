import _ from 'lodash';
import HTTP_STATUS from 'http-status-codes';
import logger from '../../lib/logger';

// extract from morgan
// https://github.com/expressjs/morgan/blob/master/index.js#L465
function getip(req) {
  return (
    // eslint-disable-next-line
    req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress) || undefined
  );
}

function parseLogLevel(status) {
  if (_.isNumber(status) === false) {
    return 'error';
  }
  if (status < HTTP_STATUS.BAD_REQUEST) {
    return 'info';
  }
  return 'error';
}

export default function koaLogger(ctx, next) {
  const start = Date.now();

  const retriveLog = () => {
    const end = Date.now();
    const duration = end - start;
    const { req, response, status, method } = ctx;
    const ip = getip(req);
    const message = `${status} "${ctx.protocol.toUpperCase()} ${method} ${ctx.url}" ${
      response.length
    } - ${duration} - ${ip}`;
    logger[parseLogLevel(status)](message);
  };

  return next()
    .then(retriveLog)
    .catch(retriveLog);
}
