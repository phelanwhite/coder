import { sort_options } from "@/assets/constants/common";
import ProductCard from "@/components/common/product/ProductCard";
import SelectField from "@/components/form/SelectField";

const SearchPage = () => {
  return (
    <div>
      <div className="bg-white rounded-lg p-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          <SelectField options={sort_options} className="w-max text-xs" />
        </div>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
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

export default SearchPage;
