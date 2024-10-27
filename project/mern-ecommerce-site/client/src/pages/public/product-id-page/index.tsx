import Left from "./Left";
import Right from "./Right";
import Main from "./Main";
import { useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosConfig from "@/configs/axios-config";
import Loader from "@/components/form/loader";
import { useViewedStore } from "@/stores/viewed-store";
import { useAuthStore } from "@/stores/auth-store";

const ProductByIdPage = () => {
  const { id } = useParams();

  const getProductByIdResult = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const url = `product/get-id/${id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    placeholderData: keepPreviousData,
    enabled: !!id,
  });

  const getSimilarResult = useQuery({
    queryKey: ["similar", id],
    queryFn: async () => {
      const url = `product/get-all`;
      return (await axiosConfig.get(url)).data;
    },
    placeholderData: keepPreviousData,
  });

  const getTopDealsResult = useQuery({
    queryKey: ["topDeal", id],
    queryFn: async () => {
      const url = `product/get-all`;
      return (await axiosConfig.get(url)).data;
    },
    placeholderData: keepPreviousData,
  });

  const { user } = useAuthStore();
  const { createViewed } = useViewedStore();
  const viewedResult = useQuery({
    queryKey: ["viewed", id],
    queryFn: async () => {
      return createViewed({
        product: id,
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!id && !!user,
  });

  if (getProductByIdResult.isLoading || viewedResult.isLoading)
    return <Loader />;

  return (
    <div className="flex items-start gap-6 flex-col md:flex-row">
      <Left data={getProductByIdResult.data?.data} />
      <Main
        data={getProductByIdResult.data?.data}
        similar={getSimilarResult.data?.data?.results}
        top_deals={getTopDealsResult.data?.data?.results}
      />
      <Right data={getProductByIdResult.data?.data} />
    </div>
  );
};

export default ProductByIdPage;
