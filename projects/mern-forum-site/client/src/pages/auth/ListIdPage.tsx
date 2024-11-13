import { BlogList1 } from "@/components/common/blog/BlogList";
import Paginate from "@/components/layout/paginate";
import SidebarRight from "@/components/layout/sidebar/SidebarRight";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ListIdPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { id } = useParams(); // Assuming id is a dynamic route parameter
  const getListIdResult = useQuery({
    queryKey: ["list", id],
    queryFn: async () => {
      const url = `list/get-id/${id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });
  const getBlogsByListIdResult = useQuery({
    queryKey: ["list", "blog", id],
    queryFn: async () => {
      const url = `/list/get-items-by-list/${id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });

  return (
    <div className="flex max-w-[1332px] w-full mx-auto">
      <section className="flex-1">
        <div className="px-4">
          <div className="text-xl font-medium">
            {getListIdResult.data?.data?.title}
          </div>
          <div className="ql-snow">
            <div
              className="ql-editor p-0"
              dangerouslySetInnerHTML={{
                __html: getListIdResult.data?.data?.description,
              }}
            ></div>
          </div>
          <div>
            <div className="mt-8 pt-8 border-t">
              <BlogList1
                isLoading={getBlogsByListIdResult.isLoading}
                datas={getBlogsByListIdResult.data?.data?.result?.map(
                  (item: any) => item?.blog
                )}
                type="history"
              />
              {getBlogsByListIdResult.data && (
                <div className="mt-4">
                  <Paginate
                    forcePage={
                      Number(getBlogsByListIdResult.data?.data?._page) - 1
                    }
                    onPageChange={(e) =>
                      handleSearchParams(`_page`, e.selected + 1)
                    }
                    pageCount={
                      getBlogsByListIdResult.data?.data?.total_page as number
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <SidebarRight />
    </div>
  );
};

export default ListIdPage;
