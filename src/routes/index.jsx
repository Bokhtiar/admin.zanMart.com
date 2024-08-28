import { getToken } from "../utils/helper"
import { Navigate } from "react-router-dom"
import { Dashboard } from '../components/dashboard'
import { CategoryEdit } from "../pages/category/edit"
import { CategoryList } from '../pages/category/index'
import { CategoryCreate } from "../pages/category/create"
import { DashboardLayout } from "../layouts/dashboard.layout"

const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "", element: <Dashboard /> },

      /** category */
      { path: "category", element: <CategoryList /> },
      { path: "category/create", element: <CategoryCreate /> },
      { path: "category/edit/:id", element: <CategoryEdit /> },
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