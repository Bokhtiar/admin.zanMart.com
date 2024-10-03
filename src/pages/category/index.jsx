<<<<<<< HEAD
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { Link } from "react-router-dom";
import { Toastify } from "../../components/toastify";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
const Category = () => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem("currentPage")
      ? Number(sessionStorage?.getItem("currentPage"))
      : 1
  );
  const [lastPage, setLastPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  // fetch category data
  const fetchData = useCallback(
    async (category) => {
      try {
        setLoading(true);
        const response = await NetworkServices.Category.index(currentPage);
        if (response?.status === 200 || response?.status === 201) {
          setCategoryData(response?.data?.data?.data);
          setCurrentPage(response?.data?.data?.current_page);
          setLastPage(response?.data?.data?.last_page);
          setNextPageUrl(response?.data?.data?.next_page_url);
          setPrevPageUrl(response?.data?.data?.prev_page_url);
          setLoading(false);
        }
      } catch (error) {
        if (error) {
          setLoading(false);
          networkErrorHandeller(error);
        }
      }
    },
    [currentPage]
  );
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // delete data
  const destroy = async (id) => {
    try {
      const response = await NetworkServices.Category.destroy(id);
      if (response.status === 200 || response?.status === 201) {
        fetchData();
        return Toastify.Info("Category Deleted");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  const columns = [
    {
      name: "Category ID",
      cell: (row) => row?.category_id,
    },

    {
      name: "Category Name",
      cell: (row) => row?.category_name,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-1">
          <Link to={`/dashboard/category/edit/${row?.category_id}`}>
            <span className="bg-green-500 text-white btn btn-sm material-symbols-outlined">
              edit
            </span>
          </Link>

          <span>
            <span
              className="bg-red-500 text-white btn btn-sm material-symbols-outlined"
              onClick={() => destroy(row?.category_id)}
            >
              delete
            </span>
          </span>
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="flex justify-between shadow-md p-4 px-6 rounded-md">
        <h2 className=" font-semibold text-xl">Category List</h2>
        <Link to="/dashboard/category/create">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            add
          </span>
        </Link>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} data={categoryData} />
          <Pagination
            nextPageUrl={nextPageUrl}
            setCurrentPage={setCurrentPage}
            prevPageUrl={prevPageUrl}
            lastPage={lastPage}
            currentPage={currentPage}
          />
        </>
      )}
    </section>
  );
};

export default Category;
const Pagination = ({
  nextPageUrl,
  setCurrentPage,
  prevPageUrl,
  lastPage,
  currentPage,
}) => {
  const handleNext = () => {
    if (nextPageUrl) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (prevPageUrl) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  // pagination store
  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);
  return (
    <>
      <div className="flex justify-end items-center gap-2 my-3">
        <button
          onClick={() => {
            setCurrentPage(1);
          }}
          disabled={!prevPageUrl}
          className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
            !prevPageUrl
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          onClick={handlePrev}
          disabled={!prevPageUrl}
          className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
            !prevPageUrl
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <IoIosArrowBack />
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {lastPage}
        </span>
        <button
          onClick={handleNext}
          disabled={!nextPageUrl}
          className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
            !nextPageUrl
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <IoIosArrowForward />
        </button>
        <button
          onClick={() => {
            setCurrentPage(lastPage);
          }}
          disabled={!nextPageUrl}
          className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
            !nextPageUrl
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    </>
  );
};
=======
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
>>>>>>> 37ca9fd7d76798b75fa67e15ff9ace5e0739ed1a
