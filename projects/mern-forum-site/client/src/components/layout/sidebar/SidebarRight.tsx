import { BlogCard3 } from "@/components/common/blog/BlogCard";
import axiosConfig from "@/configs/axios-config";
import { useQuery } from "@tanstack/react-query";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const SidebarRight = () => {
  const getStaffPicksResult = useQuery({
    queryKey: ["blogs", "staffPicks"],
    queryFn: async () => {
      const url = `blog/get-all?_limit=5&_sort_view=1`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });
  //   const getTopicsResult = useQuery({
  //     queryKey: ["topic"],
  //     queryFn: async () => {
  //       const url = `topic/get-all?_limit=10`;
  //       const response = (await axiosConfig.get(url)).data;
  //       return response;
  //     },
  //   });

  return (
    <section className="hidden lg:block w-[25%] pl-16 pr-5 min-w-[320px] space-y-10">
      {/* Staff Picks  */}
      <div className="space-y-5">
        <div className="font-medium text-text-secondary-color-2">
          Staff Picks
        </div>
        <div className="space-y-5">
          {getStaffPicksResult.data?.data?.result?.map((item: any) => (
            <BlogCard3 key={item?._id} data={item} />
          ))}
        </div>
        <div className="text-xs font-medium text-green-500">
          <Link to={`/search`}>See the full list</Link>
        </div>
      </div>
      {/* Recommended topics  */}
      <div className="space-y-5">
        <div className="font-medium text-text-secondary-color-2">
          Recommended topics
        </div>
        {/* <div className="flex items-center gap-2 flex-wrap">
      {getTopicsResult.data?.data?.result?.map((item: any) => (
        <div key={item?._id}>
          <TopicCard key={item?._id} data={item?.title} />
        </div>
      ))}
    </div> */}
        <div className="text-xs font-medium text-green-500">
          <Link to={`/topic`}>See the full list</Link>
        </div>
      </div>
    </section>
  );
};

export default memo(SidebarRight);