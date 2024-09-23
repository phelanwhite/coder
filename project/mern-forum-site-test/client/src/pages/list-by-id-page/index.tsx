import ListBlogItem from "@/components/common/ListBlogItem";
import Loader from "@/components/layout/loader";
import { useListStore } from "@/store/library-store";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const ListByIdPage = () => {
  const { id } = useParams();
  // const listsResult = useQuery({
  //   queryKey: ["list", "id"],
  //   queryFn: async () => {
  //     const url = `list/get-id/${id}`;
  //     const response = (await axiosConfig.get(url)).data;
  //     return await response;
  //   },
  // });

  const { blogsOfList, getListsById } = useListStore();

  const getListsByIdResult = useQuery({
    queryKey: ["lists", id],
    queryFn: async () => {
      const response = await getListsById(id);
      return response;
    },
    enabled: !!id,
  });
  const data = useMemo(
    () => getListsByIdResult.data?.data,
    [getListsByIdResult.data]
  );

  if (getListsByIdResult.isLoading) return <Loader />;
  return (
    <div className="space-y-4">
      {/* author  */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 overflow-hidden rounded-full">
          <img src={data?.author?.avatar} loading="lazy" alt="" />
        </div>
        <div>
          <div>
            <Link
              to={`/author-id/${data?.author?._id}`}
              className="text-link font-medium"
            >
              {data?.author?.name}
            </Link>
          </div>
          <div className="text-xs text-textSecondaryColor">
            {data?.author?.role}
          </div>
        </div>
      </div>
      <div className="title font-medium">{data?.title}</div>
      <div>
        {blogsOfList?.map((item: any) => (
          <ListBlogItem key={item?._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ListByIdPage;
