import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, MapPin, CreditCard, Clock } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state.orderData || {};

  console.log("order success: ", orderDetails);
  
//   const {
//     orderId = orderDetails.orderID || '#000000',
//     totalAmount = orderDetails.orderAmount || 0,
//     items = [],
//     shippingAddress = {},
//     paymentMethod = 'Not specified',
//     estimatedDelivery = 'Not available'
//   };
// const orderID = orderDetails.orderID || '#000000';

  const {
    orderID = '#000000',
    orderAmount = 0,
    items = [],
    shippingAddress = {},
    paymentMethod = 'Not specified',
    estimatedDelivery = 'Not available'
  } = orderDetails;

  return (
    <div className="min-h-screen bg-gray-50 mt-16 p-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Order Successfully Placed!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
           The order is submitted. Payment Gateway is yet to be integrated. You can see your order in Orders page
            {/* Thank you for your order. We'll send you shipping confirmation soon. */}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </h2>
            <p className="text-sm text-gray-600">Order ID: {orderID}</p>
          </div>
          <div className="px-6 py-4">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 flex justify-between items-center">
                <dt className="font-medium text-gray-500">Total Amount</dt>
                <dd className="text-gray-900 font-semibold">${orderAmount.toFixed(2)}</dd>
              </div>
              <div className="py-4 flex justify-between items-center">
                <dt className="font-medium text-gray-500 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment Method
                </dt>
                <dd className="text-gray-900">{paymentMethod}</dd>
              </div>
              <div className="py-4 flex justify-between items-center">
                <dt className="font-medium text-gray-500 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Estimated Delivery
                </dt>
                <dd className="text-gray-900">{estimatedDelivery}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Items Card */}
        {items.length > 0 && (
          <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Items Ordered
              </h2>
            </div>
            <div className="px-6 py-4">
              <ul className="divide-y divide-gray-200">
                {items.map((item, index) => (
                  <li key={index} className="py-4 flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-gray-900 font-semibold">${item.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Shipping Address Card */}
        {shippingAddress && Object.keys(shippingAddress).length > 0 && (
          <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </h2>
            </div>
            <div className="px-6 py-4">
              <address className="not-italic">
                <p className="font-medium">{shippingAddress.name}</p>
                <p className="text-gray-600 mt-1">{shippingAddress.street}</p>
                <p className="text-gray-600">
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                </p>
                <p className="text-gray-600">{shippingAddress.country}</p>
              </address>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={() => navigate('/orders')}
            className="px-3 py-2 flex-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-3 py-2 flex-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Continue booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;