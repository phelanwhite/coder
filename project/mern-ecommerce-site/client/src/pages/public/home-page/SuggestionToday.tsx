import { suggestionTodayOptions } from "@/assets/constants/common";
import ProductCard from "@/components/common/product/ProductCard";

const SuggestionToday = () => {
  return (
    <div>
      <div className="bg-white rounded-lg">
        <div className="text-base font-medium p-4">Suggestion today</div>
        <div>
          {suggestionTodayOptions.map((item) => (
            <button
              type="button"
              className="w-[180px] p-2 bg-blue-50 border-b border-b-blue-500 hover:bg-gray-100"
              key={item?.label}
            >
              <div className="w-10 mx-auto">
                <img src={item.image} loading="lazy" alt="" />
              </div>
              <div className="mt-2 text-xs text-center">{item.label}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array(50)
          .fill(0)
          .map((item, index) => {
            return <ProductCard key={index} />;
          })}
      </div>
    </div>
  );
};

export default SuggestionToday;
