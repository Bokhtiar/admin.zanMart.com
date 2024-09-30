// import { Link } from "react-router-dom";
// import { NetworkServices } from "../../network";
// import DataTable from "react-data-table-component";
// import { Toastify } from "../../components/toastify";
// import { useCallback, useEffect, useState } from "react";
// import { networkErrorHandeller } from "../../utils/helper";

// export const CategoryList = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [totalRows, setTotalRows] = useState(0);
//     const [perPage, setPerPage] = useState(10);
//     const [page, setPage] = useState(1)

//     const columns = [
//         {
//             name: 'Category Name',
//             selector: row => row.name,
//             sortable: true,
//         },
//         {
//             name: "Action",
//             cell: (row) => (
//                 <div className="flex gap-1">
//                     {/* <Link to={`/dashboard/category/edit/${row.id}`}>
//                         <span className="bg-green-500 text-white btn btn-sm material-symbols-outlined">
//                             edit
//                         </span>
//                     </Link> */}

//                     <span onClick={() => destroy(row.id)}>
//                         <span className="bg-red-500 text-white btn btn-sm material-symbols-outlined">
//                             delete
//                         </span>
//                     </span>
//                 </div>
//             ),
//         },
//     ];

//     /* Fetch data */
//     const fetchData = useCallback(
//         async (page) => {
//             try {
//                 setPage(page)
//                 setLoading(true);
//                 const response = await NetworkServices.Category.index(
//                     page,
//                     perPage,
//                 );

//                 if (response && response.status === 200) {
//                     setData(response?.data?.results);
//                     setTotalRows(response?.data?.count);
//                 }
//                 setLoading(false);
//             } catch (error) {
//                 if (error) {
//                     setLoading(false);
//                     networkErrorHandeller(error);
//                 }
//             }
//         },
//         [perPage]
//     );

//     useEffect(() => {
//         fetchData(page);
//     }, [page]);

//     /* handle paginate page change */
//     const handlePageChange = (page) => fetchData(page);

//     /* handle paginate row change */
//     const handlePerRowsChange = async (newPerPage, page) => {
//         setPage(page)
//         setLoading(true);
//         const response = await NetworkServices.Category.index(
//             page,
//             newPerPage,
//         );
//         setData(response.data.results);
//         setPerPage(newPerPage);
//         setLoading(false);
//     };

//     /* destory */
//     const destroy = async (id) => {
//         try {
//             const response = await NetworkServices.Category.destroy(id)
//             if (response.status === 204) {
//                 fetchData(page)
//                 return Toastify.Info("Category Deleted")
//             }
//         } catch (error) {
//             networkErrorHandeller(error)
//         }
//     }

//     return <section>
//         <div className="flex justify-between shadow-md p-4 px-6 rounded-md">
//             <h2 className=" font-semibold text-xl">Category List</h2>
//             <Link to="/dashboard/category/create">
//                 <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
//                     add
//                 </span>
//             </Link>
//         </div>
//         <DataTable
//             columns={columns}
//             data={data}
//             progressPending={loading}
//             pagination
//             paginationServer
//             paginationTotalRows={totalRows}
//             onChangeRowsPerPage={handlePerRowsChange}
//             onChangePage={handlePageChange}
//         />
//     </section>
// }
import React, { useState } from 'react';
import axios from 'axios';
import { privateRequest } from '../../config/axios.config';

const Category = () => { 
    const [parentId, setParentId] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [isUnit, setIsUnit] = useState([2]);
    const [isColor, setIsColor] = useState(0);
    const [categoryName, setCategoryName] = useState('');

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);  // Store the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // formData.append('slug', slug);
        formData.append('parent_id', Number( parentId));
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }
        formData.append('is_unit', [Number(isUnit)] );
        formData.append('is_color', Number(isColor));
        formData.append('category_name', categoryName); // Append category name

        try {
            const response = await privateRequest.post('admin/category', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error creating product:', error?.response);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Create Product</h2>
            
             
            <div className="mb-4">
                <label className="block text-gray-600 mb-1">Parent ID:</label>
                <input
                    type="number"
                    // value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-600 mb-1">Category Name:</label>
                <input
                    type="text"
                    // value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-600 mb-1">Thumbnail:</label>
                <input
                    type="file"
                    onChange={handleThumbnailChange}
                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-600 mb-1">Is Unit (0 or 1):</label>
                <input
                    type="number"
                    // value={isUnit}
                    onChange={(e) => setIsUnit(Number(e.target.value))}
                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                
                  
                    required
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-600 mb-1">Is Color (0 or 1):</label>
                <input
                    type="number"
                    // value={isColor}
                    onChange={(e) => setIsColor(Number(e.target.value))}
                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                   
                  
                    required
                />
            </div>
            
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
                Submit
            </button>
        </form>
    );
};

export default Category;
