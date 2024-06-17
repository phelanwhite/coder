import axios from "axios";
export const getTikiApi = async (path, params) => {
  const url = `https://api.tiki.vn/${path}`;
  const resp = await axios.get(url, {
    params: { ...params },
  });
  return resp.data;
};
