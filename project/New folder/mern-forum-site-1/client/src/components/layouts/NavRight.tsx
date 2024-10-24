import { memo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosConfig from "@/configs/axios-config";
import BlogCard2 from "../commons/blog/BlogCard2";
import Loader from "./loader";

const NavRight = () => {
  const getBlogsResult = useQuery({
    queryKey: ["staff-picks", "blogs"],
    queryFn: async () => {
      const url = `blog/get-all?limit=5&likes=-1`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });
  if (getBlogsResult.isLoading) return <Loader />;
  return (
    <div className="space-y-6">
      {/* Staff Picks */}
      <div>
        <div className="mb-5 text-base font-medium">Staff Picks</div>
        <div className="space-y-5 mb-5">
          {getBlogsResult.data?.data?.data?.map((item: any) => (
            <BlogCard2 key={item?._id} data={item} />
          ))}
        </div>
        <div>
          <Link
            to={`/search`}
            className="text-link text-green-600 hover:text-green-700"
          >
            See the full list
          </Link>
        </div>
      </div>
      {/* Recommended topics */}
      <div>
        <div className="mb-5 text-base font-medium">Recommended topics</div>
        <div className="mb-5 flex flex-wrap gap-2">
          {[
            `Nextjs 13`,
            `Lavarel`,
            `Life`,
            `Reactjs`,
            `Nodejs`,
            `Php`,
            `Sex`,
          ].map((item) => (
            <Link to={`/`} key={item} className="btn-secondary text-xs">
              {item}
            </Link>
          ))}
        </div>
        <div>
          <Link
            to={`/`}
            className="text-link text-green-600 hover:text-green-700"
          >
            See more topics
          </Link>
        </div>
      </div>

      {/* Who to follow */}
      <div>
        <div className="mb-5 text-base font-medium">Who to follow</div>
        <div className="mb-5 space-y-4">
          {/* {[`Nextjs 13`, `Lavarel`, `Life`, `Reactjs`, `Nodejs`].map((item) => (
            <AuthorItem key={item} />
          ))} */}
        </div>
        <div>
          <Link
            to={`/`}
            className="text-link text-green-600 hover:text-green-700"
          >
            See more suggestions
          </Link>
        </div>
      </div>

      {/* Reading list */}
      <div>
        <div className="mb-5 text-base font-medium">Reading list</div>
        <div className="mb-5 space-y-4">
          Click the on any story to easily add it to your reading list or a
          custom list that you can share.
        </div>
      </div>
    </div>
  );
};

export default memo(NavRight);
