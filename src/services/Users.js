import config from 'config';
import createAxios from '../lib/createAxios';

// Mock API from https://www.mockable.io/a/#/space/demo3533033/rest
const BACKEND_USERS = config.get('BACKEND.USER_MANAGER');
const BACKEND_ROLES = config.get('BACKEND.ROLE_MANAGER');

export default class BizUsers {
  constructor(token) {
    this.$token = token;
  }

  async fetchUsers() {
    const axios = createAxios(this.$token);
    const {
      data: { data: users }
    } = await axios.get(`${BACKEND_USERS}/v1/users`);
    const payload = await Promise.all(
      users.map(async (user) => {
        const { data: roles } = await axios.get(`${BACKEND_ROLES}/v1/users/${user.id}/roles`);
        return { ...user, roles };
      })
    );
    return payload;
  }
}
