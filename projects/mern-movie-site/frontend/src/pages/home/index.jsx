import { useQuery } from "@tanstack/react-query";
import Loader from "components/ui/loader";
import { getTmdbUrl } from "services/tmdbApi";
import HomeBanner from "./components/HomeBanner";
import Wrapper from "components/ui/wrapper";
import MediaSlide from "features/media/components/MediaSlide";
import PersonSlide from "features/person/components/PersonSlide";

const Home = () => {
  const trending_all = useQuery({
    queryKey: [`trending_all`],
    queryFn: async () => {
      const response = await getTmdbUrl(`trending/all/day`);
      return response;
    },
  });
  const trending_movie = useQuery({
    queryKey: [`trending_movie`],
    queryFn: async () => {
      const response = await getTmdbUrl(`trending/movie/day`);
      return response;
    },
  });
  const trending_tv = useQuery({
    queryKey: [`trending_tv`],
    queryFn: async () => {
      const response = await getTmdbUrl(`trending/tv/day`);
      return response;
    },
  });
  const trending_person = useQuery({
    queryKey: [`trending_person`],
    queryFn: async () => {
      const response = await getTmdbUrl(`trending/person/day`);
      return response;
    },
  });
  const movie_top_rated = useQuery({
    queryKey: [`movie_top_rated`],
    queryFn: async () => {
      const response = await getTmdbUrl(`movie/top_rated`);
      return response;
    },
  });
  const tv_top_rated = useQuery({
    queryKey: [`tv_top_rated`],
    queryFn: async () => {
      const response = await getTmdbUrl(`tv/top_rated`);
      return response;
    },
  });
  if (
    trending_all.isLoading ||
    trending_movie.isLoading ||
    trending_person.isLoading ||
    trending_tv.isLoading ||
    movie_top_rated.isLoading ||
    tv_top_rated.isLoading
  )
    return <Loader />;
  return (
    <div>
      <HomeBanner media_list={trending_all.data?.results} />
      <Wrapper>
        <div className="my-8 flex flex-col gap-8 ">
          <MediaSlide
            title={`Trending Movie`}
            media_list={trending_movie.data?.results}
            media_type={`movie`}
          />
          <MediaSlide
            title={`Trending Tv Series`}
            media_list={trending_tv.data?.results}
            media_type={`tv`}
          />
          <PersonSlide
            title={`Trending Person`}
            media_list={trending_person.data?.results}
          />
          <MediaSlide
            title={`Movie Top rated`}
            media_list={movie_top_rated.data?.results}
            media_type={`movie`}
          />
          <MediaSlide
            title={`TV Series Top rated`}
            media_list={tv_top_rated.data?.results}
            media_type={`tv`}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default Home;
