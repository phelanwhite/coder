import React, { useEffect } from "react";
import banner from "assets/images/banner-about.png";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getTmdbImage } from "services/tmdbApi";
import DataTable from "react-data-table-component";
import Wrapper from "components/ui/wrapper";
import {
  useGetMovieListQuery,
  useRemoveMovieMutation,
} from "features/my-movie/services/myMovieApi";

const MediaFavorites = () => {
  const getMovieList = useGetMovieListQuery();

  const [removeMovie, removeMovieResult] = useRemoveMovieMutation();
  useEffect(() => {
    if (removeMovieResult.isSuccess) {
      toast.success(removeMovieResult?.data?.message);
    }
    if (removeMovieResult.isError) {
      toast.error(removeMovieResult?.error?.data?.message);
    }
  }, [removeMovieResult]);
  const columns = [
    {
      name: "Stt",
      selector: (row, index) => index + 1,
      width: `100px`,
    },
    {
      name: "Title",
      selector: (row) => (
        <Link to={`/media-id/${row?.id}?media_type=${row?.media_type}`}>
          {row.title || row.name}
        </Link>
      ),
    },
    {
      name: "Thumbnail",
      selector: (row) => (
        <div className="w-10 py-1">
          <img src={getTmdbImage(row.poster_path)} loading="lazy" alt="" />
        </div>
      ),
    },
    {
      name: "Genres",
      selector: (row) => row?.genres?.map((item) => item?.name)?.join(", "),
    },
    {
      name: "Release date",
      selector: (row) =>
        new Date(row?.release_date || row?.first_air_date).getFullYear(),
    },
    {
      name: "Action",
      selector: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => removeMovie({ id: row?._id })}
        >
          <MdDelete />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div
        className="min-h-[30vh] md:min-h-[50vh] flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
                url(${banner}) no-repeat center/cover`,
        }}
      >
        <Wrapper>
          <div className="text-2xl text-white text-center font-semibold">
            Media Favorites
          </div>
        </Wrapper>
      </div>
      <div className="my-8">
        <Wrapper>
          <DataTable columns={columns} data={getMovieList.data?.result} />
        </Wrapper>
      </div>
    </div>
  );
};

export default MediaFavorites;
