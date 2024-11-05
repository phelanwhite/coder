import { FaHome, FaSearch } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";

export const header_links = [
  {
    title: "Home",
    path: "/",
    icon: <FaHome />,
  },
  {
    title: "Movies",
    path: "/movies",
    icon: <MdLocalMovies />,
  },
  {
    title: "TV Series",
    path: "/tv-series",
    icon: <RiMovie2Fill />,
  },
  {
    title: "Search",
    path: "/search",
    icon: <FaSearch />,
  },
];

export const user_links = [
  {
    title: "Update Me",
    path: "/update-me",
    icon: <FaHome />,
  },
  {
    title: "Change Password",
    path: "/change-password",
    icon: <RiMovie2Fill />,
  },
  {
    title: "My Favorite",
    path: "/my-favorite",
    icon: <RiMovie2Fill />,
  },
  {
    title: "My Bookmark",
    path: "/my-bookmark",
    icon: <RiMovie2Fill />,
  },
  {
    title: "My Comment",
    path: "/my-comment",
    icon: <RiMovie2Fill />,
  },
];
