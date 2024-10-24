import { useBlogListStore } from "@/stores/blog-list-store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ListByIdPage = () => {
  // const getBlogsByListId =
  const { id } = useParams();
  const { getBlogsByListId, blogsOfList } = useBlogListStore();
  const getListById = useQuery({
    queryKey: ["list-id", id],
    queryFn: async () => {
      const response = getBlogsByListId(id as string);
      return response;
    },
  });
  //   console.log(getListById, blogsOfList);

  return (
    <div>
      <div>
        {blogsOfList?.map((item) => (
          <div key={item?.blog?._id}>{item?.blog?.title}</div>
        ))}
      </div>
    </div>
  );
};

export default ListByIdPage;
