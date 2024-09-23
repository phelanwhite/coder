import { BlogCard1 } from "@/components/common/BlogCard";
import Loader from "@/components/layout/loader";
import axiosConfig from "@/config/axios-config";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const HomePage = () => {
  const getBlogsResult = useQuery({
    queryKey: ["home", "blogs"],
    queryFn: async () => {
      const url = `blog/get-all`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });
  useEffect(() => {
    (async () => {
      const url = `blog/get-all-topic`;
      const response = (await axiosConfig.get(url)).data;
      console.log(response.data.data);
    })();
  }, []);
  if (getBlogsResult.isLoading) return <Loader />;
  return (
    <div className="space-y-10">
      {getBlogsResult.data?.data?.data?.map((item: any) => (
        <BlogCard1 key={item?._id} data={item} />
      ))}
    </div>
  );
};

export default HomePage;
