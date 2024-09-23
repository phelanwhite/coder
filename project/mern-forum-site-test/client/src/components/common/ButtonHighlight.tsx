import { useAuthStore } from "@/store/auth-store";
import { useHighlightStore } from "@/store/library-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../layout/loader";
import { MdBookmarkAdd, MdOutlineBookmarkAdd } from "react-icons/md";

const ButtonHighlight = ({ id }: { id: string }) => {
  const { user } = useAuthStore();
  const { createHighlight, deleteHighlightById, checkHighlightByMe } =
    useHighlightStore();
  // check save
  const checkSaveResult = useQuery({
    queryKey: ["check-save", id, user],
    queryFn: async () => await checkHighlightByMe(id),
    enabled: !!user,
  });
  useEffect(() => {
    if (checkSaveResult.data) {
      checkSaveResult.data?.data ? setChecked(true) : setChecked(false);
    }
  }, [checkSaveResult.data]);

  const createAndRemoveHighlightResult = useMutation({
    mutationFn: async () => {
      if (checked) {
        const response = await deleteHighlightById(
          checkSaveResult.data?.data?._id
        );
        return response;
      } else {
        const response = await createHighlight({
          type_id: id,
        });
        return response;
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      checked ? setChecked(false) : setChecked(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [checked, setChecked] = useState(false);

  if (createAndRemoveHighlightResult.isPending) return <Loader />;

  return (
    <button
      onClick={() => {
        createAndRemoveHighlightResult.mutate();
      }}
      className="flex items-center gap-1 hover:text-textColor"
    >
      {checked ? (
        <MdBookmarkAdd size={20} />
      ) : (
        <MdOutlineBookmarkAdd size={20} />
      )}
    </button>
  );
};

export default memo(ButtonHighlight);
