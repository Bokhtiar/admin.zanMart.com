import { getToken } from "../utils/helper"
import { Navigate } from "react-router-dom"


import { DashboardLayout } from "../layouts/dashboard.layout"
import Dashboard from "../pages/Dashboard/Dashboard"
import Products from "../pages/Products/Products"
import Inventory from "../pages/Inventory/Inventory"
import Orders from "../pages/Orders/Orders"


const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "", element: <Dashboard/> },
      { path: "products", element: <Products></Products> },
      { path: "inventory", element: <Inventory></Inventory> },
      { path: "orders", element: <Orders></Orders> },
    ],
  },
]; 

/* Generate permitted routes */
export const permittedRoutes = () => {
    // const token = getToken();
    // if (token) {
    //     return appRoutes;
    // }
    return appRoutes;

    return [];
};