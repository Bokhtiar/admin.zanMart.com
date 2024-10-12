import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { Link } from "react-router-dom";
import { Toastify } from "../../components/toastify"; 
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
const Banner = () => {
  const [loading, setLoading] = useState(false);
  const [bannerData, setbannerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  // fetch banner data
  const fetchData = useCallback(
    async (banner) => {
      try {
        setLoading(true);
        const response = await NetworkServices.Banner.index(currentPage);
        console.log(response);
        if (response?.status === 200 || response?.status === 201) {
          setbannerData(response?.data?.data);
          setCurrentPage(response?.data?.current_page);
          setLastPage(response?.data?.last_page);
          setNextPageUrl(response?.data?.next_page_url);
          setPrevPageUrl(response?.data?.prev_page_url);
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
  }, [ ]);

  // delete data
  const destroy = async (id) => {
    try {
      const response = await NetworkServices.Banner.destroy(id); 
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
      name: "Banner ID",
      cell: (row) => row?.banner_id,
    },

    {
      name: "Title",
      cell: (row) => row?.name,
    },
    {
      name: "Banner Image",
      cell: (row) => (
        <div> 
          <img
            className="w-40 h-20 border rounded-lg"
            src={`${process.env.REACT_APP_BASE_API}${row?.image}`}
            alt="loading"
          />
        </div>
      ),
    },
     

    {
      name: "Banner Way Product",
      cell: (row) => (
        <div className="flex gap-1">
          <Link to={`/dashboard/banner/featured/${row?.banner_id}`}>
            <span className="bg-green-500 text-white btn btn-sm  ">
             Add  
            </span>
          </Link>

          <span>
          <Link to={`/dashboard/banner/banner-product/${row?.banner_id}`}>
            <span className="bg-green-500 text-white btn btn-sm  ">
             show
            </span>
          </Link>
          </span>
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-1">
          <Link to={`/dashboard/banner/edit/${row?.banner_id}`}>
            <span className="bg-green-500 text-white btn btn-sm material-symbols-outlined">
              edit
            </span>
          </Link>

          <span>
            <span
              className="bg-red-500 text-white btn btn-sm material-symbols-outlined"
              onClick={() => destroy(row?.banner_id)}
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
      <div className="flex justify-between shadow-md p-2 my-5 rounded-md">
        <h2 className=" font-semibold text-xl">Banner List</h2>
        <Link to="/dashboard/banner/create">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            add
          </span>
        </Link>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} data={bannerData}   />
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

export default Banner;
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
