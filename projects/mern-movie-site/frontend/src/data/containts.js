import {
  FaFacebook,
  FaGithub,
  FaHome,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaSearch,
  FaHeart,
  FaUserEdit,
} from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";

export const menuHeaderLink = [
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

export const menuFooterLink = [
  {
    title: "Facebook",
    path: "/",
    icon: <FaFacebook />,
  },
  {
    title: "Youtube",
    path: "/",
    icon: <FaYoutube />,
  },
  {
    title: "Instagram ",
    path: "/",
    icon: <FaInstagram />,
  },
  {
    title: "Github",
    path: "/",
    icon: <FaGithub />,
  },
  {
    title: "Twitter",
    path: "/",
    icon: <FaTwitter />,
  },
];

export const menuPersonalLink = [
  {
    title: "Media Favorites",
    path: "/media-favorites",
    icon: <FaHeart />,
  },
  {
    title: "Person Favorites",
    path: "/person-favorites",
    icon: <FaHeart />,
  },
  {
    title: "Update Profile",
    path: "/update-profile",
    icon: <FaUserEdit />,
  },
];

export const search_type = [
  {
    title: `Multi`,
    value: `multi`,
  },
  //   {
  //     title: `Collection`,
  //     value: `collection`,
  //   },
  //   {
  //     title: `Company`,
  //     value: `company`,
  //   },
  {
    title: `Movie`,
    value: `movie`,
  },
  {
    title: `Person`,
    value: `person`,
  },
  {
    title: `Tv Series`,
    value: `tv`,
  },
];
