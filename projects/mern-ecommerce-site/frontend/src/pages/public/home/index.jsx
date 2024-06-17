import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Wrapper from "layouts/Wrapper";
import React from "react";
import MenuLeft from "./MenuLeft";
import SuggestionToday from "./SuggestionToday";
import HomeProductSlide from "./HomeProductSlide";
import Banner from "./Banner";
import Loading from "components/loading";

const HomePage = () => {
  const menu_config = useQuery({
    queryKey: [`menu-config`],
    queryFn: async () => {
      const url = `https://api.tiki.vn/raiden/v2/menu-config`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    },
  });
  const suggestion_today = useQuery({
    queryKey: [`suggestion_today`],
    queryFn: async () => {
      const url = `https://tiki.vn/api/personalish/v1/blocks/collections?block_code=infinite_scroll&page_size=36&version=home-persionalized&_rf=rotate_by_ctr`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    },
  });
  const maybe_you_like = useQuery({
    queryKey: [`maybe_you_like`],
    queryFn: async () => {
      const url = `https://api.tiki.vn/raiden/v3/widgets/maybe_you_like?_rf=rotate_by_ctr`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    },
  });
  const imported_genuine = useQuery({
    queryKey: [`imported_genuine`],
    queryFn: async () => {
      const url = `https://api.tiki.vn/raiden/v3/widgets/imported_genuine?_rf=rotate_by_ctr`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    },
  });
  const top_choise = useQuery({
    queryKey: [`top_choise`],
    queryFn: async () => {
      const url = `https://api.tiki.vn/raiden/v3/widgets/top_choise?_rf=rotate_by_ctr`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    },
  });
  const banner_carousel = useQuery({
    queryKey: [`banner_carousel`],
    queryFn: async () => {
      const url = `https://tka.tiki.vn/widget/api/v1/banners-group?group=msp_home_2_7_banner_carousel&_rf=rotate_by_ctr`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    },
  });

  if (
    menu_config.isLoading ||
    suggestion_today.isLoading ||
    maybe_you_like.isLoading ||
    imported_genuine.isLoading ||
    top_choise.isLoading ||
    banner_carousel.isLoading
  )
    return <Loading />;

  return (
    <div>
      <Wrapper>
        <div className="flex gap-6">
          <div className="hidden md:block max-w-[230px] w-full">
            <MenuLeft data={menu_config.data} />
          </div>
          <div className="flex-1 flex flex-col gap-3 overflow-hidden">
            <Banner data={banner_carousel?.data?.data[0]?.banners} />
            <HomeProductSlide data={top_choise.data} />
            <HomeProductSlide data={imported_genuine.data} />
            <HomeProductSlide data={maybe_you_like.data} />
            <SuggestionToday data={suggestion_today.data} />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default HomePage;
