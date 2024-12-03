import Layout1 from "@/components/layout/layout/Layout1";
import { user_links } from "@/constants/links-constant";
import { LinkType } from "@/constants/type";
import SidebarRight from "@/components/layout/sidebar/SidebarRight";
import React, { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Published from "./Published";
import Draft from "./Draft";
import Responses from "./Responses";

const MyPostPage = () => {
  const makeLinks = useMemo(() => {
    return user_links[0].subMenu?.map((link) => ({
      ...link,
      path: `/me/post${link.path}`,
    }));
  }, []);
  return (
    <Layout1
      title={`My posts`}
      sidebarRight={<SidebarRight />}
      links={makeLinks as LinkType[]}
    >
      <div>
        <Routes>
          <Route index element={<Published />} />
          <Route path="draft" element={<Draft />} />
          <Route path="responses" element={<Responses />} />
        </Routes>
      </div>
    </Layout1>
  );
};

export default MyPostPage;
