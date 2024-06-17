import { useQuery } from "@tanstack/react-query";
import Loader from "components/Loader";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { getTmdbUrl } from "services/tmdbApi";
// path_view_more
// media_type
const ViewMore = () => {
  const [searchParams] = useSearchParams({
    page: 1,
  });
  const view_more = useQuery({
    queryKey: [`view_more`, Array.from(searchParams)],
    queryFn: async () => {
      const response = await getTmdbUrl(
        `${searchParams.get("media_type")}/similar`
      );
      return response;
    },
  });

  if (view_more.isLoading) return <Loader />;
  return <div>ViewMore</div>;
};

export default ViewMore;
