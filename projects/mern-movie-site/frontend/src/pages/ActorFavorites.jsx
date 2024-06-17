import React, { useEffect } from "react";
import banner from "assets/images/banner-about.png";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getTmdbImage } from "services/tmdbApi";
import Wrapper from "layouts/Wrapper";
import DataTable from "react-data-table-component";
import {
  useGetActorListQuery,
  useRemoveActorMutation,
} from "features/myActorApi";

const ActorFavorites = () => {
  const getActorList = useGetActorListQuery();

  const [removeActor, removeActorResult] = useRemoveActorMutation();
  useEffect(() => {
    if (removeActorResult.isSuccess) {
      toast.success(removeActorResult?.data);
    }
    if (removeActorResult.isError) {
      toast.error(removeActorResult?.error?.data?.message);
    }
  }, [removeActorResult]);
  const columns = [
    {
      name: "Stt",
      selector: (row, index) => index + 1,
      width: `100px`,
    },
    {
      name: "Name",
      selector: (row) => (
        <Link to={`/actor-id/${row?.id}`}>{row.title || row.name}</Link>
      ),
    },
    {
      name: "Avatar",
      selector: (row) => (
        <div className="w-10 py-1">
          <img src={getTmdbImage(row.profile_path)} loading="lazy" alt="" />
        </div>
      ),
    },
    {
      name: "Place of birth",
      selector: (row) => row?.place_of_birth,
    },
    {
      name: "Birthday",
      selector: (row) => row?.birthday,
    },
    {
      name: "Action",
      selector: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => removeActor({ id: row?._id })}
        >
          <MdDelete />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div
        className="min-h-[250px] flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
                url(${banner}) no-repeat center/cover`,
        }}
      >
        <Wrapper>
          <div className="text-2xl text-white text-center font-semibold">
            Actor Favorites
          </div>
        </Wrapper>
      </div>
      <div className="my-8">
        <Wrapper>
          <DataTable
            columns={columns}
            data={getActorList.data}
            customStyles={{
              headRow: {
                style: {
                  backgroundColor: "rgb(245, 245, 244)",
                },
              },
              rows: {
                style: {
                  backgroundColor: "rgb(245, 245, 244)",
                },
              },
            }}
          />
        </Wrapper>
      </div>
    </div>
  );
};

export default ActorFavorites;
