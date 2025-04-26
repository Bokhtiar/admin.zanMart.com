import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { Link, useNavigate } from "react-router-dom";
import { Toastify } from "../../components/toastify";
import { FiSend } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteModal } from "../../context/DeleteModalContext";
const Product = () => {
  const { openModal } = useDeleteModal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  // fetch product data
  const fetchData = useCallback(
    async (product) => {
      try {
        setLoading(true);
        const response = await NetworkServices.Product.index(currentPage, 10);

        if (response?.status === 200 || response?.status === 201) {
          setProductData(response?.data?.data?.data);
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
      const response = await NetworkServices.Product.destroy(id);
      if (response.status === 200 || response?.status === 201) {
        fetchData();
        return Toastify.Info("product Deleted");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  // update best selling product
  const [bestProductId, setBestProductId] = useState([]);
  const updateBestSellingProduct = async () => {
    try {
      const response = await NetworkServices.Product.bestSellingProduct(
        bestProductId
      );
      if (response.status === 200 || response?.status === 201) {
        navigate("/dashboard/product/best-selling");
        return Toastify.Info("Best Selling Product Added");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  // selected row id find
  const handleSelectedRowsChange = async (state) => {
    // Extract only the category_id from selected rows
    const ids = state.selectedRows.map((row) => row?.product_id);
    setBestProductId(ids);
  };

  const columns = [
    {
      name: "Product ID",
      cell: (row) => row?.product_id,
    },
    {
      name: "Image",
      cell: (row) => (
        <div>
          <img
            className="w-20 h-20 border rounded-full"
            src={`${process.env.REACT_APP_BASE_API}${row?.thumbnail_image}`}
            alt="loading"
          />
        </div>
      ),
    },

    {
      name: "Product Name",
      cell: (row) => row?.title,
    },

    {
      name: " Sale Price",
      cell: (row) => row?.sell_price,
    },
    {
      name: " Flat Discount",
      cell: (row) => row?.flat_discount,
    },
    {
      name: "Buy Price",
      cell: (row) => row?.buy_price,
    },
    {
      name: "In Stock",
      cell: (row) => row?.stock_qty,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-3">
          <Link to={`/dashboard/product/edit/${row?.product_id}`}>
            <span className="">
              <FaRegEdit />
            </span>
          </Link>

          <span>
            <span
              className="text-red-700  cursor-pointer"
              onClick={() =>
                openModal(
                  () => destroy(row?.product_id),
                  <span>
                    Are you sure you want to delete{" "}
                    <span className="bg-blue-500 text-white font-semibold px-2 py-1 rounded">
                      {row?.title}
                    </span>
                    item?
                  </span>
                )
              }
            >
              <RiDeleteBin6Line />
            </span>
          </span>
          <Link to={`/dashboard/product-variant/create/${row?.product_id}`}>
            <span className="">
              <FiSend />
            </span>
          </Link>
        </div>
      ),
    },
  ];
  const handleData = async (id) => {
    try {
      const response = await NetworkServices.Product.show(id);
      return <div>welcobaco</div>;
    } catch (error) {}
  };

  return (
    <section>
      <div className="flex justify-between shadow-md p-4 px-6 rounded-md">
        <h2 className=" font-semibold text-xl">Product List</h2>
        <div className="flex gap-4">
          {bestProductId?.length ? (
            <button
              onClick={() => updateBestSellingProduct()}
              className="flex hover:bg-primary hover:text-white items-center gap-2 border-primary border text-primary  py-1 px-2  rounded-lg"
            >
              Add Best Selling{" "}
            </button>
          ) : (
            ""
          )}
          <Link
            to="/dashboard/product/create"
            className="flex hover:bg-primary hover:text-white items-center gap-2 border-primary border text-primary  py-1 px-2  rounded-lg"
          >
            Add New <span className="  material-symbols-outlined p-1">add</span>
          </Link>
        </div>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable
            pagination
            columns={columns}
            data={productData}
            selectableRows
            onSelectedRowsChange={handleSelectedRowsChange}
            expandableRows
            expandableRowsComponent={({ data }) => (
              <div >
                {console.log(data)}
                {data?.product_variants.map((item, index) => (
                  <div key={index} className="flex justify-around bg-blue-100 text-black py-2">
                    <span>price: {item?.price}</span>
                    <span>color: {item?.color?.name}</span>
                    <span>unit: {item?.unit?.name}</span>
                    <span>attribute: {item?.attribute?.name}</span>
                    <span>available_quantity: {item?.available_quantity}</span>
                    <span>discount price: {item?.discount_price}</span>
                  </div>
                ))}
              </div>
            )}
          />
        </>
      )}
    </section>
  );
};

export default Product;
