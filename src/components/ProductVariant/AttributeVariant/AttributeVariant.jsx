import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../../utils/formatedate";

const AttributeVariant = ({ open,attribute, handleAdded, setOpen, setValueAdded, valueAdded, handleDelete }) => {
    const handleChange = (e) => {
        setValueAdded({
            ...valueAdded,
            [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
        });
    };
console.group(attribute)

    return (
        <div>
            {open && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                    {/* Modal content */}
                    <div className="bg-white p-6 rounded-lg shadow-lg sm:w-78 md:w-[500px] overflow-y-auto max-h-full relative z-20">
                        <form onSubmit={handleAdded} className="max-w-md mx-auto rounded-lg p-8">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Product Details</h2>

                            <div className="mb-4">
                                <label htmlFor="unit_Id" className="block text-gray-700 font-semibold mb-2">
                                    Unit ID
                                </label>
                                <input
                                    type="number"
                                    id="unitId"
                                    name="unit_id"
                                    placeholder="Enter your unit id"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="size" className="block text-gray-700 font-semibold mb-2">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    id="size"
                                    name="name"
                                    placeholder="Enter your size"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Modal overlay for closing */}
                    <div
                        className="absolute inset-0 bg-black opacity-50 z-10"
                        onClick={() => setOpen(false)} // Close modal on click
                    ></div>
                </div>
            )}

            {/* Displaying the color variant table */}
            {attribute?.length > 0 ? (
                <table className="min-w-full bg-white mt-4">
                    <thead>
                        <tr>
                            <th className="py-2 text-center px-4 border-b-4 border-gray-200">Color ID</th>
                            <th className="py-2 text-center px-4 border-b-4 border-gray-200">Name</th>
                            <th className="py-2 text-center px-4 border-b-4 border-gray-200">Status</th>
                            <th className="py-2 text-center px-4 border-b-4 border-gray-200">Created Date</th>
                            <th className="py-2 text-center px-4 border-b-4 border-gray-200">Update Date</th>
                            <th className="py-2 text-center px-4 border-b-4 border-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attribute.map((color) => (
                            <tr key={color?.color_id} className="border-b-2">
                                <td className="py-2 text-center px-4">{color?.color_id}</td>
                                <td className="py-2 text-center px-4">{color?.name}</td>
                                <td className="py-2 text-center px-4">{color?.status}</td>
                                <td className="py-2 text-center px-4">{formatDate(color?.created_at)?.formate_date}</td>
                                <td className="py-2 text-center px-4">{formatDate(color?.updated_at)?.formate_date}</td>
                                <td className="py-2 text-center px-4 space-x-4">
                                    <button
                                        className="text-red-700 px-4 py-2 rounded"
                                        onClick={() => handleDelete(color?.color_id)}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default AttributeVariant;
