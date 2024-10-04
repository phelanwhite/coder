import BlogCard1 from "@/components/commons/blog/BlogCard1";
import ButtonFollow from "@/components/commons/ButtonFollow";
import Paginate from "@/components/forms/paginate";
import Loader from "@/components/layouts/loader";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useFollowStore } from "@/stores/follow-store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const AuthorByIdPage = () => {
  const { id } = useParams();
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { followers, following, getFollower, getFollowing } = useFollowStore();
  const getAuthorResult = useQuery({
    queryKey: ["author", id],
    queryFn: async () => {
      const url = `author/get-id/${id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });
  const getBlogsResult = useQuery({
    queryKey: ["blogs", "author", id, searchParams.toString()],
    queryFn: async () => {
      const url = `blog/get-all?${searchParams.toString()}&author=${id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });
  const getFollowerResult = useQuery({
    queryKey: ["follower", "author", id],
    queryFn: async () => {
      return await getFollower(id as string);
    },
  });
  const getFollowingResult = useQuery({
    queryKey: ["following", "author", id],
    queryFn: async () => {
      return await getFollowing(id as string);
    },
  });

  if (
    getBlogsResult.isLoading ||
    getFollowerResult.isLoading ||
    getFollowingResult.isLoading ||
    getAuthorResult.isLoading
  )
    return <Loader />;

  return (
    <div className="flex flex-col-reverse iPad:flex-row max-iPad:gap-6 items-start justify-evenly max-w-[1336px] mx-auto">
      {/* blogs  */}
      <div className="max-w-[728px] w-full px-6">
        <div className="title mb-8">All blog</div>
        {getBlogsResult.data?.data?.data?.length > 0 ? (
          <div className="space-y-5">
            {getBlogsResult.data?.data?.data?.map((item: any) => (
              <BlogCard1 key={item._id} data={item} />
            ))}
            <Paginate
              forcePage={Number(getBlogsResult.data?.data?.page) - 1}
              onPageChange={(e) => handleSearchParams(`page`, e.selected + 1)}
              pageCount={getBlogsResult.data?.data?.total_page as number}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="font-semibold">No published.</div>
          </div>
        )}
      </div>

      {/* author  */}
      <div className="iPad:max-w-[350px] w-full iPad:border-l border-[#F2F2F2] px-6 flex flex-col items-center text-center gap-2">
        <div className="w-20 h-20 overflow-hidden rounded-full border">
          <img src={getAuthorResult.data?.data?.avatar} loading="lazy" alt="" />
        </div>
        <div className="text-base capitalize font-medium">
          {getAuthorResult.data?.data?.name}
        </div>
        <div>{getAuthorResult.data?.data?.bio}</div>
        <div className="flex gap-4 text-textSecondaryColor">
          <span>{getBlogsResult.data?.data?.total_row} post</span>
          <span>{following} following</span>
          <span>{followers} follower</span>
        </div>
        <div>
          <ButtonFollow authorId={id as string} />
        </div>
        {/* <div className="pt-10 text-textSecondaryColor space-y-1">
          <div>
            <span>Address: </span>
            {getAuthorResult.data?.data?.address}
          </div>
          <div>
            <span>Education: </span>
            {getAuthorResult.data?.data?.education}
          </div>
          <div>
            <span>Website: </span>
            {getAuthorResult.data?.data?.website}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AuthorByIdPage;
