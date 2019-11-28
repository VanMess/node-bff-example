import _ from 'lodash';
import config from 'config';
import StandarError from 'standard-error';
import logger from '../../lib/logger';

/**
 * Error handler middleware.
 * Uses status code from error if present.
 */
export default async function errorHandler(ctx, next) {
  // ! Catch uncaught exceptions and format that.
  try {
    await next();
  } catch (err) {
    let exception;
    // upstream proxy error
    if (_.isNil(err.response) === false) {
      const {
        response: { status, data }
      } = err;
      ctx.status = status;
      ctx.body = data;
      exception = new StandarError({ status, message: data });
    } else {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = err.toJSON
        ? err.toJSON()
        : {
            message: err.message,
            status: ctx.status,
            stack: err.stack
          };
      if (process.env.NODE_ENV === 'production') {
        delete ctx.body.stack;
      }
      exception = err;
    }
    logger.error('Error in request', exception);
  }
}
