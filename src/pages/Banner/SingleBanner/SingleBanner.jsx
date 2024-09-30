import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { privateRequest } from '../../../config/axios.config';
import { Toastify } from '../../../components/toastify';

const SingleBanner = () => {
    const { id } = useParams();
    const [data,setData] = useState({});
   const  fetchSingleBanner = async()=>{
        try {
            const res = await privateRequest.get(`admin/banner-product/${id}`); 
            console.log(res);
            if (res?.status === 200 || res?.status === 201) {
                setData(res?.data?.data);
            }
          } catch (err) {
            Toastify.Error(err.message);
          }
    }
    useEffect(()=>{
        fetchSingleBanner()
    },[])
    return (
        <div>
        <div className='flex justify-center'>
           <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
            <img 
                className="w-full h-48 object-cover mb-4 rounded-lg" 
                src={`${process.env.REACT_APP_BASE_API}${data?.image}`}
                alt={data?.name}
            />
            <div className="font-bold text-xl mb-2">{data?.name}</div>
            <p className="text-gray-700 text-base">Banner ID: {data?.banner_id}</p>
        </div>
        </div>
        <div className='grid grid-cols-4 my-5 gap-5'>
      {
         data?.products?.length>0 && data?.products?.map((item,index)=><ProductCard product={item} key={index}/>)
      }
        </div>
       
        </div>
    );
};

export default SingleBanner;
 
const ProductCard = ({ product }) => {
    console.log(product);
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg p-6 bg-white transition-transform transform hover:scale-105">
            <img 
                className="w-full h-48 object-cover mb-4 rounded-lg" 
               
                src={`${process.env.REACT_APP_BASE_API}/${product?.thumbnile_image}`} 
                alt={product?.sku}
            />
            <div className="font-bold text-xl mb-2">{product?.sku}</div>
            <p className="text-gray-700 text-base">Sell Price: ${product?.sell_price}</p>
            <p className="text-gray-700 text-base">Buy Price: ${product?.buy_price}</p>
            <p className="text-gray-700 text-base">Rating: {product?.rating} ★</p>
            <p className="text-gray-700 text-base">Delivery Status: {product?.delivery_status}</p>
            <p className="text-gray-700 text-base">
                Refundable: {product?.is_refundable_product ? 'Yes' : 'No'} 
                {product?.is_refundable_product ? ` (within ${product?.is_refundable_product_day} days)` : ''}
            </p>
            <p className="text-gray-700 text-base">Stock Quantity: {product?.is_stock_qty_show ? product?.stock_qty : 'Not shown'}</p>
            <p className="text-gray-700 text-base">Material: {product?.metiral_of_product}</p>
            <p className="text-gray-700 text-base">Tax Price: ${product?.tax_price}</p>
        </div>
    );
};

 
