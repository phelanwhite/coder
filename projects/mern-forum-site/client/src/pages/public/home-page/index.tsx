import PostCard from "@/components/common/post/PostCard";
import SidebarRight from "../../../components/layout/sidebar/SidebarRight";
import { useQuery } from "@tanstack/react-query";
import { axiosConfigV1 } from "@/configs/axios-config";
import { PostType } from "@/constants/type";

const HomePage = () => {
  // const { searchParams, handleSearchParams } = useSearchParamsValue({
  //   _status: "1",
  // });
  // const { posts, getPostByMe } = usePostStore();
  const getDatasResult = useQuery({
    queryKey: [`post`],
    queryFn: async () => {
      const url = `post/get-posts`;
      return (await axiosConfigV1.get(url)).data;
    },
  });

  return (
    <div className="flex items-start justify-evenly gap-4">
      <div className="md:max-w-screen-sm lg:max-w-screen-md space-y-8 ">
        <div className="space-y-8">
          {getDatasResult.data?.data?.results?.map((data: PostType) => (
            <PostCard key={data._id} data={data} />
          ))}
        </div>
      </div>
      <SidebarRight />
    </div>
  );
};

export default HomePage;
