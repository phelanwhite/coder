"use client";
import Loader from "@/components/feedback/loader";
import { getAllByAuth } from "@/libs/prisma-query/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const DashboardPage = () => {
  const getAllByAuthResult = useQuery({
    queryKey: ["getAllByAuth"],
    queryFn: async () => {
      try {
        const response = await getAllByAuth();
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  if (getAllByAuthResult.isLoading) return <Loader />;
  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {getAllByAuthResult.data?.map((item) => (
        <div
          key={item.type}
          className="py-2 px-3 rounded-md min-h-[100px] block bg-bg-item-board"
        >
          <div className="text-base text-white capitalize font-medium mb-1">
            {item.type}
          </div>
          <div className="text text-gray-300">Total: {item.count}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
