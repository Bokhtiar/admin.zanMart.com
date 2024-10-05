import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { addedApi, deleteApi, fetchApi, updatedApi } from "../utils/variantApi";
import { formatDate } from "../../../utils/formatedate";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import VariantModal from "../Components/VariantModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { SkeletonTable } from "../../../components/loading/skeleton-table";
const Brand = () => {
  const [addedToggle, setAddedToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [brandValue, setbrandValue] = useState([]); 
  const [brandText, setbrandText] = useState("");
  const [addbrandValue, setAddbrandValue] = useState({});
  const [updatebrandValue, setUpdateValue] = useState({});
  const [idx, setIdx] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  // brand fetch api call here
  useEffect(() => {
    setLoading(true);
    fetchApi(`admin/brand?page=${currentPage}`).then((res) => {
      console.log(res);
      setbrandValue(res?.data?.data?.data);
      if (res?.data?.success) {
        setLoading(false);
        setCurrentPage(res?.data?.data?.current_page);
        setLastPage(res?.data?.data?.last_page);
        setNextPageUrl(res?.data?.data?.next_page_url);
        setPrevPageUrl(res?.data?.data?.prev_page_url);
      }
    });
  }, [currentPage]);
  //  add  brand
  const handleAddedbrand = (e) => {
    e.preventDefault();
    addedApi(`admin/brand`, addbrandValue).then((res) => {
      if (res?.data?.success) {
        fetchApi("admin/brand").then((res) => {
          setbrandValue(res?.data?.data?.data);
        });
      }
    });
  };
  //  update brand
  const handleuUpdatebrand = (e) => {
    e.preventDefault();
    updatedApi(`admin/brand/${idx}`, updatebrandValue).then((res) => {
      if (res?.data?.success) {
        fetchApi("admin/brand").then((res) => {
          setbrandValue(res?.data?.data?.data);
        });
      }
    });
  };
  //   delete brand
  const handleDelete = async (id) => {
    deleteApi(`admin/brand/${id}`).then((res) => {
      if (res?.data?.success) {
        fetchApi("admin/brand").then((res) => {
          setbrandValue(res?.data?.data?.data);
        });
      }
    });
  };
  const columns = [
    {
      name: "brand ID",
      selector: (row) => row?.brand_id,
    },
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Status",
      selector: (row) => row?.status,
    },
    {
      name: "Created Date",
      selector: (row) => formatDate(row?.created_at).formate_date,
    },
    {
      name: "Update Date",
      selector: (row) => formatDate(row?.updated_at).formate_date,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <button
            onClick={() => {
              // handleuUpdatebrand()
              setIdx(row?.brand_id);
              setUpdateToggle(true);
            }}
          >
            <FaRegEdit />
          </button>
          <button
            className=" text-red-700 px-4 py-2 rounded"
            onClick={() => handleDelete(row?.brand_id)}
          >
            <RiDeleteBin6Line />
          </button>
        </>
      ),
    },
  ];
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
  return (
   <>
     {
        loading ? <SkeletonTable/>: <div>
        {addedToggle && (
          <VariantModal setOpen={setAddedToggle}>
            <BrandForm
              addedbrandValue={setAddbrandValue}
              handleAdded={handleAddedbrand}
            />
          </VariantModal>
        )}
        {updateToggle && (
          <VariantModal setOpen={setUpdateToggle}>
            <BrandForm
              brand={brandValue?.find((item) => item.brand_id === idx)}
              addedbrandValue={setUpdateValue}
              handleAdded={handleuUpdatebrand}
            />
          </VariantModal>
        )}
        <div className="  flex justify-end items-center py-2 px-3 gap-2   ">
          <input
            type="search"
            className="  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search brand Name"
            onChange={(e) => setbrandText(e.target.value)}
          />
          <button
            className="bg-blue-700 py-2 rounded-lg px-2 text-white font-bold"
            onClick={() => setAddedToggle(true)}
          >
            Add brand
          </button>
        </div>
        <DataTable
          // pagination
          columns={columns}
          data={brandValue?.filter((item) => item?.name?.includes(brandText))}
        />
        {/* pagination code here  */}
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
      </div>
     }
   </>
  );
};

export default Brand;
const BrandForm = ({ brand = {}, handleAdded, addedbrandValue }) => {
  console.log("brand", brand);
  return (
    <form onSubmit={handleAdded} className="space-y-4">
      <div>
        <label
          htmlFor="brand"
          className="block text-gray-700 font-semibold mb-2"
        >
          brand Name
        </label>
        <input
          type="text"
          id="brand"
          name="name"
          defaultValue={brand?.name}
          placeholder="Enter your brand name"
          onChange={(e) => {
            addedbrandValue({
              name: e.target.value,
            });
          }}
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
  );
};
