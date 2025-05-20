import { RiImageEditFill } from "react-icons/ri";
import { FaShoppingCart, FaTrademark, FaCrown, FaBoxes } from "react-icons/fa";
import {
  MdOutlineProductionQuantityLimits,
  MdDashboard,
  MdFormatListBulleted,
} from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BsPaletteFill } from "react-icons/bs";
import { HiOutlineScale } from "react-icons/hi";
import { FiSettings, FiBox } from "react-icons/fi";
export const menuData = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    path: "/dashboard",
  },
  {
    title: "Order",
    icon: <FaShoppingCart />,
    path: "/dashboard/order",
  },
  {
    title: "Banner",
    icon: <RiImageEditFill />,
    path: "/dashboard/banner",
  },
  {
    title: "Category",
    icon: <BiCategory />,
    // path: "/dashboard/category",
    childrens: [
      {
        title: "Category",
        icon: <BiCategory />,
        path: "/dashboard/category",
      },
      {
        title: "Home Category",
        icon: <AiFillHome />,
        path: "/dashboard/category/homepage",
      },
    ],
  },
  {
    title: "Brand",
    icon: <FaTrademark />,
    path: "/dashboard/brand",
  },

  {
    title: "Product",
    icon: <FiBox />,
    childrens: [
      {
        title: "Color",
        icon: <BsPaletteFill />,
        path: "/dashboard/color",
      },
      {
        title: "Attribute",
        icon: <MdFormatListBulleted />,
        path: "/dashboard/attribute",
      },
      {
        title: "Unit",
        icon: <HiOutlineScale />,
        path: "/dashboard/unit",
      },
      {
        title: "Product",
        icon: <MdOutlineProductionQuantityLimits />,
        path: "/dashboard/product",
      },
      // {
      //   title: "Product Variant",
      //   icon: <FaBoxes />,
      //   path: "/dashboard/product-variant",
      // },
      {
        title: "Best Selling",
        icon: <FaCrown />,
        path: "/dashboard/product/best-selling",
      },
    ],
  },

  {
    title: "WebSetting",
    icon: <FiSettings />,
    path: "/dashboard/web-setting",
  },
];
