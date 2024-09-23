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
  path: `/me`,
  list1: [
    {
      title: "Profile",
      path: "/me/profile",
      icon: <LuUser />,
    },
    {
      title: "Library",
      path: "/me/library/list",
      icon: <TbLibrary />,
    },
    {
      title: "Stories",
      path: "/me/stories/drafts",
      icon: <LuClipboardList />,
    },
    {
      title: "Stats",
      path: "/me/stats",
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
};

export const links = {
  profile: [
    {
      title: `Home`,
      path: `/me/profile`,
    },
    {
      title: `About`,
      path: `/me/profile/about`,
    },
  ],
  library: [
    {
      title: `Your lists`,
      path: `/me/library/list`,
    },
    {
      title: `Saved lists`,
      path: `/me/library/saved`,
    },
    {
      title: `Highlights`,
      path: `/me/library/highlights`,
    },
    {
      title: `Reading history`,
      path: `/me/library/reading-history`,
    },
  ],
  stories: [
    {
      title: `Drafts`,
      path: `/me/stories/drafts`,
    },
    {
      title: `Published`,
      path: `/me/stories/published`,
    },
    {
      title: `Responses`,
      path: `/me/stories/responses`,
    },
  ],
  notifications: [
    {
      title: `All`,
      path: `/me/notifications`,
    },
    {
      title: `Responses`,
      path: `/me/notifications/responses`,
    },
  ],
};
