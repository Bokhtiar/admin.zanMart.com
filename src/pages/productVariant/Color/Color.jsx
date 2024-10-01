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
const Color = () => {
  const [addedToggle, setAddedToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [colorValue, setColorValue] = useState([]);
  const [colorText, setColorText] = useState("");
  const [addColorValue, setAddColorValue] = useState({});
  const [updateColorValue, setUpdateValue] = useState({});
  const [idx, setIdx] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  // color fetch api call here
  useEffect(() => {
    setLoading(true);
    fetchApi(`admin/color?page=${currentPage}`).then((res) => {
      console.log(res);
      setColorValue(res?.data?.data?.data);
      if (res?.data?.success) {
        setLoading(false);
        setCurrentPage(res?.data?.data?.current_page);
        setLastPage(res?.data?.data?.last_page);
        setNextPageUrl(res?.data?.data?.next_page_url);
        setPrevPageUrl(res?.data?.data?.prev_page_url);
      }
    });
  }, [currentPage]);
  //  add  color
  const handleAddedColor = (e) => {
    e.preventDefault();
    addedApi(`admin/color`, addColorValue).then((res) => {
      if (res?.data?.success) {
        fetchApi("admin/color").then((res) => {
          setColorValue(res?.data?.data?.data);
        });
      }
    });
  };
  //  update color
  const handleuUpdateColor = (e) => {
    e.preventDefault();
    updatedApi(`admin/color/${idx}`, updateColorValue).then((res) => {
      if (res?.data?.success) {
        fetchApi("admin/color").then((res) => {
          setColorValue(res?.data?.data?.data);
        });
      }
    });
  };
  //   delete color
  const handleDelete = async (id) => {
    deleteApi(`admin/color/${id}`).then((res) => {
      if (res?.data?.success) {
        fetchApi("admin/color").then((res) => {
          setColorValue(res?.data?.data?.data);
        });
      }
    });
  };
  const columns = [
    {
      name: "Color ID",
      selector: (row) => row?.color_id,
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
              // handleuUpdateColor()
              setIdx(row?.color_id);
              setUpdateToggle(true);
            }}
          >
            <FaRegEdit />
          </button>
          <button
            className=" text-red-700 px-4 py-2 rounded"
            onClick={() => handleDelete(row?.color_id)}
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
            <ColorForm
              addedColorValue={setAddColorValue}
              handleAdded={handleAddedColor}
            />
          </VariantModal>
        )}
        {updateToggle && (
          <VariantModal setOpen={setUpdateToggle}>
            <ColorForm
              color={colorValue?.find((item) => item.color_id === idx)}
              addedColorValue={setUpdateValue}
              handleAdded={handleuUpdateColor}
            />
          </VariantModal>
        )}
        <div className="  flex justify-end items-center py-2 px-3 gap-2   ">
          <input
            type="search"
            className="  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search Color Name"
            onChange={(e) => setColorText(e.target.value)}
          />
          <button
            className="bg-blue-700 py-2 rounded-lg px-2 text-white font-bold"
            onClick={() => setAddedToggle(true)}
          >
            Add Color
          </button>
        </div>
        <DataTable
          // pagination
          columns={columns}
          data={colorValue?.filter((item) => item?.name?.includes(colorText))}
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

export default Color;
const ColorForm = ({ color = {}, handleAdded, addedColorValue }) => {
  console.log("color", color);
  return (
    <form onSubmit={handleAdded} className="space-y-4">
      <div>
        <label
          htmlFor="color"
          className="block text-gray-700 font-semibold mb-2"
        >
          Color Name
        </label>
        <input
          type="text"
          id="color"
          name="name"
          defaultValue={color?.name}
          placeholder="Enter your color name"
          onChange={(e) => {
            addedColorValue({
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
