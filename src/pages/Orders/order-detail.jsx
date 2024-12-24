import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { privateRequest } from "../../config/axios.config";
import moment from "moment";
import { FaCarSide } from "react-icons/fa";
const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  useEffect(() => {
    privateRequest
      .get(`/admin/order/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setOrderDetails(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  //   formate date code here
  const formatDate = (dateString) => {
    const formattedDate = moment(dateString).format("DD MMM YYYY");
    return formattedDate;
  };
  return (
    <div>
      <div className="flex gap-5 ">
        <div className="w-8/12 space-y-4">
          <p className="bg-blue-50 p-4 rounded-lg font-bold text-base text-gray-600">
            All Item
          </p>
          {/* order product show section  */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50 space-y-3">
            {
              orderDetails?.["order item"]?.map((item, index) => (
                <div className="flex justify-between ">
              <div className="flex gap-4" >
                <img alt="loading" />
                <div>
                <p>Product Name</p>
                <p className="text-base font-bold text-gray-600"> {item?.product?.title}</p>
                </div>
              </div>
              <div>
                <p>quantity</p>
                <p className="text-base font-bold text-gray-600"> {item?.qty}</p>
              </div>
              <div>
                <p>price</p>
                <p className="text-base font-bold text-gray-600">{
                    item?.sell_price * item?.qty
                  }</p>
              </div>
            </div>
              ))
            }
            
             
          </section>
        </div>
        {/* order divided second part  */}
        <section className="w-4/12 space-y-4">
          {/* order summary
           */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50">
            <h2 className="font-bold text-base text-black pb-2"> Summary</h2>
            <div className="grid grid-cols-2">
              <div className="text-gray-600 text-base">
                <p>Order ID</p>
                <p>Date</p>
                <p>Total</p>
              </div>
              <div className="font-bold text-base text-black ">
                <p>order me</p>
                <p>{formatDate(orderDetails?.["order Details"]?.updated_at)}</p>
                <p className="text-red-600">
                  ${orderDetails?.["order Details"]?.total_amount}
                </p>
              </div>
            </div>
          </section>
          {/* shpping address  */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50">
            <h2 className="font-bold text-base text-black pb-2">
              Shipping Address
            </h2>
            <p className="text-gray-600 overflow-auto">
              {orderDetails?.["order Details"]?.shipping_address?.address_line1}
              ,{" "}
              {orderDetails?.["order Details"]?.shipping_address?.address_line2}
              , {orderDetails?.["order Details"]?.shipping_address?.postal_code}
              , {orderDetails?.["order Details"]?.shipping_address?.union?.name}
              ,{" "}
              {orderDetails?.["order Details"]?.shipping_address?.upazila?.name}
              ,{" "}
              {
                orderDetails?.["order Details"]?.shipping_address?.district
                  ?.name
              }
              ,{" "}
              {
                orderDetails?.["order Details"]?.shipping_address?.division
                  ?.name
              }
            </p>
          </section>
          {/* payment method section  */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50">
            <h2 className="font-bold text-base text-black pb-2">
              Payment Method
            </h2>
            <p className="text-gray-600 overflow-auto">
              {orderDetails?.["order Details"]?.payment_status}
            </p>
          </section>
          {/* tracking order and expected date of delivery  */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50">
            <h2 className="font-bold text-base text-black pb-2">
            Expected Date Of Delivery
            </h2>
            <p className="text-green-600 overflow-auto font-bold text-base">
            {formatDate(orderDetails?.["order Details"]?.updated_at)}
            </p>
            <button className="border border-blue-600 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-semibold text-base w-full flex justify-center items-center gap-2 py-3 mt-3"> <FaCarSide /> Track Order</button>
          </section>
        </section>
      </div>
    </div>
  );
};

export default OrderDetails;
