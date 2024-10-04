import BlogCard1 from "@/components/commons/blog/BlogCard1";
import axiosConfig from "@/configs/axios-config";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const getBlogsResult = useQuery({
    queryKey: ["home", "blogs"],
    queryFn: async () => {
      const url = `blog/get-all?created_at=1`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });

  return (
    <div className="space-y-5">
      {getBlogsResult.data?.data?.data?.map((item: any) => (
        <BlogCard1 data={item} key={item?._id} />
      ))}
    </div>
  );
};

export default HomePage;
