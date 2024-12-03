import Layout1 from "@/components/layout/layout/Layout1";
import { user_links } from "@/constants/links-constant";
import { LinkType } from "@/constants/type";
import SidebarRight from "@/components/layout/sidebar/SidebarRight";
import React, { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import History from "./History";
import Bookmark from "./Bookmark";
import Favorite from "./Favorite";

const MyActivityPage = () => {
  const makeLinks = useMemo(() => {
    return user_links[2].subMenu?.map((link) => ({
      ...link,
      path: `/me/activity${link.path}`,
    }));
  }, []);

  return (
    <Layout1
      title={`Activity`}
      sidebarRight={<SidebarRight />}
      links={makeLinks as LinkType[]}
    >
      <div>
        <Routes>
          <Route index element={<History />} />
          <Route path="bookmark" element={<Bookmark />} />
          <Route path="favorite" element={<Favorite />} />
        </Routes>
      </div>
    </Layout1>
  );
};

export default MyActivityPage;
