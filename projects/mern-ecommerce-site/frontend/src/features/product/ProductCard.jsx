import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { getCurrency } from "utils/currency";

const ProductCard = ({ item }) => {
  const getBadges_new = useCallback(
    (code) => {
      return item?.badges_new?.find((item) => item.code === code);
    },
    [item]
  );
  return (
    <Link
      to={`/product-id/${item.id}?spid=${
        item?.seller_product_id || item?.default_spid
      }`}
      className="bg-white inline-block rounded-lg border overflow-hidden transition hover:shadow"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={item?.thumbnail_url}
          alt={item?.thumbnail_url}
          loading="lazy"
        />
      </div>
      <div className="p-2 flex flex-col justify-between gap-1.5">
        <div>
          <div className="h-11 flex flex-col gap-1">
            <div
              style={{
                width: getBadges_new(`authentic_brand`)?.icon_width,
                height: getBadges_new(`authentic_brand`)?.icon_height,
              }}
            >
              <img
                src={getBadges_new(`authentic_brand`)?.icon}
                alt={getBadges_new(`authentic_brand`)?.icon}
              />
            </div>
            <div
              style={{
                width: getBadges_new(`is_hero`)?.icon_width,
                height: getBadges_new(`is_hero`)?.icon_height,
              }}
            >
              <img
                src={getBadges_new(`is_hero`)?.icon}
                alt={getBadges_new(`is_hero`)?.icon}
              />
            </div>
          </div>
          <div className="mt-1 h-[52px] flex flex-col gap-1">
            <div className="text-xs line-clamp-2 font-semibold">
              {item?.name}
            </div>
          </div>
          <div className="text-base font-semibold text-red-500">
            <span>{getCurrency(item?.price)}</span>
          </div>
          <div className="flex items-start gap-1">
            <span className="text-xs font-medium px-1 bg-stone-100 rounded-lg">
              {item?.discount_rate}%
            </span>
            <div className="text-[10px] text-stone-500 font-normal line-through ">
              <span>{getCurrency(item?.original_price)}</span>
              <sup>đ</sup>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-1 pt-1.5 border-t">
          <div
            style={{
              width: getBadges_new(`tikinow`)?.icon_width,
              height: getBadges_new(`tikinow`)?.icon_height,
            }}
          >
            <img
              src={getBadges_new(`tikinow`)?.icon}
              alt={getBadges_new(`tikinow`)?.icon}
            />
          </div>
          <div className="line-clamp-1 text-[10px] text-stone-500">
            {getBadges_new(`tikinow`)?.text ||
              item?.impression_info?.[0]?.metadata?.delivery_info_badge_text}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(ProductCard);
