import React, { useState } from 'react'; 
import { privateRequest } from '../../config/axios.config';

const PostProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        category_id: '',
        brand_id: '',
        sell_price: '',
        buy_price: '',
        rating: '',
        delivery_status: '',
        is_refundable_product: false,
        stock_qty: '',
        is_stock_qty_show: false,
        sku: '',
        metiral_of_product: '',
        unit_id: '',
        low_stock_quantity_warning: '',
        tax_price: '',
        description: '',
        status: false,
        thumbnile_image: null,
        gellary_image: []
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value, type, checked } = e.target;
        console.log(type)
       
        if(type==='number'){
            setFormData({ ...formData, [name]: Number(value) });
        }
       else if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (type === "file") {
            if (name === "gellary_image") {
                setFormData({ ...formData, [name]: [...e.target.files] });
            } else {
                setFormData({ ...formData, [name]: e.target.files[0] });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const form = new FormData();
        for (const key in formData) {
            console.log(formData[key]);
            if (key === "gellary_image") {
                formData[key].forEach((file) => {
                    form.append(key + '[]', file);
                });
            } else {
                if(formData[key]==false || formData[key]==true){ 
                    form.append(key, 1);
                }else{
                    form.append(key, formData[key]);
                }
               
            }
        }
           console.log(formData);
        try {
            const response = await privateRequest.post('admin/product', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product created successfully', response.data);
        } catch (error) {
            console.error(error);
            console.error('Error creating product', error?.message);
        }
    };
  
    return (
        <div>
             <form  className="space-y-4" onSubmit={handleSubmit}>

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
              {/* {formData.is_refundable_product && (
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
              )} */}
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
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
              </div>
              <div>
                <label className="block mb-2">Gallery Images</label>
                <input
                        type="file"
                        name="gellary_image"
                        onChange={handleChange}
                        multiple
                        className="border p-2 rounded w-full"
                    />
              </div>
              <div className="flex gap-2 justify-end">
                <button  className="rounded bg-slate-300 px-4 border">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                   submit
                </button>
              </div>
            </form>
        </div>
    );
};

export default PostProduct;