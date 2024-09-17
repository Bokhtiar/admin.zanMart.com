import React, { useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    inStock: '',
    description: '',
    category: '',
    brand: '',
    image: null, // Added to store the image file
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Store the image file
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (isUpdating) {
      const updatedProducts = [...products];
      updatedProducts[currentProductIndex] = {
        ...formData,
        imageURL: formData.image ? URL.createObjectURL(formData.image) : products[currentProductIndex].imageURL,
      };
      setProducts(updatedProducts);
      setIsUpdating(false);
    } else {
      const newProduct = {
        ...formData,
        imageURL: URL.createObjectURL(formData.image),
      };
      setProducts([...products, newProduct]);
    }

    toggleModal();

    // Reset the form
    setFormData({
      name: '',
      price: '',
      inStock: '',
      description: '',
      category: '',
      brand: '',
      image: null,
    });
    setCurrentProductIndex(null);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleUpdate = (index) => {
    const product = products[index];
    setFormData({
      ...product,
      image: null, // Reset image to null so it doesn't overwrite existing image unless a new one is uploaded
    });
    setCurrentProductIndex(index);
    setIsUpdating(true);
    toggleModal(); // Open the modal for updating
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
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">Name</th>
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
                  {product.imageURL && (
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="py-2 text-center px-4">{product.name}</td>
                <td className="py-2 text-center px-4">${product.price}</td>
                <td className="py-2 text-center px-4">{product.brand}</td>
                <td className="py-2 text-center px-4">{product.category}</td>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-78 md:w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              {isUpdating ? 'Update Product' : 'Create New Product'}
            </h2>
            <form onSubmit={handleUpload} className="space-y-2">
              <div>
                <label className="block mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">In Stock</label>
                <input
                  type="number"
                  name="inStock"
                  value={formData.inStock}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Product Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="border p-2 rounded w-full"
                  required={!isUpdating} // Only required for new products
                />
              </div>
              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
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
