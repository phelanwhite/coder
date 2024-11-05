import { useQuery } from "@tanstack/react-query";
import {
  trending_allApi,
  trending_movie_top_ratedApi,
  trending_movieApi,
  trending_personApi,
  trending_tv_top_ratedApi,
  trending_tvApi,
} from "../services/tmdb-servies";
import Loader from "@/components/layout/loader";
import HomePageBannerSlide from "@/components/common/HomePageBannerSlide";
import MediaSide from "@/components/common/MediaSide";

const HomePage = () => {
  const trending_person = useQuery({
    queryKey: ["trending_person"],
    queryFn: async () => await trending_personApi(),
  });
  const trending_all = useQuery({
    queryKey: ["trending_all"],
    queryFn: async () => await trending_allApi(),
  });
  const trending_movie = useQuery({
    queryKey: ["trending_movie"],
    queryFn: async () => await trending_movieApi(),
  });
  const trending_tv = useQuery({
    queryKey: ["trending_tv"],
    queryFn: async () => await trending_tvApi(),
  });
  const trending_movie_top_rated = useQuery({
    queryKey: ["trending_movie_top_rated"],
    queryFn: async () => await trending_movie_top_ratedApi(),
  });
  const trending_tv_top_rated = useQuery({
    queryKey: ["trending_tv_top_rated"],
    queryFn: async () => await trending_tv_top_ratedApi(),
  });

  if (
    trending_all.isLoading ||
    trending_movie.isLoading ||
    trending_tv.isLoading ||
    trending_movie_top_rated.isLoading ||
    trending_tv_top_rated.isLoading ||
    trending_person.isLoading
  )
    return <Loader />;
  return (
    <div>
      <HomePageBannerSlide data={trending_all.data?.results} />
      <div className="wrapper my-10 space-y-8">
        <MediaSide
          title="Trending person"
          data={trending_person.data?.results}
          media_type="person"
        />
        <MediaSide title="Trending movie" data={trending_movie.data?.results} />
        <MediaSide title="Trending tv" data={trending_tv.data?.results} />
        <MediaSide
          title="movie top rated"
          data={trending_movie_top_rated.data?.results}
          media_type="movie"
        />
        <MediaSide
          title="tv top rated"
          data={trending_tv_top_rated.data?.results}
          media_type="tv"
        />
      </div>
    </div>
  );
};

export default HomePage;
