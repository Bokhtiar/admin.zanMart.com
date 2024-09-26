import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../../utils/formatedate";
const UnitVariant = ({ unitvariant, handleDelete, setOpen, open ,setValueAdded,valueAdded , handleAdded}) => {
  console.log(unitvariant);
  // date formatting system
  const handleChange = e=>{
      console.log(e.target.name);
      setValueAdded({
        ...valueAdded,
        [e.target.name]:typeof e.target.type===Number ?Number(e.target.value):e.target.value
      })
  }
   return (
    <div>
      {open && (
        <div className="fixed py-10 inset-0 flex max-h-screen items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white p-6 rounded-lg shadow-lg sm:w-78 md:w-[500px] overflow-y-auto max-h-full z-10">
    <form onSubmit={handleAdded} className="space-y-4">
        <div>
            <label htmlFor="color" className="block text-gray-700 font-semibold mb-2">
              Unit
            </label>
            <input
                type="text"
                id="color"
                name="name"
                placeholder="Enter Unit"
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
</div>

          <div
            className="absolute bg-black opacity-5 w-full top-0 left-0 h-full z-5"
            onClick={() => setOpen(false)}
          ></div>
        </div>
      )}
      {unitvariant?.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Color ID
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
            {unitvariant.map((color, index) => (
              <tr key={color?.color_id} className="border-b-2">
                <td className="py-2 text-center px-4">{color?.unit_id}</td>
                <td className="py-2 text-center px-4">{color?.name}</td>
                <td className="py-2 text-center px-4">{color?.status}</td>
                <td className="py-2 text-center px-4">
                  {formatDate(color?.created_at)?.formate_date}{" "}
                </td>
                <td className="py-2 text-center px-4">
                  {" "}
                  {formatDate(color?.updated_at)?.formate_date}{" "}
                </td>
                <td className="py-2 text-center px-4 h-full space-x-4">
                  <button
                    className=" text-red-700 px-4 py-2 rounded"
                    onClick={() => handleDelete(color?.color_id)}
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
    </div>
  );
};

export default UnitVariant;
