import { Outlet } from "react-router-dom";
import { DashboardNavbar } from "../components/dashboardNavbar";
import { DashboardSidebar } from "../components/DashboardSidebar/index";

export const DashboardLayout = () => {
    return (
        <>
            <DashboardNavbar />
            <section className="">
                <div className="grid grid-cols-1 md:grid-cols-5 ">
                    <DashboardSidebar />
                    <div className=" col-span-4 bg-gray-50 p-5 rounded-md">
                        <Outlet />
                    </div>
                </div>
            </section>
        </>
    );
};
