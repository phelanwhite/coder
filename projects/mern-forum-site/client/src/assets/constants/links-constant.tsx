import { FaHome, FaSearch } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";

// export const header_links = [
//   {
//     title: "Home",
//     path: "/",
//     icon: <FaHome />,
//   },
//   {
//     title: "Movies",
//     path: "/movies",
//     icon: <MdLocalMovies />,
//   },
//   {
//     title: "TV Series",
//     path: "/tv-series",
//     icon: <RiMovie2Fill />,
//   },
//   {
//     title: "Search",
//     path: "/search",
//     icon: <FaSearch />,
//   },
// ];

// export const user_links = [
//   {
//     title: "Update Me",
//     path: "/update-me",
//     icon: <FaHome />,
//   },
//   {
//     title: "Change Password",
//     path: "/change-password",
//     icon: <RiMovie2Fill />,
//   },
//   {
//     title: "My Favorite",
//     path: "/my-favorite",
//     icon: <RiMovie2Fill />,
//   },
//   {
//     title: "My Bookmark",
//     path: "/my-bookmark",
//     icon: <RiMovie2Fill />,
//   },
//   {
//     title: "My Comment",
//     path: "/my-comment",
//     icon: <RiMovie2Fill />,
//   },
// ];

export const USER_MENU_LINKS = {
  menu1: [{ title: `My Profile`, path: `/me/profile`, submenu: [] }],
  menu2: [
    {
      title: `New blog`,
      path: `/me/new-blog`,
      submenu: [],
    },
    {
      title: `Notifications`,
      path: `/me/notifications`,
      submenu: [{ title: "Blogs", path: "" }],
    },
    {
      title: `My blogs`,
      path: `/me/my-blogs`,
      submenu: [
        { title: "Published", path: "" },
        { title: "Draft", path: "/draft" },
        { title: "Responses", path: "/responses" },
      ],
    },
    {
      title: `Activity`,
      path: `/me/activity`,
      submenu: [
        { title: "History", path: "" },
        { title: "Comment", path: "/comment" },
        { title: "Bookmark", path: "/bookmark" },
        { title: "Favorite", path: "/favorite" },
      ],
    },
  ],
  menu4: [{ title: `Settings`, path: `/settings`, submenu: [] }],
};
export const ADMIN_MENU_LINKS = {
  menu1: [
    { title: `My Profile`, path: `/me/profile`, submenu: [] },
    {
      title: `Notifications`,
      path: `/me/notifications`,
      submenu: [{ title: "Blogs", path: "" }],
    },
  ],
  menu2: [
    {
      title: `New blog`,
      path: `/me/new-blog`,
      submenu: [],
    },

    {
      title: `My blogs`,
      path: `/me/my-blogs`,
      submenu: [
        { title: "Published", path: "" },
        { title: "Draft", path: "/draft" },
        { title: "Responses", path: "/responses" },
      ],
    },
    {
      title: `Activity`,
      path: `/me/activity`,
      submenu: [
        { title: "History", path: "" },
        { title: "Comment", path: "/comment" },
        { title: "Bookmark", path: "/bookmark" },
        { title: "Favorite", path: "/favorite" },
      ],
    },
  ],
  menu3: [
    {
      title: `Dashboard`,
      path: `/admin`,
      submenu: [
        {
          title: `Dashboard`,
          path: `/`,
        },
        {
          title: `Users`,
          path: `/users`,
        },
        {
          title: `Blogs`,
          path: `/blogs`,
        },
        {
          title: `Comments`,
          path: `/comments`,
        },
      ],
    },
  ],
  menu4: [{ title: `Settings`, path: `/settings`, submenu: [] }],
};
