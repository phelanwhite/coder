import Loader from "@/components/layouts/loader";
import { useHighlightStore } from "@/stores/library-store";
import { useMutation } from "@tanstack/react-query";
import { memo } from "react";
import toast from "react-hot-toast";
import ButtonOption from "../ButtonOption";
import { HiDotsHorizontal } from "react-icons/hi";

const HighlightItemMenu = ({ data }: { data: any }) => {
  const { deleteHighlightById } = useHighlightStore();
  const deleteHighlightByIdResult = useMutation({
    mutationFn: async () => {
      const response = await deleteHighlightById(data?._id);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  if (deleteHighlightByIdResult.isPending) return <Loader />;
  return (
    <ButtonOption label={<HiDotsHorizontal />}>
      <div>
        <button
          onClick={() => deleteHighlightByIdResult.mutate()}
          className="text-left px-4 py-2 block w-max text-red-500 hover:text-textColor"
        >
          Remove article
        </button>
      </div>
    </ButtonOption>
  );
};

export default memo(HighlightItemMenu);
