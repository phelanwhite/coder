import { LinkType } from "./type";

export const author_links: LinkType[] = [
  {
    title: `Home`,
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
        path: `/list`,
      },
    ],
  },
  {
    title: `Activity`,
    path: `/activity`,
    subMenu: [
      {
        title: `History`,
        path: `/history`,
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
        title: `Clap`,
        path: `/clap`,
      },
    ],
  },
];
