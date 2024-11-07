import axios from "axios";

export const getCountries = async () => {
  const url = `https://restcountries.com/v3.1/all`;
  return (await axios.get(url)).data;
};
