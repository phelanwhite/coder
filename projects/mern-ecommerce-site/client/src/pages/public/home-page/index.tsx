import { keepPreviousData, useQuery } from "@tanstack/react-query";
import BannerSide from "./BannerSide";
import HomeSideLeft from "./HomeSideLeft";
import ProductSlide from "./ProductSlide";
import SuggestionToday from "./SuggestionToday";
import axiosConfig from "@/configs/axios-config";
import Loader from "@/components/form/loader";
import Categories from "./Categories";

const HomePage = () => {
  const getCategoriesResult = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const url = `category/get-all`;
      return (await axiosConfig.get(url)).data;
    },
    placeholderData: keepPreviousData,
  });
  const getYouMayBeInterestedResult = useQuery({
    queryKey: ["youMayBeInterested"],
    queryFn: async () => {
      const url = `product/get-all?_limit=20`;
      return (await axiosConfig.get(url)).data;
    },
    placeholderData: keepPreviousData,
  });
  const getYouMayBeLikeResult = useQuery({
    queryKey: ["youMayBeLike"],
    queryFn: async () => {
      const url = `product/get-all?_limit=20`;
      return (await axiosConfig.get(url)).data;
    },
    placeholderData: keepPreviousData,
  });
  const getSuggestionTodayResult = useQuery({
    queryKey: ["suggestionToday"],
    queryFn: async () => {
      const url = `product/get-all?_limit=100`;
      return (await axiosConfig.get(url)).data;
    },
    placeholderData: keepPreviousData,
  });

  if (
    getCategoriesResult.isLoading ||
    getYouMayBeInterestedResult.isLoading ||
    getYouMayBeLikeResult.isLoading ||
    getSuggestionTodayResult.isLoading
  )
    return <Loader />;

  return (
    <div className="flex gap-6">
      <div className="flex-1 overflow-hidden">
        <div className="space-y-3">
          <BannerSide />
          <Categories data={getCategoriesResult.data?.data?.results} />
          <ProductSlide
            title="
You may be interested"
            datas={getYouMayBeInterestedResult.data?.data?.results}
          />
          <ProductSlide
            title="You may be like"
            datas={getYouMayBeLikeResult.data?.data?.results}
          />
          <SuggestionToday
            datas={getSuggestionTodayResult.data?.data?.results}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
