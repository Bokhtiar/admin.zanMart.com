import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { publicRequest } from '../../config/axios.config';
import { getToken } from '../../utils/helper';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    category_id: 0,
    brand_id: 0,
    description: '',
    sell_price: 0,
    buy_price: 0,
    rating: 0,
    delivery_status: 'online',
    is_refundable_product: false,
    is_refundable_product_day: 0,
    stock_qty: 0,
    is_stock_qty_show: false,
    sku: '',
    metiral_of_product: '',
    unit_id: 0,
    low_stock_quantity_warning: 0,
    tax_price: 0,
    status: false,
    thumbnile_image: '',
    gellary_image: '',
    product_variant_id: 1
  });


  // useEffect(() => {
  //   // Fetch products from API
  //   publicRequest.get('/products')
  //     .then(response => {
  //       setProducts(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching products:", error);
  //     });
  // }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, });

  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log('............', getToken())
    if (!formData.title || !formData.sell_price) {
      alert("Please fill out all required fields.");
      return;
    }
    // const {thumbnile_image,gellary_image,  ...others} = formData;
    // console.log(others);
    //   const newProduct = {
    //      ...others,
    //     thumbnile_image:  "path/to/thumbnail.jpg",
    //     gellary_image:   "path/to/thumbnail.jpg",

    //   };

    //setProducts([...products, newProduct]);
    const data = {
      "brand_id": 1,
      "buy_price": 142,
      "category_id": 1,
      "delivery_status": "online",
      "description": "Dolore commodo nisi ",
      "gellary_image": "path/to/thumbnail.jpg",
      "is_refundable_product": true,
      "is_refundable_product_day": 20,
      "is_stock_qty_show": true,
      "low_stock_quantity_warning": 552,
      "metiral_of_product": "Et ut alias id id m",
      "product_variant_id": 1,
      "rating": 9,
      "sell_price": 58,
      "sku": "Sed ipsam et ut exer",
      "slug": "Beatae molestiae ear",
      "status": false,
      "stock_qty": 600,
      "tax_price": 400,
      "thumbnile_image": "path/to/thumbnail.jpg",
      "title": "Distinctio Minima a",
      "unit_id": 1
    }
    try {
      // Make API POST request
      console.log(formData, "-------------------");
      const response = await axios.post('http://127.0.0.1:8000/api/admin/product', data, {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${getToken()}`
        },
      });
      console.log(response, '----------')
      // Handle response
      if (response.status === 200 || response.status === 201) {
        setProducts([...products, response.data]);
        toggleModal();
        resetForm();
      } else {
        alert("Error in uploading product.");
      }
    } catch (error) {
      console.log('Error uploading product:', error.message);
      alert("Error uploading product.");
    }

    toggleModal();
    resetForm();
    // console.log(newProduct)
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      category_id: '',
      brand_id: '',
      description: '',
      sell_price: '',
      buy_price: '',
      rating: '',
      delivery_status: '',
      is_refundable_product: false,
      is_refundable_product_day: '',
      stock_qty: '',
      is_stock_qty_show: false,
      sku: '',
      metiral_of_product: '',
      unit_id: '',
      low_stock_quantity_warning: '',
      tax_price: '',
      status: false,
      thumbnile_image: '',
      gellary_image: '',
    });
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleUpdate = (index) => {
    const product = products[index];
    setFormData({
      ...product,
      thumbnile_image: '',
      gellary_image: '',
    });
    setIsUpdating(true);
    toggleModal();
  };

  return (
    <div className="relative mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          className="bg-blue-500 text-white px-4 font-semibold py-2 rounded"
          onClick={toggleModal}
        >
          + Create Product
        </button>
      </div>

      {products.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">Image</th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">Title</th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">Price</th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">Brand</th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">Category</th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className='border-b-2'>
                <td className="py-2 px-4">
                  {product.thumbnile_image && (
                    <img
                      src={product.thumbnile_image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="py-2 text-center px-4">{product.title}</td>
                <td className="py-2 text-center px-4">${product.sell_price}</td>
                <td className="py-2 text-center px-4">{product.brand_id}</td>
                <td className="py-2 text-center px-4">{product.category_id}</td>
                <td className="py-2 text-center px-4 h-full space-x-4">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={() => handleUpdate(index)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}

      {isModalOpen && (
        <div className="fixed py-10 inset-0 flex max-h-screen items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-78 md:w-[500px] overflow-y-auto max-h-full">
            <h2 className="text-xl font-bold mb-4">
              {isUpdating ? 'Update Product' : 'Create New Product'}
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block mb-2">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Category ID</label>
                <input
                  type="number"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Brand ID</label>
                <input
                  type="number"
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Sell Price</label>
                <input
                  type="number"
                  name="sell_price"
                  value={formData.sell_price}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Buy Price</label>
                <input
                  type="number"
                  name="buy_price"
                  value={formData.buy_price}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Delivery Status</label>
                <input
                  type="text"
                  name="delivery_status"
                  value={formData.delivery_status}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="is_refundable_product"
                  checked={formData.is_refundable_product}
                  onChange={handleChange}
                />
                <label className="">Is Refundable Product</label>
              </div>
              {formData.is_refundable_product && (
                <div>
                  <label className="block mb-2">Refundable Days</label>
                  <input
                    type="number"
                    name="is_refundable_product_day"
                    value={formData.is_refundable_product_day}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                </div>
              )}
              <div>
                <label className="block mb-2">Stock Quantity</label>
                <input
                  type="number"
                  name="stock_qty"
                  value={formData.stock_qty}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="is_stock_qty_show"
                  checked={formData.is_stock_qty_show}
                  onChange={handleChange}
                />
                <label className="">Show Stock Quantity</label>
              </div>
              <div>
                <label className="block mb-2">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Material</label>
                <input
                  type="text"
                  name="metiral_of_product"
                  value={formData.metiral_of_product}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Unit ID</label>
                <input
                  type="number"
                  name="unit_id"
                  value={formData.unit_id}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Low Stock Warning</label>
                <input
                  type="number"
                  name="low_stock_quantity_warning"
                  value={formData.low_stock_quantity_warning}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Tax Price</label>
                <input
                  type="number"
                  name="tax_price"
                  value={formData.tax_price}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />
                <label className="">Status</label>
              </div>
              <div>
                <label className="block mb-2">Thumbnail Image</label>
                <input
                  type="file"
                  name="thumbnile_image"
                  onChange={handleImageChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Gallery Images</label>
                <input
                  type="file"
                  name="gellary_image"
                  onChange={handleImageChange}
                  multiple
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={toggleModal} className="rounded bg-slate-300 px-4 border">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  {isUpdating ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>

      )}
    </div>
  );
};

export default Products;
