import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { formatDate } from "../../../utils/formatedate";
import VariantModal from "../VariantModal/VariantModal";
const BrandVariant = ({
  brandVariant,
  handleDelete,
  setOpen,
  open,
  setValueAdded,
  valueAdded,
  handleAdded,
  handleUpdateAttribute,
  setId,
  id
}) => {
  console.log(brandVariant);
  // date formatting system
  const handleChange = (e) => {
    console.log(e.target.name);
    setValueAdded({
      ...valueAdded,
      [e.target.name]:
        typeof e.target.type === Number
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  return (
    <div>
      {open?.add && (
        <VariantModal setOpen={setOpen}>
          {/* post  form declare here  */}
          <BrandForm handleAdded={handleAdded} handleChange={handleChange} />
        </VariantModal>
      )}
      {brandVariant?.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                brand ID
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Name
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Status
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
            {brandVariant.map((brand, index) => (
              <tr key={brand?.brand_id} className="border-b-2">
                <td className="py-2 text-center px-4">{brand?.brand_id}</td>
                <td className="py-2 text-center px-4">{brand?.name}</td>
                <td className="py-2 text-center px-4">{brand?.status}</td>
                <td className="py-2 text-center px-4">
                  {formatDate(brand?.created_at)?.formate_date}{" "}
                </td>
                <td className="py-2 text-center px-4">
                  {" "}
                  {formatDate(brand?.updated_at)?.formate_date}{" "}
                </td>
                <td className="py-2 text-center px-4 h-full space-x-4">
                    {/* update modal open here for update value  */}
                 
                  <button
                    onClick={() => {
                      setOpen({
                        add: false,
                        update: true,
                      });
                      setId(brand?.brand_id);
                    }}
                  >
                    <FaRegEdit />
                  </button>

                  <button
                    className=" text-red-700 px-4 py-2 rounded"
                    onClick={() => handleDelete(brand?.brand_id)}
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
       {open?.update && (
                    <VariantModal setOpen={setOpen}>
                      {/* update form declare here  */}
                      <BrandForm
                        brand={brandVariant.find((item)=>item?.brand_id===id)}
                        handleAdded={handleUpdateAttribute}
                        handleChange={handleChange}
                      />
                    </VariantModal>
                  )}
    </div>
  );
};

export default BrandVariant;

const BrandForm = ({ brand = {}, handleAdded, handleChange }) => {
  return (
    <form onSubmit={handleAdded} className="space-y-4">
      <div>
        <label
          htmlFor="brand"
          className="block text-gray-700 font-semibold mb-2"
        >
          Brand Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={brand?.name || ""}
          placeholder="Enter your brand name"
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
  );
};
