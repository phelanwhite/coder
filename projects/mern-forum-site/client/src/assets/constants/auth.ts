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

export const FORUM_MENU_LINKS = {
  my_blog: [
    { title: "Draft", path: "/me/my-blogs" },
    { title: "Published", path: "/me/my-blogs/published" },
    { title: "Responses", path: "/me/my-blogs/responses" },
  ],
  activity: [
    { title: "History", path: "/me/activity" },
    { title: "Comment", path: "/me/activity/comment" },
    { title: "Bookmark", path: "/me/activity/bookmark" },
    { title: "Favorite", path: "/me/activity/favorite" },
  ],
  management: [
    { title: "Topic", path: "/admin/management" },
    { title: "Comment", path: "/admin/management/comment" },
  ],
};

export const USER_KEYS = {};
