 
import React, { useState } from "react";
import { menuData } from "./menuData";
import SidebarItem from "./SidebarItem";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  // Toggle Sidebar
  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Toggle Submenu
  // const toggleSubmenu = () => setIsSubmenuOpen(!isSubmenuOpen);
  // const [idx,setIdx] = useState(null);
  return (
    <div className="flex  ">
      {/* Sidebar */}

      <div
        className={`fixed top-0 left-0 h-full bg-blue-600 text-white w-72  space-y-6 px-2   transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        {/* Close button for mobile */}
        <button
          onClick={toggleSidebar}
          className="block md:hidden ml-auto text-xl px-2"
        >
          ✕
        </button>

        <div className="flex justify-center items-center gap-2">
          <img src="../../../public/favicon.ico" alt="logo..." className="" />
          <h1 className="text-3xl font-bold text-center italic">ZANMART</h1>
        </div>
        <nav>
          <ul className="space-y-2">
           
       {   menuData?.map((item, index) => <SidebarItem key={index} item={item} />) }
          </ul>
        </nav>
      </div>
      {/* Main content */}
      <div className="flex-1   min-h-screen">
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="p-4 text-gray-800 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
