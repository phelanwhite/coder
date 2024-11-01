import { useBookmarkContext } from "../contexts/bookmark-context";
import { useQueries } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getBookImage } from "../utils/libraryApi";

const Bookmark = () => {
  const { bookmarks } = useBookmarkContext();

  const getBookmarksResult = useQueries({
    queries: bookmarks.map((item) => {
      return {
        queryKey: ["bookmarks", item.bookId],
        queryFn: async () => {
          const url = `https://openlibrary.org/works/${item.bookId}.json`;
          const response = await fetch(url).then((res) => res.json());
          return response;
        },
      };
    }),
    // [
    //   {
    //     queryKey: ["bookmarks"],
    //     queryFn: async () => {
    //       const url = `https://openlibrary.org/works/${id}.json`;
    //       const response = await fetch("https://api.example.com/bookmarks");
    //       return await response.json();
    //     },
    //   },
    // ],
  });

  return (
    <div className="my-8 flex flex-col md:flex-row md:items-start gap-8 wrapper">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {getBookmarksResult.map((item, index) => {
          return (
            <Link
              key={index}
              to={`/${item?.data?.key?.replace("/works/", "")}`}
              className="overflow-hidden rounded border shadow"
            >
              <div className="aspect-thumbnail">
                <img
                  src={getBookImage(item.data?.covers?.[0])}
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="p-3 space-y-2 text-center font-semibold">
                <div>{item.data?.title}</div>
                <div className="line-clamp-1">
                  <span>Edition count: </span>
                  <span className="text-stone-500">
                    {item?.data?.edition_count}
                  </span>
                </div>
                <div className="line-clamp-1 italic">
                  <span className="text-stone-500">
                    {item?.data?.first_publish_date}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmark;
