import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const InfiniteQueriesPage = () => {
  const [limit, setLimit] = useState(100);

  const todosResult = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: async ({ pageParam }) => {
      return fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}&_limit=${limit}`
      ).then((res) => res.json());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      // console.log({ lastPage, allPages, lastPageParam, allPageParams });
      if (lastPage?.length) {
        return lastPageParam + 1;
      } else {
        return undefined;
      }
    },
  });

  // console.log({ todosResult });

  return (
    <div>
      <ul>
        {todosResult.data?.pages?.map((item: any) =>
          item?.map((t: any) => (
            <li key={t?.id} style={{ listStyle: "none", textAlign: "left" }}>
              {t?.id} - {t?.title}
            </li>
          ))
        )}
      </ul>
      <div className="text-center text-xs to-blue-500">
        <button
          onClick={() => {
            todosResult.fetchNextPage({});
          }}
          disabled={!todosResult.hasNextPage || todosResult.isFetchingNextPage}
        >
          {todosResult.isFetchingNextPage
            ? "Loading more..."
            : todosResult.hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default InfiniteQueriesPage;
