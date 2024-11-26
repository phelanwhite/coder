import ButtonMenu from "@/components/form/button-menu";
import Loader from "@/components/form/loader";
import { PostButtonMenuType, PostType } from "@/constants/type";
import { usePostStore } from "@/stores/post-store";
import { useMutation } from "@tanstack/react-query";
import React, { memo, useCallback } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";

type Type = {
  data: PostType;
  menuType: PostButtonMenuType;
};

const PostButtonMenu = ({ data, menuType }: Type) => {
  const { deletePostById, changeStatusBlogById } = usePostStore();
  const changeStatusBlogByIdResult = useMutation({
    mutationFn: async () => {
      return await changeStatusBlogById(data._id, {
        ...data,
        status: data?.status ? false : true,
      });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const deletePostByIdResult = useMutation({
    mutationFn: async () => {
      return await deletePostById(data._id);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleDeletePost = useCallback(() => {
    if (confirm(`Are you sure you want to delete`)) {
      deletePostByIdResult.mutate();
    }
  }, []);

  return (
    <div>
      {(deletePostByIdResult.isPending ||
        changeStatusBlogByIdResult.isPending) && <Loader />}
      <ButtonMenu>
        {menuType === "User" && (
          <ul>
            <li
              onClick={handleDeletePost}
              className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs flex items-center gap-2"
            >
              <MdDelete size={16} />
              <span>Delete</span>
            </li>
            <li
              onClick={() => changeStatusBlogByIdResult.mutate()}
              className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs flex items-center gap-2"
            >
              <TbStatusChange size={16} />
              <span>
                {data?.status ? `Make blog private` : `Make blog published`}
              </span>
            </li>
          </ul>
        )}
      </ButtonMenu>
    </div>
  );
};

export default memo(PostButtonMenu);
