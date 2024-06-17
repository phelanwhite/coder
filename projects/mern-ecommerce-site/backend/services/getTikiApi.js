import axios from "axios";

export const getProductSmartphone = async () => {
  const productList = [];

  for (let page = 1; page < 2; page++) {
    try {
      const url = `https://tiki.vn/api/personalish/v1/blocks/listings?limit=100&include=advertisement&is_mweb=1&aggregations=2&version=home-persionalized&_v=&trackity_id=5e02cba9-6868-6b2c-d48e-5518e3e19b13&urlKey=dien-thoai-smartphone&categoryId=1795&category=1795&page=${page}`;
      const resp = await (await axios.get(url)).data?.data;

      for (let index = 0; index < resp?.length; index++) {
        const url = `https://tiki.vn/api/v2/products/${resp[page]?.id}?platform=web&version=3`;
        const resp = await (await axios.get(url)).data;
        if (!resp) continue;
        productList.push(resp);
      }
      respIdList.push(resp);
    } catch (error) {
      continue;
    }
  }

  return productList;
};
