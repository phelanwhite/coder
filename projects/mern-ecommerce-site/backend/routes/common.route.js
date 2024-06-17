import express from "express";
import slug from "slug";
import axios from "axios";
import categoryModel from "../models/category.model.js";
import brandModel from "../models/brand.model.js";
import productModel from "../models/product.model.js";

const commonRoute = express.Router();

commonRoute.post("/add-many-category", async (req, res, next) => {
  try {
    const url = `https://api.tiki.vn/raiden/v2/menu-config?trackity_id=44ddcb81-2466-b6bc-8d5e-042a7980dc43&_rf=rotate_by_ctr`;
    const resp = await (await axios.get(url)).data;
    const getData = resp?.menu_block?.items?.map((item) => {
      const newData = {
        name: item?.text,
        slug: slug(item?.text),
        thumbnail: item?.icon_url,
      };
      return newData;
    });
    const dataResp = await categoryModel.insertMany(getData);
    res.status(201).json(dataResp);
  } catch (error) {
    next(error);
  }
});
commonRoute.post("/add-many-brand", async (req, res, next) => {
  try {
    const url = `https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=5e02cba9-6868-6b2c-d48e-5518e3e19b13&category=1795&page=1&urlKey=dien-thoai-smartphone`;
    const resp = await (await axios.get(url)).data;
    const getData = resp?.filters
      ?.find((item) => item?.code === "brand")
      ?.values?.map((item) => {
        const newData = {
          name: item?.display_value,
          slug: slug(item?.display_value),
          // thumbnail: item?.icon_url,
        };
        return newData;
      });
    const dataResp = await brandModel.insertMany(getData);
    res.status(201).json(dataResp);
  } catch (error) {
    next(error);
  }
});
commonRoute.use("/add-many-product-category-brand", async (req, res, next) => {
  try {
    // brand
    async function brandF() {
      const url = `https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=5e02cba9-6868-6b2c-d48e-5518e3e19b13&category=1795&page=1&urlKey=dien-thoai-smartphone`;
      const resp = await (await axios.get(url)).data;
      const getData = resp?.filters
        ?.find((item) => item?.code === "brand")
        ?.values?.map((item) => {
          const newData = {
            name: item?.display_value,
            slug: slug(item?.display_value),
            // thumbnail: item?.icon_url,
          };
          return newData;
        });
      await brandModel.insertMany(getData);
    }
    // product
    async function productF(categoryID, pageCount) {
      const getBrandData = await brandModel.find();
      let productList = [];

      for (let page = 1; page <= pageCount; page++) {
        try {
          const url = `https://tiki.vn/api/personalish/v1/blocks/listings?limit=100&include=advertisement&is_mweb=1&aggregations=2&version=home-persionalized&_v=&trackity_id=5e02cba9-6868-6b2c-d48e-5518e3e19b13&urlKey=dien-thoai-smartphone&categoryId=1795&category=${categoryID}&page=${page}`;
          const resp = await (await axios.get(url)).data?.data;
          for (let index = 0; index < resp?.length; index++) {
            const url = `https://tiki.vn/api/v2/products/${resp?.[index]?.id}?platform=web&version=3`;
            const respC = await (await axios.get(url)).data;

            if (!respC) continue;
            productList.push(respC);
          }
        } catch (error) {
          continue;
        }
      }

      const newProductList = productList?.map((product) => {
        const newProduct = {
          name: product?.name,
          slug: slug(product?.name),
          price: product?.price,
          thumbnail: product?.thumbnail_url,
          images: product?.images?.map((item) => item.thumbnail_url),
          review_count: product?.review_count,
          rating_average: product?.rating_average,
          description: product?.description,
          specifications: product?.specifications,
          options: product?.configurable_products?.map((item) => ({
            option1: item?.option1,
            option2: item?.option2,
            price: item?.price,
            thumbnail: item?.thumbnail_url,
          })),

          brand: getBrandData.find(
            (item) =>
              item?.name?.toLowerCase() === product?.brand?.name?.toLowerCase()
          )?._id,
          // category: query?._id,
        };
        return newProduct;
      });

      const productResp = await productModel.insertMany(newProductList);
      return productResp;
    }

    await brandF();
    const product = await productF(`1795`, 1);

    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
});
export default commonRoute;
