import SidebarRight from "./SidebarRight";
import { author_links } from "@/constants/links-constant";
import Layout1 from "@/components/layout/layout/Layout1";
import { Link, Route, Routes, useParams } from "react-router-dom";
import About from "./About";
import Posts from "./Posts";
import ButtonFollow from "@/components/common/follow/ButtonFollow";
import { useMemo } from "react";
import Lists from "./Lists";

const AuthorIdPage = () => {
  const { id } = useParams();

  const makeLinks = useMemo(() => {
    return author_links.map((link) => ({
      ...link,
      path: `/author/${id}${link.path}`,
    }));
  }, []);
  return (
    <Layout1
      title={
        <div>
          <div className="hidden md:block">Monique McIntyre</div>
          <div className="space-y-2 md:hidden">
            <div className="w-16 h-16 overflow-hidden rounded-full">
              <img
                src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*Kt_kIt2U-AuDbXK578LTDg.png"
                loading="lazy"
                alt=""
              />
            </div>
            <div className="font-medium text-base">Monique McIntyre</div>
            <div className="text-sm text-text-secondary-color">
              51 <Link to={`followers`}>followers</Link>
            </div>
            <div className="text-xs text-text-secondary-color">
              just a dev trying to help other devs
            </div>
            <div>
              <ButtonFollow />
            </div>
          </div>
        </div>
      }
      sidebarRight={<SidebarRight />}
      links={makeLinks}
    >
      <Routes>
        <Route index element={<Posts />} />
        <Route path="list" element={<Lists />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Layout1>
  );
};

export default AuthorIdPage;
