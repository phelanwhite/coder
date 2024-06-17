import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ data = [], className }) => {
  return (
    <div>
      <div
        className={`grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 `.concat(
          className
        )}
      >
        {data?.map((item) => (
          <ProductCard
            item={item}
            key={item?.seller_product_id || item?.default_spid}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
