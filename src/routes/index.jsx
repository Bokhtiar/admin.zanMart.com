import { getToken } from "../utils/helper"
import { Navigate  } from "react-router-dom"


import { DashboardLayout } from "../layouts/dashboard.layout"
import Dashboard from "../pages/Dashboard/Dashboard"
import Products from "../pages/Products/Products"
import Inventory from "../pages/Inventory/Inventory"
import Orders from "../pages/Orders/Orders"
import ProductVariant from "../pages/productVariant/Index"
import PostProduct from "../pages/postProduct/Index"
import Banner from "../pages/Banner/Index"
import SingleBanner from "../pages/Banner/SingleBanner/SingleBanner"
import Category from "../pages/category"
import Color from "../pages/productVariant/Color/Color"
import Brand from "../pages/productVariant/Brand/Brand"
import Unit from "../pages/productVariant/Unit/Unit"
 
import { CategoryCreate } from "../pages/category/create"
import { CategoryEdit } from "../pages/category/edit"
 

const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "", element: <Dashboard/> },
      { path: "products", element: <Products></Products> },
      { path: "post-product", element: <PostProduct/> },
      { path: "inventory", element: <Inventory></Inventory> },
      { path: "orders", element: <Orders></Orders> },
      { path: "product-variant", element: <ProductVariant/> },
      { path: "banner", element: <Banner/> },
      { path: "category", element: <Category/> },
      { path: "category/create", element: <CategoryCreate/> }, 
      { path: "category/edit/:id", element: <CategoryEdit/> },
      { path: "banner/:id", element: <SingleBanner/> },
      { path: "color", element: <Color/> },
      { path: "brand", element: <Brand/> },
      { path: "unit", element: <Unit/> },
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