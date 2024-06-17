import Wrapper from "layouts/Wrapper";
import React, { useCallback, useEffect, useState } from "react";
import SlidebarLeft from "./SlidebarLeft";
import SlidebarRight from "./SlidebarRight";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getCurrency } from "utils/currency";
import StarRating from "components/StarRating";
import ProductIDSlide from "./ProductIDSlide";
import Loading from "components/loading";
import ComparisonProductSlide from "./ComparisonProductSlide";

const ProductID = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearchParams = useCallback(
    (name, value) => {
      setSearchParams(
        (prev) => {
          prev.set(name, value);
          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );
  const { data: product, ...productResult } = useQuery({
    queryKey: [`product`, id, searchParams.get(`spid`)],
    queryFn: async () => {
      const url = `https://tiki.vn/api/v2/products/${id}?platform=web&version=3&spid=${searchParams.get(
        `spid`
      )}`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    },
  });
  const { data: new_pdp, ...new_pdpResult } = useQuery({
    queryKey: [`new_pdp`, id, searchParams.get(`spid`)],
    queryFn: async () => {
      const url = `https://tiki.vn/api/personalish/v2/pdp?strategy=new_pdp&mpid=${id}&spid=${searchParams.get(
        `spid`
      )}`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    },
  });
  const { data: comparisons, ...comparisonsResult } = useQuery({
    queryKey: [`comparisons`, id, searchParams.get(`spid`)],
    queryFn: async () => {
      const url = `https://api.tiki.vn/falcon/ext/v1/products/comparisons?mpid=${id}&spid=${searchParams.get(
        `spid`
      )}`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    },
  });
  const [option, setOption] = useState(null);
  useEffect(() => {
    const newOption = product?.configurable_products
      ? product?.configurable_products?.find(
          (item) => String(item?.id) === searchParams.get("spid")
        )
      : product;
    setOption(newOption);
  }, [searchParams, product]);

  if (
    productResult.isLoading ||
    new_pdpResult.isLoading ||
    comparisonsResult.isLoading
  )
    return <Loading />;
  console.log({ comparisons });
  return (
    <div>
      <Wrapper>
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="lg:max-w-[400px] w-full">
            <SlidebarLeft data={product} />
          </div>
          <div className="w-full overflow-hidden flex flex-col gap-4">
            <div className="rounded-lg p-4 bg-white">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {product?.badges_new?.map((item, index) => (
                    <div
                      key={item?.code}
                      style={{
                        width: item?.icon_width,
                        height: item?.icon_height,
                      }}
                    >
                      <img src={item?.icon} alt={item?.code} loading="lazy" />
                    </div>
                  ))}
                  <div className="text-xs">
                    Thương hiệu:{" "}
                    <span className="text-blue-500">
                      {product?.brand?.name}
                    </span>
                  </div>
                </div>
                <div className="font-semibold text-xl">{product?.name}</div>
                <div className="flex items-center gap-1">
                  <StarRating defaultValue={product?.rating_average} />
                  <span className="text-stone-500">
                    ({product?.review_count})
                  </span>
                  <span className="text-stone-500">|</span>
                  <span className="text-stone-500">
                    {product?.quantity_sold?.text}
                  </span>
                </div>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-semibold text-2xl text-red-500">
                  {getCurrency(product?.price)}
                </span>
                <span className="text-xs font-medium px-1 bg-stone-100 rounded-lg">
                  {product?.discount_rate}%
                </span>
              </div>
              {product?.configurable_products && (
                <div className="mt-4">
                  <div>
                    <div className="font-semibold mb-3">Cấu hình</div>
                    <div className="flex flex-wrap gap-y-2 gap-x-3">
                      {product?.configurable_products?.map((item) => (
                        <div
                          onClick={() => handleSearchParams(`spid`, item?.id)}
                          key={item?.id}
                          className={[
                            `flex items-center gap-2 px-3 py-1.5 border rounded-lg cursor-pointer`,
                            searchParams.get("spid") === String(item?.id) &&
                              `border-blue-500`,
                          ].join(" ")}
                        >
                          <div className="w-8">
                            <img
                              src={item?.thumbnail_url}
                              alt={item?.name}
                              loading="lazy"
                            />
                          </div>
                          <div>
                            {item?.option1} {item?.option2}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-lg p-4 bg-white xl:hidden">
              <div className="mt-4 flex flex-col gap-2">
                <button className="btn btn-danger">Mua ngay</button>
                <button className="btn btn-outline-primary">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-white">
              <div className="mb-2 font-semibold text-base">
                Dịch vụ bổ sung
              </div>
              <div>
                {product?.installment_info_v3?.map((item, index) => (
                  <div
                    key={index}
                    className="py-2 border-b last:border-none flex items-center gap-2"
                  >
                    <div className="w-10 h-10 overflow-hidden rounded-lg">
                      <img src={item?.icon} alt="" loading="lazy" />
                    </div>
                    <div
                      className="flex-1 "
                      dangerouslySetInnerHTML={{ __html: item?.title }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-4 bg-white">
              <ProductIDSlide
                title={`Sản phẩm tương tự`}
                items={
                  new_pdp?.widgets?.find(
                    (item) => item?.code === `similar_products`
                  )?.items
                }
              />
            </div>

            <div className="rounded-lg p-4 bg-white">
              <ProductIDSlide
                title={`Top Deals`}
                items={
                  new_pdp?.widgets?.find(
                    (item) => item?.code === `pdp_hero_sku`
                  )?.items
                }
              />
            </div>

            <div className="rounded-lg p-4 bg-white">
              <ComparisonProductSlide
                title={comparisons?.data?.title}
                items={comparisons?.data?.products}
              />
            </div>

            <div className="rounded-lg p-4 bg-white">
              <div className="mb-2 font-semibold text-base">
                Thông tin bảo hành
              </div>
              <div>
                {product?.warranty_info?.map((item, index) => (
                  <div
                    key={index}
                    className="py-2 border-b last:border-none flex items-center gap-2"
                  >
                    <span>{item?.name}: </span>
                    <span>{item?.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-4 bg-white">
              <div className="mb-2 font-semibold text-base">
                Dịch vụ bổ sung
              </div>
              <div>
                {product?.benefits?.map((item, index) => (
                  <div
                    key={index}
                    className="py-2 border-b last:border-none flex items-center gap-2"
                  >
                    <div className="w-5 h-5 overflow-hidden rounded-lg">
                      <img src={item?.icon} alt="" loading="lazy" />
                    </div>
                    <div
                      className="flex-1 "
                      dangerouslySetInnerHTML={{ __html: item?.text }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-4 bg-white">
              <div className="mb-2 font-semibold text-base">
                Thông tin chi tiết
              </div>
              <div>
                {product?.specifications?.map((item) =>
                  item?.attributes?.map((itemC) => (
                    <div
                      className="flex py-2 border-b last:border-none"
                      key={itemC?.code}
                    >
                      <div className="flex-1">{itemC?.name}</div>
                      <div
                        className="flex-1"
                        dangerouslySetInnerHTML={{ __html: itemC?.value }}
                      ></div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-lg p-4 bg-white">
              <div className="mb-2 font-semibold text-base">Mô tả sản phẩm</div>
              <div
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></div>
            </div>
          </div>
          <div className="max-w-[360px] w-full hidden xl:block">
            <SlidebarRight data={product} option={option} />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductID;
