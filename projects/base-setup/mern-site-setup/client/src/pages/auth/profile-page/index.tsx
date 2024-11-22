import ButtonComponent from "@/components/form/button-component";
import Loader from "@/components/form/loader";
import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const ProfliePage = () => {
  const { getMe, user } = useAuthStore();
  const getMeResult = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      return await getMe();
    },
  });

  return (
    <>
      {getMeResult.isLoading && <Loader />}
      <div>
        {/* profile picture */}
        <div className="relative mb-14">
          <div className="block aspect-video rounded overflow-hidden w-full h-[150px] md:h-[230px] bg-gray-100">
            <img src={user?.banner} alt="" loading="lazy" />
          </div>
          <div className="absolute -bottom-14 left-4 p-1 bg-white rounded-full">
            <div className="block rounded-full overflow-hidden w-28 h-28">
              <img src={user?.avatar} alt="" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="font-medium text-xl">{user?.name}</div>
          <Link to={`update`} className="inline-block">
            <ButtonComponent
              size="sm"
              className="rounded-lg w-full md:w-max"
              color="success"
              icon={<MdEdit />}
            >
              Update Profile
            </ButtonComponent>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfliePage;
