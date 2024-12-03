import Layout1 from "@/components/layout/layout/Layout1";
import SidebarRight from "@/components/layout/sidebar/SidebarRight";
import { search_links } from "@/constants/links-constant";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { Route, Routes, useLocation } from "react-router-dom";
import Post from "./Post";
import { useMemo } from "react";
import Author from "./Author";

const SearchPage = () => {
  const location = useLocation();
  const { searchParams } = useSearchParamsValue();
  const makeLinks = useMemo(() => {
    return search_links.map((link) => ({
      ...link,
      path:
        `/search` +
        link.path +
        `?_q=` +
        (searchParams.get("_q") as string) +
        `&_page=1`,
    }));
  }, [location]);

  return (
    <div>
      <Layout1
        sidebarRight={<SidebarRight />}
        links={makeLinks}
        title={
          <div className="text-xl font-medium">
            Result for {searchParams.get("_q")}
          </div>
        }
      >
        <Routes>
          <Route index element={<Post />} />
          <Route path="authors" element={<Author />} />
          <Route path="lists" element={<Post />} />
          <Route path="tags" element={<Post />} />
        </Routes>
      </Layout1>
      <div className="flex items-center gap-4"></div>
    </div>
  );
};

export default SearchPage;
