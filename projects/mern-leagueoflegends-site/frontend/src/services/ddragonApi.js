import axios from "axios";
const ddragonApi = {
  getChampions: async function () {
    const url = `https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json`;
    const resp = await axios.get(url);
    return resp.data;
  },
  getChampionID: async function (id = `Aatrox`) {
    const url = `https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion/${id}.json`;
    const resp = await axios.get(url);
    return resp.data;
  },
  getItems: async function () {
    const url = `https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/item.json`;
    const resp = await axios.get(url);
    return resp.data;
  },
  getImageChampionSplash: (id = `Aatrox`) => {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`;
  },
  getImageChampionLoading: (id = `Aatrox`) => {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`;
  },
  getImageItem: (id = `1001`) => {
    return `https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/${id}`;
  },
};

export default ddragonApi;
