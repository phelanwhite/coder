import { LinkType } from "./type";

export const author_links: LinkType[] = [
  {
    title: `Posts`,
    path: ``,
  },
  {
    title: `Lists`,
    path: `/lists`,
  },
  {
    title: `About`,
    path: `/about`,
  },
];

export const search_links: LinkType[] = [
  {
    title: `Posts`,
    path: ``,
  },
  {
    title: `Lists`,
    path: `/lists`,
  },
  {
    title: `Authors`,
    path: `/authors`,
  },
  {
    title: `Tags`,
    path: `/tags`,
  },
];

export const user_links: LinkType[] = [
  {
    title: `Posts`,
    path: `/post`,
    subMenu: [
      {
        title: `Published`,
        path: ``,
      },
      {
        title: `Draft`,
        path: `/draft`,
      },
      {
        title: `Responses`,
        path: `/responses`,
      },
    ],
  },
  {
    title: `Library`,
    path: `/library`,
    subMenu: [
      {
        title: `List`,
        path: ``,
      },
      {
        title: `Series`,
        path: `/series`,
      },
      {
        title: `Discussions`,
        path: `/discussions`,
      },
      {
        title: `Following`,
        path: `/following`,
      },
      {
        title: `Followers`,
        path: `/followers`,
      },
    ],
  },
  {
    title: `Activity`,
    path: `/activity`,
    subMenu: [
      {
        title: `History`,
        path: ``,
      },
      {
        title: `Responses`,
        path: `/responses`,
      },
      {
        title: `Bookmark`,
        path: `/bookmark`,
      },
      {
        title: `Favorite`,
        path: `/favorite`,
      },
    ],
  },
];
