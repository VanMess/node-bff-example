import jws from 'jws';

// 安全密钥
const secret = 'my secret';

// 1. 签名
function sign(payload) {
  const header = { alg: 'HS256' };
  return jws.sign({ payload, header, secret });
}

const token = sign({ name: 'Tec', admin: true });
console.log(token);

// 2. 解析
function decode() {
  return jws.decode(token);
}

console.log(decode(token));

// 3. 验证
function verify(token) {
  const { header } = decode(token);
  return jws.verify(token, header.alg, secret);
}

console.log(verify(token));

// 3.1 模拟篡改token
function modifyToken() {
  const token = sign({ name: 'Tec', admin: true });
  console.log(token);
  const fakeToken = `a${token.substr(1)}`;
  console.log(fakeToken);
  return verify(fakeToken);
}

console.log(modifyToken());
