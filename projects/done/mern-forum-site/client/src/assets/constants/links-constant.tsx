export const USER_MENU_LINKS = {
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
      title: `Library`,
      path: `/me/my-library`,
      submenu: [{ title: "List", path: "" }],
    },
    {
      title: `Activity`,
      path: `/me/my-activity`,
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
      title: `Library`,
      path: `/me/my-library`,
      submenu: [{ title: "List", path: "" }],
    },
    {
      title: `Activity`,
      path: `/me/my-activity`,
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
          path: ``,
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
