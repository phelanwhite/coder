import Modal from "@/components/layout/modal";
import axiosConfig from "@/configs/axios-config";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import React, { memo, useEffect, useMemo } from "react";
import ListModalItem from "./ListModalItem";
import { useAuthStore } from "@/stores/auth-store";
import toast from "react-hot-toast";

type Type = {
  isOpen: boolean;
  onClose: () => void;
  blog_id: string;
};

const LitsModal = ({ isOpen, onClose, blog_id }: Type) => {
  const { user } = useAuthStore();
  const getListsByMeResult = useInfiniteQuery({
    queryKey: ["lists", "me"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const url = `list/get-lists-by-me?_page=${pageParam}&_blog=${blog_id}`;
      const response = (await axiosConfig.get(url)).data;
      console.log({ response });

      return response;
    },

    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage?.data?.result?.length) {
        return lastPageParam + 1;
      } else {
        return null;
      }
    },
    placeholderData: keepPreviousData,
    enabled: !!(isOpen && user),
  });
  const customListsResult = useMemo(() => {
    return (
      getListsByMeResult.data?.pages
        ?.map((item) => item?.data?.result)
        .flat() || []
    );
  }, [getListsByMeResult.data]);

  useEffect(() => {
    if (!user && isOpen) {
      toast.error(`Signin`);
      onClose();
    }
  }, [isOpen]);

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-4 rounded space-y-4 max-w-[500px] w-full max-h-[500px] min-h-[100px]">
        {customListsResult.map((item) => (
          <ListModalItem key={item?._id} data={item} blog_id={blog_id} />
        ))}
        <div className="text-center text-xs text-blue-500">
          <button
            onClick={() => {
              getListsByMeResult.fetchNextPage({});
            }}
            disabled={
              !getListsByMeResult.hasNextPage ||
              getListsByMeResult.isFetchingNextPage
            }
          >
            {getListsByMeResult.isFetchingNextPage
              ? "Loading more..."
              : getListsByMeResult.hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(LitsModal);
