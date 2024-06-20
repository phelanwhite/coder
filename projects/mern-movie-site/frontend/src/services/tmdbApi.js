import axios from "axios";
export async function getTmdbUrl(path, params) {
  const TMDB_API_KEY = await (await axios.get(`/common/get-tmdb-token`)).data;
  const url = `https://api.themoviedb.org/3/${path}?${params}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY?.result}`,
    },
  };
  const resp = await (
    await axios.get(url, {
      ...options,
    })
  ).data;
  return resp;
}
export function getTmdbImage(path) {
  return `https://image.tmdb.org/t/p/original/${path}`;
}
