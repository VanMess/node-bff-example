import _ from 'lodash';
import jws from 'jws';
import createAxios from './createAxios';
import { throw401 } from './echo';

async function syntaxCheck(token) {
  if (_.isNil(token) || _.isNil(jws.decode(token))) {
    return false;
  }
  return true;
}

async function semanticCheck(token) {
  const proxy = createAxios(token);
  const res = await proxy.post('/api/oauth2/verify_token', {}, { params: { access_token: token } });
  if (res.status === 0) {
    return true;
  }
  return false;
}

export default async function decodeAuthCode(token, remoteCheck = false) {
  const isSyntaxValid = await syntaxCheck(token);
  if (isSyntaxValid === false) {
    return throw401();
  }
  if (remoteCheck === true) {
    const authContent = await semanticCheck(token);
    if (authContent === false) {
      return throw401();
    }
  }
  const { payload } = jws.decode(token);
  return payload;
}
