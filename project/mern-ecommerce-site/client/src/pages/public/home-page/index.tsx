import PublicSideLeft from "@/components/layout/PublicSideLeft";
import BannerSide from "./BannerSide";
import ProductSlide from "./ProductSlide";
import SuggestionToday from "./SuggestionToday";

const HomePage = () => {
  return (
    <div className="flex gap-6">
      <div className="md:block hidden">
        <PublicSideLeft />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="space-y-3">
          <BannerSide />
          <ProductSlide
            title="
You may be interested"
            datas={[]}
          />
          <ProductSlide title="You may like" datas={[]} />
          <SuggestionToday />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
