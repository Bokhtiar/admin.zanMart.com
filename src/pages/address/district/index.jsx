import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import { NetworkServices } from "../../network";
// import { networkErrorHandeller } from "../../utils/helper";
// import { SkeletonTable } from "../../components/loading/skeleton-table";
import { Link } from "react-router-dom";
// import { Toastify } from "../../components/toastify";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaRegEdit,
} from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helper";
import { Toastify } from "../../../components/toastify";
import { SkeletonTable } from "../../../components/loading/skeleton-table";
// import { useDeleteModal } from "../../context/DeleteModalContext";
const District = () => {
  //   const { openModal } = useDeleteModal();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [lastPage, setLastPage] = useState(1);
  // const [nextPageUrl, setNextPageUrl] = useState(null);
  // const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  console.log("totalRows",totalRows)
  console.log("currentPage",currentPage)

  // fetch banner data
  const fetchData = useCallback(
    async (banner) => {
      try {
        setLoading(true);
        const response = await NetworkServices.District.index(currentPage,perPage);
        if (response?.status === 200 || response?.status === 201) {
          setData(response?.data?.data?.data);
          // setCurrentPage(response?.data?.data?.current_page);
          // setLastPage(response?.data?.data?.last_page);
          // setNextPageUrl(response?.data?.data?.next_page_url);
          // setPrevPageUrl(response?.data?.data?.prev_page_url);
          setLoading(false);
          setTotalRows(response?.data?.data?.total || 0);
        }
      } catch (error) {
        if (error) {
          setLoading(false);
          networkErrorHandeller(error);
        }
      }
    },
    [currentPage,currentPage,perPage]
  );
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page) => {
    if (!loading) {
      setCurrentPage(page);
    }
  };
  const handleRowsPerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };
  // delete data
  const destroy = async (id) => {
    try {
      const response = await NetworkServices.District.destroy(id);
      if (response.status === 200 || response?.status === 201) {
        fetchData();
        return Toastify.Info(response?.data?.message);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  const columns = [
    {
      name: "Division Name",
      cell: (row) => row?.name,
    },
    {
      name: "Division Bangla Name",
      cell: (row) => row?.bn_name,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-1">
          <Link to={`/dashboard/district/edit/${row?.id}`}>
            <span className="bg-primary text-white btn btn-sm  ">Edit</span>
          </Link>

          <span>
            <span
              className="bg-primary text-white btn btn-sm"
              onClick={() => destroy(row?.id)}
            >
              Delete
            </span>
          </span>
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="flex justify-between shadow-md p-2 my-5 rounded-md">
        <h2 className=" font-semibold text-xl">District List</h2>
        <Link
          to="/dashboard/district/create"
          className="flex hover:bg-primary hover:text-white items-center gap-2 border-primary border text-primary  py-1 px-2  rounded-lg"
        >
          Add New <span className="  material-symbols-outlined p-1">add</span>
        </Link>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={data}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationPerPage={perPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            paginationDefaultPage={currentPage}
          />
          {/* <Pagination
            nextPageUrl={nextPageUrl}
            setCurrentPage={setCurrentPage}
            prevPageUrl={prevPageUrl}
            lastPage={lastPage}
            currentPage={currentPage}
          /> */}
        </>
      )}
    </section>
  );
};

export default District;

// const Pagination = ({
//   nextPageUrl,
//   setCurrentPage,
//   prevPageUrl,
//   lastPage,
//   currentPage,
// }) => {
//   const handleNext = () => {
//     if (nextPageUrl) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (prevPageUrl) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };
//   // pagination store
//   useEffect(() => {
//     sessionStorage.setItem("currentPage", currentPage);
//   }, [currentPage]);
//   return (
//     <>
//       <div className="flex justify-end items-center gap-2 my-3">
//         <button
//           onClick={() => {
//             setCurrentPage(1);
//           }}
//           disabled={!prevPageUrl}
//           className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
//             !prevPageUrl
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           <FaAngleDoubleLeft />
//         </button>
//         <button
//           onClick={handlePrev}
//           disabled={!prevPageUrl}
//           className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
//             !prevPageUrl
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           <IoIosArrowBack />
//         </button>
//         <span className="text-gray-700">
//           Page {currentPage} of {lastPage}
//         </span>
//         <button
//           onClick={handleNext}
//           disabled={!nextPageUrl}
//           className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
//             !nextPageUrl
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           <IoIosArrowForward />
//         </button>
//         <button
//           onClick={() => {
//             setCurrentPage(lastPage);
//           }}
//           disabled={!nextPageUrl}
//           className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
//             !nextPageUrl
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           <FaAngleDoubleRight />
//         </button>
//       </div>
//     </>
//   );
// };
