import axios from "axios";
import env from "../configs/env-config.js";

export const tmdb_language = `en-US`;

const tmdbService = {
  options: {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ` + env.TMDB_TOKEN,
    },
    params: {
      language: tmdb_language,
    },
  },

  getCommentsMediaIdApi: async function ({ media_type, media_id, page = 1 }) {
    const url = `https://api.themoviedb.org/3/${media_type}/${media_id}/reviews?language=en-US&page=${page}`;
    const response = (await axios.get(url, this.options)).data;
    return response;
  },
  getMediaId: async function ({ media_type, media_id }) {
    const url = `https://api.themoviedb.org/3/${media_type}/${media_id}`;
    const response = await (await axios.get(url, this.options)).data;
    return response;
  },
};
export default tmdbService;
