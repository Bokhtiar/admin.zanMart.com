import { Outlet } from "react-router-dom";
import DashboardSidebar from '../../src/components/DashboardSidebar/index'

export const DashboardLayout = () => {
    return (
        <>
         
            <section className="">
                <div className="grid grid-cols-1 md:grid-cols-5 ">
                    <DashboardSidebar></DashboardSidebar>
                    <div className=" col-span-4 p-5 rounded-md">
                        <Outlet />
                    </div>
                </div>
            </section>
        </>
    );
};
