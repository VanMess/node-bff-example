import axios from 'axios';

const MOVIE_SERVICE_URL = '';
const COMMENT_SERVICE_URL = '';
const ACTOR_SERVICE_URL = '';
const BOOKING_SERVICE_URL = '';

export async function fetchMovieDetailSerially(movieId) {
  const { data: movie } = await axios.get(`${MOVIE_SERVICE_URL}/api/v1/movies/${movieId}`);
  const { data: comments } = await axios.get(
    `${COMMENT_SERVICE_URL}/api/v1/movies/${movieId}/comments`
  );
  const { data: booking } = await axios.get(
    `${BOOKING_SERVICE_URL}/api/v1/movies/${movieId}/comments`
  );
  const { actors } = movie;
  const actorList = [];
  for (let i = 0; i < actors.length; i += 1) {
    const { actorId } = actors[i];
    /* eslint-disable no-await-in-loop */
    const { data: actor } = await axios.get(`${ACTOR_SERVICE_URL}/api/v1/actors/${actorId}`);
    actorList.push(actor);
  }
  return { ...movie, actors: actorList, comments, booking };
}

export async function fetchMovieDetailParallel(movieId) {
  const [movieDetail, { data: comments }, { data: booking }] = await Promise.all([
    // 1.1 获取电影详情
    async () => {
      const { data: movie } = await axios.get(`${MOVIE_SERVICE_URL}/api/v1/movies/${movieId}`);
      const { actors } = movie;
      // 2. 根据电影详情接口返回的结果
      const actorList = await Promise.all(
        actors.map(async (actorId) => {
          const { data: actor } = await axios.get(`${ACTOR_SERVICE_URL}/api/v1/actors/${actorId}`);
          return actor;
        })
      );
      return { ...movie, actors: actorList };
    },
    // 1.2 获取电影评论
    axios.get(`${COMMENT_SERVICE_URL}/api/v1/movies/${movieId}/comments`),
    // 1.3 获取电影票房数据
    axios.get(`${BOOKING_SERVICE_URL}/api/v1/movies/${movieId}/comments`)
  ]);
  return { ...movieDetail, comments, booking };
}
