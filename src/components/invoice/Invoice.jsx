import React, { useEffect } from 'react';

export const OrderDetails = () => {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 border border-gray-200 shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Order Invoice</h1>

      {/* Company Details */}
      <div className="mb-6">
        <p><strong>Store Name:</strong> Zan Vision</p>
        <p><strong>Email:</strong> support@zanvision.com</p>
        <p><strong>Phone:</strong> +8801XXXXXXXXX</p>
      </div>

      {/* Customer Details */}
      <div className="mb-6">
        <p><strong>Customer:</strong> John Doe</p>
        <p><strong>Address:</strong> 123 Main Street, Dhaka, BD</p>
        <p><strong>Order Date:</strong> June 3, 2025</p>
        <p><strong>Order ID:</strong> #INV-102938</p>
      </div>

      {/* Table */}
      <table className="w-full border border-gray-300 mb-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border">Product</th>
            <th className="text-left px-4 py-2 border">Qty</th>
            <th className="text-left px-4 py-2 border">Price</th>
            <th className="text-left px-4 py-2 border">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">Bluetooth Headphone</td>
            <td className="px-4 py-2 border">2</td>
            <td className="px-4 py-2 border">$30.00</td>
            <td className="px-4 py-2 border">$60.00</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Wireless Mouse</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">$20.00</td>
            <td className="px-4 py-2 border">$20.00</td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div className="text-right space-y-1">
        <p><strong>Subtotal:</strong> $80.00</p>
        <p><strong>Shipping:</strong> $5.00</p>
        <p><strong>Total:</strong> $85.00</p>
      </div>

      {/* Thank You */}
      <div className="mt-10 text-center">
        <p>Thank you for your purchase!</p>
      </div>
    </div>
  );
};

export default OrderDetails;
