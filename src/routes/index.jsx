import { getToken } from "../utils/helper";
import { Navigate } from "react-router-dom";

import { DashboardLayout } from "../layouts/dashboard.layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Inventory from "../pages/Inventory/Inventory";
import Orders from "../pages/Orders/Orders"; 
import PostProduct from "../pages/postProduct/Index"; 
import Category from "../pages/category";
import Unit from "../pages/productVariant/Unit/Unit";

import { CategoryCreate } from "../pages/category/create";
import { CategoryEdit } from "../pages/category/edit";
import Product from "../pages/products/index";
import { ProductCreate } from "../pages/products/create";
import Brand from "../pages/brand";
import { BrandCreate } from "../pages/brand/create";
import { BrandEdit } from "../pages/brand/edit";
import Color from "../pages/productVariant/color";
import { ColorCreate } from "../pages/productVariant/color/create";
import { ColorEdit } from "../pages/productVariant/color/edit";
import WebSetting from "../pages/webSetting";
import { WebSettingCreate } from "../pages/webSetting/create";
import { WebSettingEdit } from "../pages/webSetting/edit"; 
import Banner from "../pages/banner/index";
import {BannerCreate} from "../pages/banner/create";
import {BannerEdit} from "../pages/banner/edit";
import Attribute from "../pages/productVariant/attribute";
import AttributeCreate from "../pages/productVariant/attribute/create";
import AttributeEdit from "../pages/productVariant/attribute/edit";
import ProductVariant from "../pages/productVariant/productvariant";
 
const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "", element: <Dashboard /> },
      { path: "product", element: <Product></Product> },
      { path: "product/create", element: <ProductCreate /> },
      { path: "post-product", element: <PostProduct /> },
      { path: "inventory", element: <Inventory></Inventory> },
      { path: "orders", element: <Orders></Orders> },
      { path: "product-variant", element: <ProductVariant /> },
      { path: "banner", element: <Banner /> },
      { path: "banner/create", element: <BannerCreate /> },
      { path: "banner/edit/:id", element: <BannerEdit /> },
      { path: "category", element: <Category /> },
      { path: "category/create", element: <CategoryCreate /> },
      { path: "category/edit/:id", element: <CategoryEdit /> }, 
      { path: "brand", element: <Brand /> },
      { path: "brand/create", element: <BrandCreate /> },
      { path: "brand/edit/:id", element: <BrandEdit /> },
      { path: "color", element: <Color /> },
      { path: "color/create", element: <ColorCreate /> },
      { path: "color/edit/:id", element: <ColorEdit /> },
      { path: "attribute", element: <Attribute/> },
      { path: "attribute/create", element: <AttributeCreate /> },
      { path: "attribute/edit/:id", element: <AttributeEdit /> },
      { path: "web-setting", element: <WebSetting /> },
      { path: "web-setting/create", element: <WebSettingCreate /> },
      { path: "web-setting/edit/:id", element: <WebSettingEdit /> 
           

      },
      { path: "unit", element: <Unit /> },
    ],
  },
];

/* Generate permitted routes */
export const permittedRoutes = () => {
  const token = getToken();

  if (token) {
    return appRoutes;
  }

  return [];
};
