import { Outlet } from "react-router-dom";
import DashboardSidebar from '../../src/components/DashboardSidebar/index'
import { DashboardNavbar } from "../components/dashboardNavbar";

export const DashboardLayout = () => {
    return (
        <>
         
            <section className="">
                <div className="grid grid-cols-1 md:grid-cols-5   ">
                    <DashboardSidebar></DashboardSidebar>
                    <div className=" col-span-4 p-2 rounded-md  ">
                        <DashboardNavbar/>
                        <Outlet />
                    </div>
                </div>
            </section>
        </>
    );
};
