import ProductCard from "@/components/common/product/ProductCard";
import React from "react";

const FavoriteProductsPage = () => {
  return (
    <div>
      <div className="grid gap-2 grid-cols-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default FavoriteProductsPage;
