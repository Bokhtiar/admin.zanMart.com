import React, { useState, useEffect, useCallback } from "react";
import { NetworkServices } from "../../../network";
import { Link, useNavigate } from "react-router-dom";
import { Toastify } from "../../../components/toastify";
import { SkeletonForm } from "../../../components/loading/skeleton-table";
import { SearchDropdownWithSingle } from "../../../components/input/selectsearch";
import { useForm } from "react-hook-form";
import { SingleSelect, TextInput } from "../../../components/input";

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const [unit, setUnit] = useState([]);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [flatDiscount, setFlatDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [addedVariant, setAddedVariant] = useState([]);

  console.log("attributes", attributes);

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const fetchColor = useCallback(async () => {
    // setLoading(true);
    try {
      const colorResponse = await NetworkServices.Color.index(); // Fetch colors from API
      console.log("colorResponse", colorResponse);

      if (colorResponse && colorResponse.status === 200) {
        const result = colorResponse.data.data.data.map((item) => {
          return {
            label: item.name,
            value: item.color_id,
            ...item,
          };
        });
        console.log(result);
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

  const fetchProducts = useCallback(async () => {
    try {
      const ProductResponse = await NetworkServices.Product.index();
      if (ProductResponse.status === 200) {
        const result = ProductResponse?.data?.data?.data;
        const data = result.map((data) => ({
          label: data?.slug,
          value: data?.product_id,
          ...data,
        }));
        setProducts(data);
      }
    } catch (error) {
      Toastify.Error(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchUnit = useCallback(async () => {
    // setLoading(true);
    try {
      const unitResponse = await NetworkServices.Unit.index(); // Fetch colors from API
      console.log("unitResponse", unitResponse);

      if (unitResponse && unitResponse.status === 200) {
        const result = unitResponse.data?.data?.data?.map((item) => {
          return {
            label: item.name,
            value: item.unit_id,
            ...item,
          };
        });
        console.log(result);
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

  const fetchAttribute = useCallback(async () => {
    // setLoading(true);
    try {
      const attributeResponse = await NetworkServices.Attribute.index(); // Fetch colors from API
      console.log("attributeResponse", attributeResponse);

      if (attributeResponse && attributeResponse.status === 200) {
        const result = attributeResponse.data?.data?.data?.map((item) => {
          return {
            label: item.name,
            value: item.attribute_id,
            ...item,
          };
        });
        console.log(result);
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

  const handelAllVariant = () => {
    const data = {
      product_id: Number(selectedProduct),
      color_id: Number(selectedColor),
      attribute_id: Number(selectedAttribute),
      unit_id: Number(selectedUnit),
      product_qty: Number(quantity),
      weight: Number(weight),
      price: Number(price),
      flat_discount : Number(flatDiscount)
    };
    setAddedVariant((prev) => [...prev, data]);
    setdd(!ddd);
    setSelectedColor("");
    setSelectedAttribute("");
    setSelectedProduct("");
    setSelectedUnit("");
    setPrice("");
    setQuantity("");
    setWeight("");
    setFlatDiscount("");
  };

  // submit here   code
  const onSubmit = async (data) => {
    try {
      // You can send this formData to your API
      const response = await NetworkServices.ProductVariant.store(data);
      if (response.status === 200 || response.status === 201) {
        navigate("/dashboard/product-variant");
        return Toastify.Success("Product varaint create successfully.");
      }
    } catch (error) {
      return Toastify.Error(error);
    }
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
            <Link to={`/dashboard/product-variant/`}>
              <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
                list
              </span>
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Product Select Dropdown */}
            <div className="mb-4 ">

              <SingleSelect
                label=" Select Product"
                name="product"
                control={control}
                error={errors.product && errors.product.message}
                isClearable={true}
                placeholder="Select Product"
                options={products}
                rules={{ required: "Meeting_type is required" }}
                // onSearch={fetchColor}
                onSelectId={(id) => setSelectedColor(id)}
              />
            </div>

            {/* Row for Color and Attribute */}
            <div className="flex mb-4 gap-4">
              {/* Color Select Dropdown */}
              <div className="flex-1">

                <SingleSelect
                  label=" Select Color"
                  name="color"
                  control={control}
                  error={errors.color && errors.color.message}
                  isClearable={true}
                  placeholder="Select Color"
                  options={colors}
                  rules={{ required: "Meeting_type is required" }}
                  // onSearch={fetchColor}
                  onSelectId={(id) => setSelectedColor(id)}
                />
              </div>

              {/* Unit Select Dropdown */}
              <div className="flex-1">
                <SingleSelect
                  label=" Select Unit"
                  name="unit"
                  control={control}
                  error={errors.unit && errors.unit.message}
                  isClearable={true}
                  placeholder="Select unit"
                  options={unit}
                  rules={{ required: "unit is required" }}
                  // onSearch={fetchColor}
                  onSelectId={(id) => setSelectedColor(id)}
                />
              </div>
            </div>

            {/* Row for Unit and Quantity */}
            <div className="flex mb-4 gap-4">
              {/* Attribute Select Dropdown */}
              <div className="flex-1">
                <SingleSelect
                  label=" Select Attributes"
                  name="attributes"
                  control={control}
                  error={errors.unit && errors.unit.message}
                  isClearable={true}
                  placeholder="Select Attributes"
                  options={attributes}
                  rules={{ required: "Attributes is required" }}
                  // onSearch={fetchColor}
                  onSelectId={(id) => setSelectedColor(id)}
                />
              </div>
              {/* Quantity Input */}
              <div className="flex-1">
                <TextInput
                  name="quantity"
                  control={control}
                  label=" Product Quantity "
                  type="number"
                  placeholder="Create Quantity"
                  rules={{ required: "Quantity is required" }} // Validation rule
                  error={errors.quantity?.message} // Show error message
                />
              </div>
            </div>

            {/* Row for Weight and Price */}
            <div className="flex mb-4 gap-4">
              {/* Weight Input */}
              <div className="flex-1">
                <TextInput
                  name="weight"
                  control={control}
                  label=" Product Weight "
                  type="number"
                  placeholder="Enter weight"
                  rules={{ required: "Quantity is required" }} // Validation rule
                  error={errors.weight?.message} // Show error message
                />
              </div>

              {/* Price Input */}
              <div className="flex-1">
                <TextInput
                  name="price"
                  control={control}
                  label=" Price "
                  type="number"
                  placeholder="Enter Price"
                  rules={{ required: "Price is required" }} // Validation rule
                  error={errors.price?.message} // Show error message
                />
              </div>
              {/* flat discount  */}
              <div className="flex-1">
                <TextInput
                  name="flat_discount"
                  control={control}
                  label=" Flat Discount "
                  type="number"
                  placeholder="Enter Flat Discount"
                  rules={{ required: "Price is required" }} // Validation rule
                  error={errors.price?.message} // Show error message
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <span
                onClick={handelAllVariant}
                className="cursor-pointer flex justify-center w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add
              </span>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
