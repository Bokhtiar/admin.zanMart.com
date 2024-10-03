import React, { useEffect, useState } from "react";

import { privateRequest } from "../../config/axios.config";
import { Toastify } from "../../components/toastify";
import { FaPlus, FaRegEdit } from "react-icons/fa";

import { RiDeleteBin6Line } from "react-icons/ri";

import { formatDate } from "../../utils/formatedate";
import VariantModal from "../../components/ProductVariant/VariantModal/VariantModal";
import { Link } from "react-router-dom";
const Banner = () => {
  const [bannerValue, setBannerValue] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const [open, setOpen] = useState({
    add: false,
    update: false,
  });
  const [id, setId] = useState(null);
  const fetchBanner = async () => {
    try {
      const res = await privateRequest.get(`admin/banner`);
      console.log(res?.data?.data, "res-------->");
      if (res?.status === 200 || res?.status === 201) {
        setBannerValue(res?.data?.data);
      }
    } catch (err) {
      Toastify.Error(err.message);
    }
  };
  // fetch all variant route
  useEffect(() => {
    fetchBanner();
  }, []);
  // added attribute
  const handleAdded = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", image); // Append the file (if updated)
    formData.append("name", name);
    try {
      const response = await privateRequest.post(`admin/banner`, formData);
      if (response.status === 200 || response.status === 201) {
        fetchBanner();
        Toastify.Success(response?.data?.message);
      } else {
        Toastify.Error("banner not posted or update");
      }
    } catch (error) {
      Toastify.Error(error.message);
    }
  };
  // update attribute
  const handleUpdateAttribute = async (e) => {
    e.preventDefault();
    console.log(name, "----------->");
    const formData = new FormData();

    formData.append("image", image);

    // Append the file (if updated)
    formData.append("name", name);
    console.log(formData.get("name"));

    try {
      const response = await privateRequest.put(
        `admin/banner/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response, "sdfsdfsdf");
      // Handle response
      if (response.status === 200 || response.status === 201) {
        // update value
        fetchBanner();
        Toastify.Success(response?.data?.message);
      } else {
        Toastify.Error("banner not posted or update");
      }
    } catch (error) {
      console.log(error);
      Toastify.Error(error.message);
    }
  };
  // delete specific item
  const handleDelete = async (id) => {
    try {
      const response = await privateRequest.delete(`admin/banner/${id}`);
      if (response?.status === 200 || response?.status === 201) {
        fetchBanner();
        Toastify.Success(response?.data?.message);
      }
    } catch (error) {
      Toastify.Error(error.message);
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value); // Store the entered name
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };
  const [modalOpen,setModalOpen]=useState(false);
  return (
    <div>
      {open?.add && (
        <VariantModal setOpen={setOpen}>
          {/* update form declare here  */}
          <BannerForm
            // banner={bannerValue.find((item)=>item?.banner_id===id)}
            handleSubmit={handleAdded}
            handleImageChange={handleImageChange}
            handleNameChange={handleNameChange}
          />
         
        </VariantModal>
      )}
   {
    modalOpen &&  <div className="fixed py-10 inset-0 flex max-h-screen items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg sm:w-78 md:w-[500px] overflow-y-auto max-h-full z-10">
    <BannerProductForm />
    </div>
    <div
      className="absolute bg-black opacity-5 w-full top-0 left-0 h-full z-5"
      onClick={() => setModalOpen(false)}
    ></div>
  </div> 
   }
      <div className="shadow-lg py-5 flex justify-between gap-2 px-2">
        <div>
          <span className="text-xl font-bold">Banner</span>
        </div>
        <button
          onClick={() =>
            setModalOpen(true)
          }
        >
          Banner way
        </button>
        <button
          onClick={() =>
            setOpen({
              add: true,
              update: false,
            })
          }
        >
          <FaPlus />
        </button>
        
      </div>
      <div className="shadow-lg py-5 flex justify-between gap-2 mt-3 ">
        <div className="flex  gap-2 w-full">
          {bannerValue?.length > 0 ? (
            <table className="min-w-full  w-full">
              <thead>
                <tr>
                  <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                    Banner ID
                  </th>
                  <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                    Image
                  </th>
                  <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                    Name
                  </th>

                  <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                    Created Date
                  </th>
                  <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                    Update Date
                  </th>
                  <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bannerValue.map((banner, index) => (
                  <tr key={banner?.banner_id} className="border-b-2">
                    <td className="py-2 text-center px-4">
                      {banner?.banner_id}
                    </td>
                    <td className="py-2 text-center px-4">
                      <img
                        src={`${process.env.REACT_APP_BASE_API}${banner?.image}`}
                        className="h-16 w-16"
                        alt="loading"
                      />
                    </td>
                    <td className="py-2 text-center px-4">{banner?.name}</td>

                    <td className="py-2 text-center px-4">
                      {formatDate(banner?.created_at)?.formate_date}{" "}
                    </td>
                    <td className="py-2 text-center px-4">
                      {" "}
                      {formatDate(banner?.updated_at)?.formate_date}{" "}
                    </td>
                    <td className="py-2 text-center px-4 h-full space-x-4">
                      <button
                        onClick={() => {
                          setOpen({
                            add: false,
                            update: true,
                          });
                          setId(banner?.banner_id);
                        }}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className=" text-red-700 px-4 py-2 rounded"
                        onClick={() => handleDelete(banner?.banner_id)}
                      >
                        <RiDeleteBin6Line />
                      </button>
                      <Link to={`/dashboard/banner/${banner?.banner_id}`}>Detail</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
      {open?.update && (
        <VariantModal setOpen={setOpen}>
          {/* update form declare here  */}
          <BannerForm
            banner={bannerValue.find((item) => item?.banner_id === id)}
            handleSubmit={handleUpdateAttribute}
            handleImageChange={handleImageChange}
            handleNameChange={handleNameChange}
          />
        </VariantModal>
      )}
    </div>
  );
};

export default Banner;

const BannerForm = ({
  banner = {},
  handleSubmit,
  handleNameChange,
  handleImageChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-bold text-xl my-3">Banner </h1>
      <div>
        <label>Image:</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          defaultValue={banner?.name}
          onChange={handleNameChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className=" my-3 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

const BannerProductForm = () => {
  const [bannerId, setBannerId] = useState("");
  const [productIds, setProductIds] = useState("");

  // Handle change for banner_id
  const handleBannerIdChange = (e) => {
    setBannerId(e.target.value);
  };

  // Handle change for product_ids as a comma-separated string
  const handleProductIdsChange = (e) => {
    setProductIds(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split the productIds string by commas and convert to numbers
    const productIdArray = productIds
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id) => !isNaN(id));
    console.log(productIdArray);
    const formData = {
      banner_id: Number(bannerId), // Convert bannerId to a number
      product_id: productIdArray, // Array of product IDs
    };

    try {
      const response = await privateRequest.post(
        "admin/banner-product",
        formData
      );
      if (response.status === 200 || response.status === 201) {
        Toastify.Success(response?.data?.message);
      } else {
        Toastify.Error("banner not posted or update");
      }
    } catch (error) {
      Toastify.Error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Banner ID:</label>
        <input
          type="number"
          value={bannerId}
          onChange={handleBannerIdChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label>Product IDs (comma separated):</label>
        <input
          type="text"
          value={productIds}
          onChange={handleProductIdsChange}
          placeholder="e.g. 1, 2, 3"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className=" my-3 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};
