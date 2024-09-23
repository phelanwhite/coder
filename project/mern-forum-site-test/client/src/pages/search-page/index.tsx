import { BlogCard1 } from "@/components/common/BlogCard";
import Paginate from "@/components/form/paginate";
import Loader from "@/components/layout/loader";
import axiosConfig from "@/config/axios-config";
import useSearchParamsValue from "@/hook/useSearchParamsValue";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

const SearchPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const getBlogsResult = useQuery({
    queryKey: ["blogs", searchParams.toString()],
    queryFn: async () => {
      const url = `blog/get-all?${searchParams.toString()}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });
  const [search, setSearch] = useState("");

  if (getBlogsResult.isLoading) return <Loader />;

  return (
    <div className="space-y-5">
      {/* input  */}
      <div className="md:hidden border rounded-full px-4 flex items-center gap-3 mb-8">
        <MdSearch size={20} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === `Enter`) {
              handleSearchParams(`q`, search);
            }
          }}
          type="text"
          placeholder="Search..."
          className="border-none outline-none w-full py-2"
        />
      </div>

      {/* query  */}
      {searchParams.get("q") && (
        <div className="text-xl">
          Result for{" "}
          <span className="italic font-medium">{searchParams.get("q")}</span>
        </div>
      )}

      {/* result  */}
      {getBlogsResult.data?.data?.data?.length > 0 ? (
        <>
          {getBlogsResult.data?.data?.data?.map((item: any) => (
            <BlogCard1 key={item._id} data={item} />
          ))}
          <Paginate
            forcePage={Number(getBlogsResult.data?.data?.page) - 1}
            onPageChange={(e) => handleSearchParams(`page`, e.selected + 1)}
            pageCount={getBlogsResult.data?.data?.total_page as number}
          />
        </>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="font-semibold">No published.</div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
