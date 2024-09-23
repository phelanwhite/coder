import { useCommentStore } from "@/store/comment-store";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Testpage = () => {
  const id = `66d9092dcbe4e2e3c1c565c4`;
  const { comments, getCommentsByBlogId } = useCommentStore();
  const [page, setPage] = useState(1);
  const getCommentsByMeResult = useInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      return await getCommentsByBlogId(id, `page=${page}`);
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log({ lastPage, allPages });

      return lastPage;
    },
  });

  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    if (getCommentsByMeResult.data) {
      setList((prev) => [...prev, ...comments]);
    }
  }, [getCommentsByMeResult.data]);

  return (
    <div>
      {list?.map((item, index) => (
        <div key={item?._id}>
          <h3>
            {index + 1} - {item?._id} - {item?.comment}
          </h3>
        </div>
      ))}
      <button onClick={() => setPage((prev) => prev + 1)} className="text-link">
        view more
      </button>
    </div>
  );
};

export default Testpage;
