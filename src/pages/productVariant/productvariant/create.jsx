import React, { useState, useEffect, useCallback } from "react";
import { NetworkServices } from "../../../network";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toastify } from "../../../components/toastify";
import { SkeletonForm } from "../../../components/loading/skeleton-table";
import { useFieldArray, useForm } from "react-hook-form";
import { SingleSelect, TextInput } from "../../../components/input";
import { networkErrorHandeller } from "../../../utils/helper";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [unit, setUnit] = useState([]);
  const [loading, setLoading] = useState(false);
  // react hook form declaration
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      variant: [{ price: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variant",
  });
  // color fetch for set product vairant
  const fetchColor = useCallback(async () => {
    // setLoading(true);
    try {
      const colorResponse = await NetworkServices.Color.index(); // Fetch colors from API

      if (colorResponse && colorResponse.status === 200) {
        const result = colorResponse.data.data.data.map((item) => {
          return {
            label: item.name,
            value: item.color_id,
            ...item,
          };
        });

        setColors(result); // Set the result to state
      }
    } catch (error) {
      console.error("Fetch Category Error:", error); // Handle errors
    }

    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // Fetch color data when the component mounts
  useEffect(() => {
    fetchColor();
  }, [fetchColor]);
  //  unit fetch
  const fetchUnit = useCallback(async () => {
    setLoading(true);
    try {
      const unitResponse = await NetworkServices.Unit.index(); // Fetch colors from API

      if (unitResponse && unitResponse.status === 200) {
        console.log(unitResponse);
        const result = unitResponse.data?.data?.data?.map((item) => {
          return {
            label: item.name,
            value: item.unit_id,
            ...item,
          };
        });

        setUnit(result); // Set the result to state
      }
    } catch (error) {
      console.error("Fetch Category Error:", error); // Handle errors
    }

    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // Fetch color data when the component mounts
  useEffect(() => {
    fetchUnit();
  }, [fetchUnit]);
  //  attribute fetch here
  const fetchAttribute = useCallback(async () => {
    setLoading(true);
    try {
      const attributeResponse = await NetworkServices.Attribute.index(); // Fetch colors from API

      if (attributeResponse && attributeResponse.status === 200) {
        const result = attributeResponse.data?.data?.data?.map((item) => {
          return {
            label: item.name,
            value: item.attribute_id,
            ...item,
          };
        });

        setAttributes(result); // Set the result to state
      }
    } catch (error) {
      console.error("Fetch Category Error:", error); // Handle errors
    }

    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // Fetch color data when the component mounts
  useEffect(() => {
    fetchAttribute();
  }, [fetchAttribute]);

  // submit here   code
  const onSubmit = async (e) => {
    try {
      const updateValue = e.variant.map((e) => {
        return {
          product_id: Number(id),
          color_id: Number(e?.color?.color_id),
          attribute_id: Number(e?.attributes?.attribute_id),
          unit_id: Number(e?.unit?.unit_id),
          product_qty: Number(e?.quantity),
          weight: Number(e?.weight),
          price: Number(e?.price),
          discount_price: Number(e?.flat_discount),
          available_quantity: Number(e?.available_quantity),
        };
      });
      const response = await NetworkServices.ProductVariant.store(updateValue);
      if (response.status === 200 || response.status === 201) {
        navigate("/dashboard/product");
        return Toastify.Success("Product varaint create successfully.");
      }
    } catch (error) {
      return networkErrorHandeller(error);
    }
  };

  //  random color call for every form to see detairmind easily
  const callColor = (index) => {
    const randomColor = [
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-gray-200",
      "bg-lime-200",
      "bg-teal-200",
      "bg-indigo-200",
      "bg-purple-200",
      "bg-rose-900",
    ];
    const randomNumber = Math.ceil(Math.random() * 10);
    if (index >= 9) {
      return randomColor[randomNumber - 1];
    }
    return randomColor[index];
  };
  return (
    <>
      {loading ? (
        <SkeletonForm />
      ) : (
        <div className="p-6 bg-gray-100 rounded-md shadow-md mx-auto">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold mb-4 text-gray-700">
              Product Information
            </h2>
            <Link to={`/dashboard/product/`}>
              <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
                list
              </span>
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4  ">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={`mb-4 border p-4 rounded-md ${callColor(index)} `}
              >
                {/* Row for Color and Attribute */}
                <div className="md:space-y-0  space-y-2  flex flex-col mb-4 gap-4 md:flex-row">
                  {/* Color Select Dropdown */}
                  <div className="flex-1">
                    <SingleSelect
                      label="Select Color"
                      name={`variant.${index}.color`}
                      control={control}
                      error={
                        errors?.variant?.[index]?.color &&
                        errors?.variant?.[index]?.color.message
                      }
                      isClearable={true}
                      placeholder="Select Color"
                      options={colors}
                      rules={{ required: "Color is required" }}
                      // onSearch={fetchColor}
                      // onSelectId={(id) => setSelectedColor(id)}
                    />
                  </div>

                  {/* Unit Select Dropdown */}
                  <div className="flex-1">
                    <SingleSelect
                      label=" Select Unit"
                      control={control}
                      name={`variant.${index}.unit`}
                      error={
                        errors?.variant?.[index]?.unit &&
                        errors?.variant?.[index]?.unit.message
                      }
                      isClearable={true}
                      placeholder="Select unit"
                      options={unit}
                      rules={{ required: "unit is required" }}
                      // onSearch={fetchunit}
                      // onSelectId={(id) => setSelectedColor(id)}
                    />
                  </div>
                </div>
                {/* Row for Unit and Quantity */}
                <div className="flex flex-col mb-4 gap-4 md:flex-row">
                  {/* Attribute Select Dropdown */}
                  <div className="flex-1">
                    <SingleSelect
                      label=" Select Attributes"
                      name={`variant.${index}.attributes`}
                      error={
                        errors?.variant?.[index]?.attributes &&
                        errors?.variant?.[index]?.attributes?.message
                      }
                      control={control}
                      isClearable={true}
                      placeholder="Select Attributes"
                      options={attributes}
                      rules={{ required: "Attributes is required" }}
                      // onSearch={fetchColor}
                      // onSelectId={(id) => setSelectedColor(id)}
                    />
                  </div>
                  {/* Quantity Input */}
                  <div className="flex-1">
                    <TextInput
                      control={control}
                      label=" Product Quantity "
                      type="number"
                      name={`variant.${index}.quantity`}
                      error={
                        errors?.variant?.[index]?.quantity &&
                        errors?.variant?.[index]?.quantity?.message
                      }
                      placeholder="Create Quantity"
                      rules={{ required: "Quantity is required" }}
                    />
                  </div>
                  <div className="flex-1">
                    <TextInput
                      control={control}
                      label=" Available quantity "
                      type="number"
                      name={`variant.${index}.available_quantity`}
                      error={
                        errors?.variant?.[index]?.available_quantity &&
                        errors?.variant?.[index]?.available_quantity?.message
                      }
                      placeholder="Create available quantity"
                      rules={{ required: "available quantity is required" }}
                    />
                  </div>
                </div>
                {/* Row for Weight and Price */}
                <div className="flex flex-col mb-4 gap-4 md:flex-row">
                  {/* Weight Input */}
                  <div className="flex-1">
                    <TextInput
                      name={`variant.${index}.weight`}
                      error={
                        errors?.variant?.[index]?.weight &&
                        errors?.variant?.[index]?.weight?.message
                      }
                      control={control}
                      label=" Product Weight "
                      type="number"
                      placeholder="Enter weight"
                      rules={{ required: "Quantity is required" }}
                    />
                  </div>

                  {/* Price Input */}
                  <div className="flex-1">
                    <TextInput
                      name={`variant.${index}.price`}
                      error={
                        errors?.variant?.[index]?.price &&
                        errors?.variant?.[index]?.price?.message
                      }
                      control={control}
                      label=" Price "
                      type="number"
                      placeholder="Enter Price"
                      rules={{ required: "Price is required" }}
                    />
                  </div>
                  {/* flat discount  */}
                  <div className="flex-1">
                    <TextInput
                      name={`variant.${index}.flat_discount`}
                      error={
                        errors?.variant?.[index]?.flat_discount &&
                        errors?.variant?.[index]?.flat_discount?.message
                      }
                      control={control}
                      label=" Flat Discount "
                      type="number"
                      placeholder="Enter Flat Discount"
                      rules={{ required: "Price is required" }}
                    />
                  </div>
                </div>
               { fields?.length!==1&& <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Remove
                </button>}
              </div>
            ))}

            <div className="flex gap-4">
              {/* add more button  */}
              <button
                type="button"
                onClick={() => append({ price: ""  })}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add More
              </button>
              {/* submit button  */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ProductForm;
