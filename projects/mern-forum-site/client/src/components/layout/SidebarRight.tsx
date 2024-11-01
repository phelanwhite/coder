import { memo } from "react";
import { Link } from "react-router-dom";
import BlogCard3 from "../common/blog/BlogCard3";
import TopicCard from "../common/topic/TopicCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosConfig from "@/configs/axios-config";

const SidebarRight = () => {
  const getStaffPicksResult = useQuery({
    queryKey: ["blogs", "staffPicks"],
    queryFn: async () => {
      const response = await axiosConfig.get(
        "/blog/get-all?_limit=5&_sort_view=1"
      );
      return response.data;
    },
  });
  const getTopicsResult = useQuery({
    queryKey: ["topic"],
    queryFn: async () => {
      const response = await axiosConfig.get("/topic/get-all?_limit=10");
      return response.data;
    },
  });
  const incrimentTopicResult = useMutation({
    mutationFn: async (id) => {
      const url = `topic/incriment-by-id/${id}`;
      return await axiosConfig.put(url);
    },
  });

  return (
    <div className="hidden lg:block w-[25%] pl-16 min-w-[320px]">
      {/* Staff Picks  */}
      <div className="">
        <div className="font-medium text-text-secondary-color-2 mb-5">
          Staff Picks
        </div>
        <div className="space-y-5 mb-5">
          {getStaffPicksResult.data?.data?.result?.map((item: any) => (
            <BlogCard3 key={item?._id} data={item} />
          ))}
        </div>
        <div className="text-xs font-medium text-green-500">
          <Link to={`/search`}>See the full list</Link>
        </div>
      </div>
      {/* Recommended topics  */}
      <div className="">
        <div className="font-medium text-text-secondary-color-2 mb-5">
          Recommended topics
        </div>
        <div className="flex items-center gap-2 flex-wrap mb-5">
          {getTopicsResult.data?.data?.result?.map((item: any) => (
            <div
              key={item?._id}
              onClick={() => incrimentTopicResult.mutate(item?._id)}
            >
              <TopicCard key={item?._id} data={item?.title} />
            </div>
          ))}
        </div>
        <div className="text-xs font-medium text-green-500">
          <Link to={`/topic`}>See the full list</Link>
        </div>
      </div>
    </div>
  );
};

export default memo(SidebarRight);
