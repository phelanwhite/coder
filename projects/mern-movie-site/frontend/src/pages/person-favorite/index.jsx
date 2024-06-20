import React, { useEffect } from "react";
import banner from "assets/images/banner-about.png";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getTmdbImage } from "services/tmdbApi";
import DataTable from "react-data-table-component";
import Wrapper from "components/ui/wrapper";
import {
  useGetPersonListQuery,
  useRemovePersonMutation,
} from "features/person/services/myPersonApi";

const PersonFavorites = () => {
  const getPersonList = useGetPersonListQuery();

  const [removePerson, removePersonResult] = useRemovePersonMutation();
  useEffect(() => {
    if (removePersonResult.isSuccess) {
      toast.success(removePersonResult?.data?.message);
    }
    if (removePersonResult.isError) {
      toast.error(removePersonResult?.error?.data?.message);
    }
  }, [removePersonResult]);

  const columns = [
    {
      name: "Stt",
      selector: (row, index) => index + 1,
      width: `100px`,
    },
    {
      name: "Name",
      selector: (row) => (
        <Link to={`/person-id/${row?.id}`}>{row.title || row.name}</Link>
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
          onClick={() => removePerson({ id: row?._id })}
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
            Person Favorites
          </div>
        </Wrapper>
      </div>
      <div className="my-8">
        <Wrapper>
          <DataTable columns={columns} data={getPersonList.data?.result} />
        </Wrapper>
      </div>
    </div>
  );
};

export default PersonFavorites;
