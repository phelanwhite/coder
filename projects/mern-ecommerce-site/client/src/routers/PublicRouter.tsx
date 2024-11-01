import PublicLayout from "@/components/layout/PublicLayout";
import BrandIdPage from "@/pages/admin/BrandPage";
import SearchPage from "@/pages/public/brand-id-page";
import HomePage from "@/pages/public/home-page";
import ProductByIdPage from "@/pages/public/product-id-page";
import React from "react";
import { Route, Routes } from "react-router-dom";

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="product-id/:id" element={<ProductByIdPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="brand/:id" element={<BrandIdPage />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
