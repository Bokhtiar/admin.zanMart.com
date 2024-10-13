import { Toastify } from "../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import {
  SearchableSelect,
  SingleSelect,
  TextAreaInput,
  TextInput,
} from "../../components/input";
import { SkeletonForm } from "../../components/loading/skeleton-table";
import { FaCamera } from "react-icons/fa";

export const CategoryCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedunitIds, setSelectedunitIds] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [singleImage, setSingleImage] = useState(null);
  const [showSingleImage, setShowSingleImage] = useState(null);
  // uploadProgress
  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSingleImage(file);
      const imageUrl = URL.createObjectURL(file);
      setShowSingleImage(imageUrl);
    }
  };
  // submit form for cateogyr
  const {
    control,
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
      checkbox: 0, // Initial value set to 0
    },
  });
  /* submit reosurce */

  const fetchDataForUnit = useCallback(async (category) => {
    try {
      setLoading(true);
      const response = await NetworkServices.Unit.index();

      if (response?.status === 200 || response?.status === 201) {
        setUnitData(response?.data?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      if (error) {
        networkErrorHandeller(error);
      }
    }
  }, []);
  useEffect(() => {
    fetchDataForUnit();
  }, []);
  // submit functionality for the category
  console.log(selectedunitIds,"selected unit ids");
  const onSubmit = async (data) => {
    try {
      setButtonLoading(true);
      const formData = new FormData();
      formData.append("category_name", data?.category_name);
      data?.parent_id && formData.append("parent_id", data?.parent_id);
      // selectedunitIds &&   selectedunitIds.forEach((category, index) => {
      //   formData.append(`is_unit`, category);
      // }); 
      formData.append('is_unit',JSON.stringify( selectedunitIds));
      data?.is_color && formData.append("is_color", data?.is_color);
      singleImage && formData.append("thumbnail", singleImage);
      const response = await NetworkServices.Category.store(formData);
      console.log(response);
      if (response && (response.status === 201 || response?.status === 200)) {
        navigate("/dashboard/category");
        setButtonLoading(false);
        return Toastify.Success("Category Created.");
      }
    } catch (error) {
      console.log(error);
      setButtonLoading(false);
      networkErrorHandeller(error);
    }
  };

  const handleCheckboxChange = (unitId) => {
    setSelectedunitIds((prevSelected) => {
      if (prevSelected.includes(unitId)) {
        // If the unit ID is already selected, remove it
        return prevSelected.filter((id) => id !== unitId);
      } else {
        // If the unit ID is not selected, add it
        return [...prevSelected, unitId];
      }
    });
  };

  return (
    <>
      <section className="flex justify-between shadow-md p-2 my-3 rounded-md bg-white mb-3">
        <h2 className=" font-semibold text-xl">Category Create</h2>
        <Link to="/dashboard/category">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>

      {loading ? (
        <SkeletonForm />
      ) : (
        <section className="shadow-md my-5 p-2">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            {/* category name */}
            <div className="mb-14">
              <div className="mb-6 lg:mb-2  relative">
                <label>Parent Category </label>

                <SearchDropdownWithSingle
                  register={register}
                  setValue={setValue}
                />
              </div>
            </div>
            <div className="mb-6 lg:mb-2">
              <TextInput
                label="Category Name"
                name="category_name"
                type="text"
                placeholder="Enter category name"
                control={control}
                error={errors.name && errors.name.message}
                rules={{ required: "Category Name is required" }}
              />
            </div>
            {/* image section  */}
            <div className="mb-6 lg:mb-2 w-full z-10">
              <p className="text-sm mb-1 text-gray-500">Banner Image</p>
              <div className="flex flex-col items-center cursor-pointer">
                <label className="relative flex items-center justify-center w-full  h-36 md:h-36  border-2 border-dashed border-gray-300 cursor-pointer bg-gray-100 rounded-md">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSingleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {singleImage ? (
                    <img
                      src={showSingleImage}
                      alt="Uploaded"
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <div>
                      <span className="text-gray-500 ">
                        <FaCamera className="text-black opacity-100    text-3xl  " />
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="mb-6 lg:mb-2">
              <p>Unit IDs</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
                {unitData.map((unit) => (
                  <div key={unit?.unit_id}>
                    <label className="space-x-2">
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={selectedunitIds.includes(unit?.unit_id)}
                          onChange={() => handleCheckboxChange(unit?.unit_id)} // Handle checkbox selection
                          className="cursor-pointer"
                        />
                        <span>{unit?.name}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6 lg:mb-2">
              <p>Is Color?</p>
              <input
                type="checkbox"
                {...register("checkbox")}
                onChange={(e) => setValue("is_color", e.target.checked ? 1 : 0)}
              />
            </div>

            {/* submit button */}
            <div className="my-4 flex justify-center">
              <PrimaryButton
                loading={buttonLoading}
                name="Category create"
              ></PrimaryButton>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

const SearchDropdownWithSingle = ({ register, setValue }) => {
  const [searchText, setSearchText] = useState({});
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);

  // Filter options based on user input
  //   const handleSearch = (e) => {
  //     const value = e.target.value;
  //     setSearchText(value);

  //     // Filter options by the search text
  //     const filtered = options.filter((option) =>
  //       option.toLowerCase().includes(value.toLowerCase())
  //     );

  //     setFilteredOptions(filtered);
  //   };

  // Handle selection from dropdown
  const handleOptionSelect = (option) => {
    setOpen(true);
    setSelectedOption(option);
    setSearchText(option);
    setValue("parent_id", option?.category_id);
    // Set search text to selected option
    // setFilteredOptions([]); // Clear dropdown after selection
  };

  // fetch category data
  const fetchData = useCallback(async (category) => {
    try {
      //   setLoading(true);
      const response = await NetworkServices.Category.index();
      if (response?.status === 200 || response?.status === 201) {
        setFilteredOptions(response?.data?.data?.data);
        // setLoading(false);
      }
    } catch (error) {
      if (error) {
        networkErrorHandeller(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  const [isOpen, setIsOpen] = useState(false); // Track if the div is open
  const divRef = useRef(null); // Reference to the div element

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsOpen(false); // Close the div if click is outside
        setOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);
  return (
    <div className="absolute w-full z-50">
      <input
        type="text"
        value={searchText?.category_name}
        onFocus={() => setOpen(true)}
        // onBlur={()=>setOpen(false)}
        placeholder="Select your item"
        readOnly
        className={`w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 cursor-pointer `}
      />

      {/* Display filtered options in a dropdown */}
      {open && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            border: "1px solid #ccc",
          }}
          ref={divRef}
        >
          <input
            type="text"
            // value={searchText}
            // onSearch={handleSearch}
            placeholder="Search your "
            className="w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 "
          />
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: "#f8f8f8",
                borderBottom: "1px solid #ddd",
              }}
            >
              {option?.category_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
