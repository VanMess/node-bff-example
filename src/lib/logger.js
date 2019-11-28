// https://www.npmjs.com/package/bristol
// ! good support for mutil output
import { Bristol } from 'bristol';

// www.npmjs.com/package/palin
// ! A beautiful Bristol formatter
import palin from 'palin';

const logger = new Bristol();

logger.addTarget('console').withFormatter(palin, {
  timestamp: true,
  displayCodePlace: false
});

export default logger;
