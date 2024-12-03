import ButtonMenu from "@/components/form/button-menu";
import Loader from "@/components/form/loader";
import { PostButtonMenuType } from "@/constants/type";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { useHistoryStore } from "@/stores/history-store";
import { usePostStore } from "@/stores/post-store";
import { useMutation } from "@tanstack/react-query";
import React, { memo, useCallback } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { Link } from "react-router-dom";

type Type = {
  data: any;
  menuType?: PostButtonMenuType;
};

const PostButtonMenu = ({ data, menuType }: Type) => {
  const { deletePostById, changeStatusBlogById } = usePostStore();
  const { deleteHistoryById } = useHistoryStore();
  const { deleteBookmarkById } = useBookmarkStore();
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
  const deleteResult = useMutation({
    mutationFn: async () => {
      if (menuType === "Author") {
        return await deletePostById(data._id);
      } else if (menuType === "History") {
        return await deleteHistoryById(data._id);
      } else if (menuType === "Bookmark") {
        return await deleteBookmarkById(data._id);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleDelete = useCallback(() => {
    if (confirm(`Are you sure you want to delete`)) {
      deleteResult.mutate();
    }
  }, [menuType]);

  return (
    <div>
      {(deleteResult.isPending || changeStatusBlogByIdResult.isPending) && (
        <Loader />
      )}
      <ButtonMenu>
        {menuType === "Author" && (
          <ul>
            <li>
              <button
                onClick={() => changeStatusBlogByIdResult.mutate()}
                className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs flex items-center gap-2 w-full"
              >
                <TbStatusChange size={16} />
                <span>
                  {data?.status ? `Make blog private` : `Make blog published`}
                </span>
              </button>
            </li>
            <li>
              <Link
                to={`/me/update-post/${data?._id}`}
                className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs flex items-center gap-2 w-full"
              >
                <MdEdit size={16} />
                <span>Update</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs flex items-center gap-2 w-full"
              >
                <MdDelete size={16} />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        )}
        {menuType === "History" && (
          <ul>
            <li>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs flex items-center gap-2 w-full"
              >
                <MdDelete size={16} />
                <span>Delete history</span>
              </button>
            </li>
          </ul>
        )}
        {menuType === "Favorite" && (
          <ul>
            <li>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs flex items-center gap-2 w-full"
              >
                <MdDelete size={16} />
                <span>Delete favorite</span>
              </button>
            </li>
          </ul>
        )}
        {menuType === "Bookmark" && (
          <ul>
            <li>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs flex items-center gap-2 w-full"
              >
                <MdDelete size={16} />
                <span>Delete bookmark</span>
              </button>
            </li>
          </ul>
        )}
      </ButtonMenu>
    </div>
  );
};

export default memo(PostButtonMenu);
