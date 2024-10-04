import account_notfound from "@/assets/images/account-notfound.png";
import thumbnail_notFound from "@/assets/images/thumbnail-notfound.png";

import { BsBarChart } from "react-icons/bs";
import { LuClipboardList, LuUser } from "react-icons/lu";
import { TbLibrary } from "react-icons/tb";

export const images = {
  account_notfound: account_notfound,
  thumbnail_notFound: thumbnail_notFound,
};

export const authLinks = {
  menu: {
    path: `/me`,
    list1: [
      {
        title: "Profile",
        path: "/profile",
        icon: <LuUser />,
      },
      {
        title: "Library",
        path: "/library/list",
        icon: <TbLibrary />,
      },
      {
        title: "Stories",
        path: "/stories/drafts",
        icon: <LuClipboardList />,
      },
      {
        title: "Stats",
        path: "/stats",
        icon: <BsBarChart />,
      },
    ],
    list2: [
      {
        title: "Settings",
        path: "/settings",
      },
      {
        title: "Refine recommendations",
        path: "/refine-recommendations",
      },
      {
        title: "Manage publications",
        path: "/manage-publishers",
      },
      {
        title: "Help",
        path: "/help",
      },
    ],
    list3: [
      {
        title: "Become a Medium member",
        path: "/become-a-medium-member",
      },
      {
        title: "Create a Mastodon account",
        path: "/create-a-mastodon-account",
      },
      {
        title: "Manage publications",
        path: "/manage-publishers",
      },
      {
        title: "Apply for author verification",
        path: "/apply-for-author-verification",
      },
      {
        title: "Apply to the Partner Program",
        path: "/apply-to-the-partner-program",
      },
      {
        title: "Gift a membership",
        path: "/gift-a-membership",
      },
    ],
  },
  profile: {
    path: `/me/profile`,
    list: [
      {
        title: `Home`,
        path: ``,
      },
      {
        title: `About`,
        path: `/about`,
      },
    ],
  },
  library: {
    path: `/me/library`,
    list: [
      {
        title: `Your lists`,
        path: `/list`,
      },
      {
        title: `Saved lists`,
        path: `/saved`,
      },
      {
        title: `Highlights`,
        path: `/highlights`,
      },
      {
        title: `Reading history`,
        path: `/reading-history`,
      },
    ],
  },
  stories: {
    path: `/me/stories`,
    list: [
      {
        title: `Drafts`,
        path: `/drafts`,
      },
      {
        title: `Published`,
        path: `/published`,
      },
      {
        title: `Responses`,
        path: `/responses`,
      },
    ],
  },
  notifications: {
    path: `/me/notifications`,
    list: [
      {
        title: `All`,
        path: ``,
      },
      {
        title: `Responses`,
        path: `/responses`,
      },
    ],
  },
};
