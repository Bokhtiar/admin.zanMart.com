import { useParams } from "react-router-dom";
import { TextInput } from "../../components/input";
import { Toastify } from "../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm  } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonForm } from "../../components/loading/skeleton-table";

export const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const [selectedunitIds, setSelectedunitIds] = useState([]);
  const [unitData, setUnitData] = useState([]);
  // form submit 
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  /* reosure show */
  const fetchData = useCallback(async () => {
    try {
      const response = await NetworkServices.Category.show(id);

      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, []);

  /* submit reosurce */
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
      };
      const response = await NetworkServices.Category.update(id, payload);

      if (response.status === 200) {
        navigate("/dashboard/category");
        return Toastify.Success(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      networkErrorHandeller(error);
    }
  };
  // fetch unit data 
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
    fetchData();
    fetchDataForUnit();
  }, []);
  // unit seletected area 
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
      {data ? (
        <section className="shadow-md my-5 p-2">
          <form className="p " onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-14">
                <div className="mb-6 lg:mb-2  relative">
                  <label>Parent Category </label>
                  <SearchDropdownWithSingle
                    register={register}
                    setValue={setValue}
                  />
                </div>
              </div>
              {/* category name */}
              <TextInput
                label="Category Name"
                name="category_name"
                type="text"
                placeholder="Enter category name"
                control={control}
                error={errors.name && errors.name.message}
                defaultvalue={data ? data?.category_name : "s"}
                rules={{ required: "Category name is required" }}
              />
            </div>
          {/* unit ids  */}
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
            {/* submit button */}
            <div className="my-4 flex justify-center">
              <PrimaryButton
                loading={loading}
                name="Category Update"
              ></PrimaryButton>
            </div>
          </form>
        </section>
      ) : (
        <>
          <SkeletonForm></SkeletonForm>
        </>
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
    <div className="absolute w-full">
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
