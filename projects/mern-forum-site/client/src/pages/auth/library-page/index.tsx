import Layout1 from "@/components/layout/layout/Layout1";
import { user_links } from "@/constants/links-constant";
import { LinkType } from "@/constants/type";
import SidebarRight from "@/components/layout/sidebar/SidebarRight";
import React, { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import List from "./List";

const MyLibraryPage = () => {
  const makeLinks = useMemo(() => {
    return user_links[1].subMenu?.map((link) => ({
      ...link,
      path: `/me/library${link.path}`,
    }));
  }, []);
  return (
    <Layout1
      title={`My Library`}
      sidebarRight={<SidebarRight />}
      links={makeLinks as LinkType[]}
    >
      <div>
        <Routes>
          <Route index element={<List />} />
        </Routes>
      </div>
    </Layout1>
  );
};

export default MyLibraryPage;
