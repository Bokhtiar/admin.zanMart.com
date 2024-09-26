import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
 
import {removeToken} from "../../utils/helper";
const DashboardSidebar = () => {
    const [active, setActive] = useState('dashboard');
    const [isOpen, setIsOpen] = useState(true);
 const router = useNavigate();
    const handleSidebar = (sidebar) => {
        setActive(sidebar);
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
                                onClick={() => handleSidebar('dashboard')}
                                className={`${
                                    active === 'dashboard'
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
                                onClick={() => handleSidebar('orders')}
                                className={`${
                                    active === 'orders'
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
                                    active === 'products'
                                        ? 'text-lg bg-blue-500 px-5 py-2 w-full rounded-lg'
                                        : 'text-lg px-5 py-2 hover:text-gray-400'
                                }`}
                            >
                                Product
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                to="/dashboard/inventory"
                                onClick={() => handleSidebar('inventory')}
                                className={`${
                                    active === 'inventory'
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
                                onClick={() => handleSidebar('product-variant')}
                                className={`${
                                    active === 'product-variant'
                                        ? 'text-lg bg-blue-500 px-5 py-2 w-full rounded-lg'
                                        : 'text-lg px-5 py-2 hover:text-gray-400'
                                }`}
                            >
                              Product Variant
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                to="/dashboard/customers"
                                onClick={() => handleSidebar('customers')}
                                className={`${
                                    active === 'customers'
                                        ? 'text-lg bg-blue-500 px-5 py-2 w-full rounded-lg'
                                        : 'text-lg px-5 py-2 hover:text-gray-400'
                                }`}
                            >
                                Customers
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
