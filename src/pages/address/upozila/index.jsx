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
const Upozila = () => {
  //   const { openModal } = useDeleteModal();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  // fetch banner data
  const fetchData = useCallback(
    async (banner) => {
      try {
        setLoading(true);
        const response = await NetworkServices.upazila.index(
          currentPage,
          perPage
        );
        if (response?.status === 200 || response?.status === 201) {
          setData(response?.data?.data?.data);
          setTotalRows(response?.data?.data?.total || 0);
          setLoading(false);
        }
      } catch (error) {
        if (error) {
          setLoading(false);
          networkErrorHandeller(error);
        }
      }
    },
    [currentPage, currentPage, perPage]
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
      const response = await NetworkServices.upazila.destroy(id);
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
          <Link to={`/dashboard/upozila/edit/${row?.id}`}>
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
        <h2 className=" font-semibold text-xl">Upazila List</h2>
        <Link
          to="/dashboard/upozila/create"
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
        </>
      )}
    </section>
  );
};

export default Upozila;
