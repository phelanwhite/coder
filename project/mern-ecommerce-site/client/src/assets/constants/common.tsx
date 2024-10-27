import { FaUserCircle } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";

export const gender = [
  {
    label: "---Select Gender---",
    value: "",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Other",
    value: "other",
  },
];

export const suggestionTodayOptions = [
  {
    label: `For you`,
    image: `https://salt.tikicdn.com/cache/w100/ts/ta/70/b9/49/43f25c0f4ee6b7a0d918f047e37e8c87.png.webp`,
  },
  {
    label: `Top deal`,
    image: `https://salt.tikicdn.com/cache/w100/ts/ta/12/59/f8/ef3c42e93fac779a393a5cd98a394ea6.png.webp`,
  },
];

export const sort_options = [
  {
    label: "Popularity",
    value: "popularity",
  },
  {
    label: "Best Seller",
    value: "top_seller",
  },
  {
    label: "New item",
    value: "newest",
  },
  {
    label: "Price low to high",
    value: "price_low_to_high",
  },
  {
    label: "Price high to low",
    value: "price_high_to_low",
  },
];

export const role_options = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Member",
    value: "member",
  },
];

export const data_helper = {
  customer_care: {
    label: `Customer care`,
    list: [
      {
        icon: <IoIosCall />,
        label: `Hotline`,
        value: `1900-0000`,
        description: `1000 VND/minute, 8am-9pm including Saturday and Sunday`,
      },
      {
        icon: <FaUserCircle />,
        label: `Meet Personal Assistant`,
        value: `Chat now`,
        description: `8am-9pm including Saturday and Sunday`,
      },
      {
        icon: <IoMailOutline />,
        label: `Submit a support request`,
        value: `Create a request`,
        description: `Or email to hotro@tiki.vn`,
      },
    ],
  },
  lookup_information: {
    label: `Look up information`,
    list: [
      {
        icon: <IoIosCall />,
        label: `Help Center`,
        value: `https://tiki.vn/help-center`,
        description: `Visit our Help Center for answers`,
      },
      {
        icon: <IoIosCall />,
        label: `Contact us`,
        value: `https://tiki.vn/contact-us`,
        description: `Contact our customer service team`,
      },
      {
        icon: <IoIosCall />,
        label: `Terms and conditions`,
        value: `https://tiki.vn/terms-and-conditions`,
        description: `Read our terms and conditions`,
      },
      {
        icon: <IoIosCall />,
        label: `Privacy Policy`,
        value: `https://tiki.vn/privacy-policy`,
        description: `Learn about our privacy policy`,
      },
      {
        icon: <IoIosCall />,
        label: `Return Policy`,
        value: `https://tiki.vn/return-policy`,
        description: `Return our return`,
      },
    ],
  },
};
