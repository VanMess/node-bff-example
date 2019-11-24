import StandarError from 'standard-error';
import HTTP_CODES from 'http-status-codes';

/*
 * Throw 401 exception to client.
 * It always means the request come without login
 */
export function throw401() {
  throw new StandarError({
    status: HTTP_CODES.UNAUTHORIZED,
    message: 'Unauthorized'
  });
}
