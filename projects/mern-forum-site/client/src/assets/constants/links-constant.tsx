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

export const USER_MENU_LINKS = {
  menu1: [{ title: `My Profile`, path: `/me/profile` }],
  menu2: [
    {
      title: `New blog`,
      path: `/me/new-blog`,
    },
    {
      title: `My blogs`,
      path: `/me/my-blogs`,
    },
    {
      title: `Activity`,
      path: `/me/activity`,
    },
  ],
  menu3: [
    {
      title: `
    Website management
    `,
      path: `/admin/management`,
    },
  ],
  menu4: [{ title: `Settings`, path: `/settings` }],
};

export const USER_MENU_PROTECTED_LINKS = [
  {
    title: "My Blog",
    path_parent: `/me/my-blogs`,
    submenu: [
      { title: "Published", path: "/me/my-blogs" },
      { title: "Draft", path: "/me/my-blogs/draft" },
      { title: "Responses", path: "/me/my-blogs/responses" },
    ],
  },
  {
    title: "Activity",
    path_parent: `/me/activity`,
    submenu: [
      { title: "History", path: "/me/activity" },
      { title: "Comment", path: "/me/activity/comment" },
      { title: "Bookmark", path: "/me/activity/bookmark" },
      { title: "Favorite", path: "/me/activity/favorite" },
    ],
  },
  {
    title: "Management",
    path_parent: `/me/management`,
    submenu: [
      { title: "Topic", path: "/admin/management" },
      { title: "Comment", path: "/admin/management/comment" },
    ],
  },
];
// {
//   my_blog: [
//     { title: "Draft", path: "/me/my-blogs" },
//     { title: "Published", path: "/me/my-blogs/published" },
//     { title: "Responses", path: "/me/my-blogs/responses" },
//   ],
//   activity: [
//     { title: "History", path: "/me/activity" },
//     { title: "Comment", path: "/me/activity/comment" },
//     { title: "Bookmark", path: "/me/activity/bookmark" },
//     { title: "Favorite", path: "/me/activity/favorite" },
//   ],
//   management: [
//     { title: "Topic", path: "/admin/management" },
//     { title: "Comment", path: "/admin/management/comment" },
//   ],
// };
