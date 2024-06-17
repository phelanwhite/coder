import axios from "axios";
export async function getTmdbUrl(path, params) {
  const TMDB_API_KEY = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzdhYWQ5N2ZhZTEzZDg4NjQ3ODNmYzAxYzdlNDQyYSIsInN1YiI6IjY2MzQ5NjQ2YzM5MjY2MDEyOTZlMWFmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9JHeRc_Rs3VexUTV1T6kq2grrxHiq4b5zTkKwbWMM_M`;
  const url = `https://api.themoviedb.org/3/${path}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };
  const resp = await (
    await axios.get(url, {
      ...options,
      params,
    })
  ).data;
  return resp;
}
export function getTmdbImage(path) {
  return `https://image.tmdb.org/t/p/original/${path}`;
}
