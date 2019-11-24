import { Bristol } from 'bristol';
import palin from 'palin';

const logger = new Bristol();

logger.addTarget('console').withFormatter(palin, {
  timestamp: true,
  displayCodePlace: false
});

export default logger;
