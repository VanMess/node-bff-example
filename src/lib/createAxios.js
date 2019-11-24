import Axios from 'axios';

export default function createAxios(token) {
  const instance = Axios.create({
    timeout: 30000
  });
  instance.interceptors.request.use((cfg) => {
    // eslint-disable-next-line
    cfg.headers.Authorization = token;
    return cfg;
  });

  return instance;
}
