// import 'regenerator-runtime/runtime';
import config from 'config';
import logger from '../lib/logger';
import createServer from '../web/app';

async function run() {
  try {
    const app = await createServer();
    app.listen(config.get('PORT'), () => {
      const mode = config.util.getEnv('NODE_ENV');
      logger.debug(`Server listening on ${config.get('PORT')} in ${mode} mode`);
    });
  } catch (err) {
    logger.error('Error while starting up server', err);
    process.exit(1);
  }
}

run();
