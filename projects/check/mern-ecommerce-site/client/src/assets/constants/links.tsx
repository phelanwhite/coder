import path from "path";
import { FaUser } from "react-icons/fa";

export const authLinks = [
  {
    label: `Account Information`,
    path: `/account`,
    icon: <FaUser />,
  },
  {
    label: `My Notification`,
    path: `/notification`,
    icon: <FaUser />,
  },

  {
    label: `Address Book`,
    path: `/address-book`,
    icon: <FaUser />,
  },
  {
    label: `Change Password`,
    path: `/change-password`,
    icon: <FaUser />,
  },

  {
    label: `Order Management`,
    path: `/order-management`,
    icon: <FaUser />,
  },
  {
    label: `Return Management`,
    path: `/return-management`,
    icon: <FaUser />,
  },
  {
    label: `Product Reviews`,
    path: `/product-reviews`,
    icon: <FaUser />,
  },
  {
    label: `Product you viewed`,
    path: `/product-you-viewed`,
    icon: <FaUser />,
  },
  {
    label: `Product Wishlist`,
    path: `/product-wishlist`,
    icon: <FaUser />,
  },
  {
    label: `Product Bookmark`,
    path: `/product-bookmark`,
    icon: <FaUser />,
  },
  {
    label: `My Comment`,
    path: `/my-comment`,
    icon: <FaUser />,
  },
  {
    label: `Customer Support`,
    path: `/help-center`,
    icon: <FaUser />,
  },
];
export const authMenuLinks = [
  {
    label: `Account Information`,
    path: `/account`,
    icon: <FaUser />,
  },
  {
    label: `My Order`,
    path: `/order-management`,
    icon: <FaUser />,
  },
  {
    label: `Support Center`,
    path: `/help-center`,
    icon: <FaUser />,
  },
];
export const adminLinks = [
  {
    label: `Dashboard`,
    path: ``,
    list: [
      {
        label: `Dashboard`,
        path: ``,
        icon: <FaUser />,
      },
      {
        label: `Account Information`,
        path: `/account`,
        icon: <FaUser />,
      },
    ],
  },
  {
    label: `Management`,
    path: `/management`,
    list: [
      {
        label: `Product Management`,
        path: `/product`,
        icon: <FaUser />,
      },
      {
        label: `Category Management`,
        path: `/category`,
        icon: <FaUser />,
      },
      {
        label: `Brand Management`,
        path: `/brand`,
        icon: <FaUser />,
      },
      {
        label: `User Management`,
        path: `/user`,
        icon: <FaUser />,
      },
      {
        label: `Order Management`,
        path: `/order`,
        icon: <FaUser />,
      },
      {
        label: `Return Management`,
        path: `/return`,
        icon: <FaUser />,
      },
    ],
  },
  {
    label: `Report`,
    path: `/report`,
    list: [
      {
        label: `Product Report`,
        path: `/product`,
        icon: <FaUser />,
      },
      {
        label: `User Report`,
        path: `/user`,
        icon: <FaUser />,
      },
      {
        label: `Order Report`,
        path: `/order`,
        icon: <FaUser />,
      },
      {
        label: `Return Report`,
        path: `/return`,
        icon: <FaUser />,
      },
    ],
  },
  {
    label: `Setting`,
    path: `/setting`,
    list: [
      {
        label: `Site Setting`,
        path: `/site`,
        icon: <FaUser />,
      },
      {
        label: `Email Setting`,
        path: `/email`,
        icon: <FaUser />,
      },
      {
        label: `Social Media Setting`,
        path: `/social-media`,
        icon: <FaUser />,
      },
    ],
  },
];
