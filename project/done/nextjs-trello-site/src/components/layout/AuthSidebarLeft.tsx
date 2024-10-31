"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import Loader from "../feedback/loader";
import { useParams, usePathname } from "next/navigation";
import { useBoardStore } from "@/store/board-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import clsx from "clsx";
import { MdAdd } from "react-icons/md";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const menuLink = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Boards",
    href: "/boards",
  },
];

const AuthSidebarLeft = () => {
  const pathName = usePathname();
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    if (window.screen.width < 700) {
      setIsShow(false);
    }
  }, []);
  return (
    <div className={clsx("relative  bg-[rgb(0,102,160)] text-white px-2 py-4")}>
      <button
        onClick={() => setIsShow(!isShow)}
        className="z-10 absolute top-4 -right-3 p-0.5 rounded-full bg-bg-item-board text-white text-xl border border-blue-500"
      >
        {isShow ? <RiArrowLeftSLine /> : <RiArrowRightSLine />}
      </button>
      <div
        className={clsx(
          "overflow-hidden h-screen overflow-y-auto",
          isShow ? "w-[200px] md:w-[250px]" : "w-0"
        )}
      >
        {/* auth link  */}
        <div className="flex flex-col">
          {menuLink.map((item) => (
            <Link
              key={item?.href}
              href={item?.href}
              className={clsx(
                "group flex gap-4 items-center justify-between hover:bg-white/30 px-3 py-1.5 rounded-md",
                item?.href === pathName && `bg-white/30`
              )}
            >
              {item?.label}
            </Link>
          ))}
        </div>
        {/* board list  */}
        <BoardList />
      </div>
    </div>
  );
};

export default memo(AuthSidebarLeft);

const BoardList = () => {
  const { boards, createBoard, getBoards, toggleFavoriteBoard } =
    useBoardStore();

  const getBoardsResult = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const resp = await getBoards();
      return resp;
    },
  });
  const createBoardResult = useMutation({
    mutationFn: async () => {
      const response = await createBoard({
        title: "New board",
      });
      return await response;
    },
    onSuccess: (data) => {
      toast.success("Board created successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create board");
    },
  });
  const toggleFavoriteBoardResult = useMutation({
    mutationFn: async (id: string) => {
      const response = await toggleFavoriteBoard(id);
      return await response;
    },
    onSuccess: (data) => {
      toast.success("Board favorite status updated successfully");
    },
    onError: (error) => {
      console.log(error);

      toast.error("Board favorite status updated failed");
    },
  });

  const boardList = useMemo(() => {
    return boards.filter((item) => item.isFavorite === false);
  }, [boards]);
  const boardListFavorite = useMemo(() => {
    return boards.filter((item) => item.isFavorite === true);
  }, [boards]);

  if (
    createBoardResult.isPending ||
    getBoardsResult.isLoading ||
    toggleFavoriteBoardResult.isPending
  )
    return <Loader />;
  return (
    <div className="mt-4 space-y-4">
      {/* boardListFavorite */}
      <div>
        <div className="font-semibold p-2 relative">
          <span>Favorite</span>
        </div>
        <div>
          {boardListFavorite?.map((item) => (
            <BoardCard key={item.id} data={item} />
          ))}
        </div>
      </div>
      {/* boardList */}
      <div>
        <div className="font-semibold p-2 relative">
          <span>Your board</span>
          <button
            onClick={() => createBoardResult.mutate()}
            className="absolute top-1 right-4 rounded hover:bg-white/30 p-1.5"
          >
            <MdAdd />
          </button>
        </div>
        <div>
          {boardList?.map((item) => (
            <BoardCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const BoardCard = ({ data }: { data: any }) => {
  const { id } = useParams();
  const { toggleFavoriteBoard } = useBoardStore();
  const toggleFavoriteBoardResult = useMutation({
    mutationFn: async (id: string) => {
      const response = await toggleFavoriteBoard(id);
      return await response;
    },
    onSuccess: (data) => {
      toast.success("Board favorite status updated successfully");
    },
    onError: (error) => {
      console.log(error);

      toast.error("Board favorite status updated failed");
    },
  });

  if (toggleFavoriteBoardResult.isPending) return <Loader />;

  return (
    <div
      className={clsx(
        "relative group flex gap-4 items-center justify-between hover:bg-white/30 rounded-md",
        data?.id === id && `bg-white/30`
      )}
    >
      <Link
        href={`/boards/` + data?.id}
        className={clsx(
          "flex-1 line-clamp-1 leading-6 overflow-hidden px-3 py-1.5 group-hover:pr-7"
        )}
      >
        {data?.title}
      </Link>
      <div className="absolute top-2 right-3 group-hover:block hidden space-x-2 ">
        <button onClick={() => toggleFavoriteBoardResult.mutate(data?.id)}>
          {!data?.isFavorite ? <FaRegStar /> : <FaStar />}
        </button>
      </div>
    </div>
  );
};
