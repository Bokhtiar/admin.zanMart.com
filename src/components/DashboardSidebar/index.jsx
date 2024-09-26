import React, { useState } from 'react';
import { Link,useLocation,useNavigate, useParams } from 'react-router-dom';
 
import {removeToken} from "../../utils/helper";
const DashboardSidebar = () => { 
    const [isOpen, setIsOpen] = useState(true);
 const router = useNavigate();
 const {pathname}  = useLocation();
   console.log(pathname);
    const handleSidebar = (sidebar) => { 
        toggleSidebar();
      
    };

    const toggleSidebar = () => {
        setIsOpen(isOpen);
    };

    return (
        <div>
            {/* Toggle button */}
            {!isOpen && (
                <button
                    onClick={toggleSidebar}
                    className="p-2 bg-gray-800 text-white fixed top-4 left-4 z-50"
                >
                    ☰
                </button>
            )}

            {/* Sidebar */}
            <div
                className={`fixed col-span-1 top-0 z-10 left-0 h-full w-72 bg-gray-800 text-white transition-transform transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                    <ul className="mt-10">
                        <li className="mb-4">
                            <Link
                                to="/dashboard"
                                // onClick={() => handleSidebar('dashboard')}
                                className={`${
                                    pathname === '/dashboard'
                                        ? 'text-lg bg-blue-500 px-5 py-2 w-full rounded-lg'
                                        : 'text-lg px-5 py-2 hover:text-gray-400'
                                }`}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                to="/dashboard/orders" 
                                className={`${
                                    pathname === "/dashboard/orders"
                                        ? 'text-lg bg-blue-500 px-5 py-2 w-full rounded-lg'
                                        : 'text-lg px-5 py-2 hover:text-gray-400'
                                }`}
                            >
                                Orders
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                to="/dashboard/products"
                                onClick={() => handleSidebar('products')}
                                className={`${
                                    pathname === "/dashboard/products"
                                        ? 'text-lg bg-blue-500 px-5 py-2 w-full rounded-lg'
                                        : 'text-lg px-5 py-2 hover:text-gray-400'
                                }`}
                            >
                                Product
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                to="/dashboard/post-product"
                                onClick={() => handleSidebar('products')}
                                className={`${
                                    pathname === "/dashboard/post-product"
                                        ? 'text-lg bg-blue-500 px-5 py-2 w-full rounded-lg'
                                        : 'text-lg px-5 py-2 hover:text-gray-400'
                                }`}
                            >
                              Post Product
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                to="/dashboard/inventory"
                                // onClick={() => handleSidebar('inventory')}
                                className={`${
                                    pathname === "/dashboard/inventory"
                                        ? 'text-lg bg-blue-500 px-5 py-2 w-full rounded-lg'
                                        : 'text-lg px-5 py-2 hover:text-gray-400'
                                }`}
                            >
                                Inventory
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                to="/dashboard/product-variant"
                                // onClick={() => handleSidebar('product-variant')}
                                className={`${
                                    pathname === "/dashboard/product-variant"
                                        ? 'text-lg bg-blue-500 px-5 py-2 w-full rounded-lg'
                                        : 'text-lg px-5 py-2 hover:text-gray-400'
                                }`}
                            >
                              Product Variant
                            </Link>
                        </li>
                         
                        <li className="mb-4  text-rose-500">
                            <button   
                            onClick={()=>{
                                removeToken()
                                router("/")
                            }}
                            >
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebar;
