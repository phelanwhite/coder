import { useQueries } from "@tanstack/react-query";
import React from "react";

const QueriesPage = () => {
  const posts = [
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
      userId: 1,
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
    {
      userId: 1,
      id: 4,
      title: "eum et est occaecati",
      body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    },
    {
      userId: 1,
      id: 5,
      title: "nesciunt quas odio",
      body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
    },
  ];
  const comments = useQueries({
    queries: posts.map((item) => {
      return {
        queryKey: ["posts", item.id],
        queryFn: async () => {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/comments?postId=${item.id}`
          );
          return await response.json();
        },
      };
    }),
  });

  return (
    <div>
      {comments.map((item: any) =>
        item?.data?.map((c: any) => (
          <div key={c?.id} className="border-b pb-4 pt-4 first:pt-0">
            <div className="font-medium">
              {c?.email} <span>comment post</span> {c?.postId}
            </div>
            <div>{c?.body}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default QueriesPage;
