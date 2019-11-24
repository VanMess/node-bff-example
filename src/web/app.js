import * as http from 'http';
import Koa from 'koa';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import logger from '../lib/logger';

import errorHandler from './middlewares/error-handler';
import notFoundHandler from './middlewares/not-found';
import logHandler from './middlewares/log';
import routers from './routers';

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<http.Server>} The configured app.
 */
export default async function createServer() {
  logger.debug('Creating server...');
  const app = new Koa();

  app
    .use(logHandler)
    // Top middleware is the error handler.
    .use(errorHandler)
    // Adds ctx.ok(), ctx.notFound(), etc..
    .use(respond())
    // Compress all responses.
    .use(compress())
    .use(routers.routes())
    // Parses request bodies.
    .use(bodyParser())
    // Default handler when nothing stopped the chain.
    .use(notFoundHandler);

  // Creates a http server ready to listen.
  const server = http.createServer(app.callback());

  // Add a `close` event listener so we can clean up resources.
  server.on('close', () => {
    // You should tear down database connections, TCP connections, etc
    // here to make sure Jest's watch-mode some process management
    // tool does not release resources.
    logger.debug('Server closing, bye!');
  });

  logger.debug('Server created, ready to listen', { scope: 'startup' });
  return server;
}
