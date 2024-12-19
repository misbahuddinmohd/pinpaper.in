import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FileText, ChevronLeft } from 'lucide-react';

const OrderDetails = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const order = state?.order;

    // Define statuses and their colors
    const statuses = [
        { label: "requested", color: "bg-blue-200" },
        { label: "printing", color: "bg-blue-500" },
        { label: "rejected", color: "bg-red-500" },
        { label: "on the Way", color: "bg-lime-500" },
        { label: "completed", color: "bg-green-500" },
    ];

    // Determine filtered statuses based on order status
    let filteredStatuses = statuses;

    if (order.orderStatus === "rejected") {
        // If rejected, only show up to "rejected"
        filteredStatuses = statuses.filter((status) => ["requested", "rejected"].includes(status.label));
    } else {
        // Exclude "rejected" if the order is not rejected
        filteredStatuses = statuses.filter((status) => status.label !== "rejected");
    }

    // Get the current status index
    const currentStatusIndex = filteredStatuses.findIndex((status) => status.label === order.orderStatus);

    return (
        <div className="mt-16 p-4">
            {/* Back Button */}
            <button
                className="flex items-center mb-6 text-gray-700 hover:text-blue-600 transition-colors duration-300"
                onClick={() => navigate("/orders")}
            >
                <ChevronLeft className="mr-2" />
                <span className="font-medium">Back to Orders</span>
            </button>

            {/* Order Header */}
            <div className="bg-blue-100 p-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                <p className="text-gray-600 mt-2">Order ID: {order.orderID}</p>
            </div>

            {/* Order Summary */}
            <div className="p-4">
                <div>
                    <p className="font-medium text-gray-700">Call Before Print: {order.callBeforePrint || "N/A"}</p>
                    <p className="font-medium text-gray-700">Total Order Price: <span className="font-bold text-xl text-blue-600">₹{order.orderAmount.toFixed(2)}</span></p>
                </div>
            </div>

            <div className="border rounded-lg mt-4 p-4 bg-white shadow-md">
                {/* Order Status Tracking */}
                <div className="">
                    <h3 className="font-semibold text-gray-800 mb-4">Order Status</h3>
                    <div className="relative">
                        {filteredStatuses.slice(0, currentStatusIndex + 1).map((status, index) => (
                            <div key={index} className="flex items-center mb-4">
                                <div className="flex flex-col items-center mr-4">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${status.color} shadow-md`}
                                    >
                                        {index === currentStatusIndex && (
                                            <span className="text-white font-bold">✓</span>
                                        )}
                                    </div>
                                    {index < currentStatusIndex && (
                                        <div className="h-8 w-1 bg-blue-500 mt-1" />
                                    )}
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-900 capitalize">
                                        {status.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Articles Section */}
            {order.articles.length > 0 && 
                <div className="space-y-4 mt-5">
                <h3 className="font-semibold text-gray-800">Items in Order</h3>
                    {order.articles.map((item) => (
                        <div
                            key={item._id}
                            className="border rounded-lg shadow-md bg-white"
                        >
                            <div className="flex p-4">
                                <div className="flex items-center mr-4">
                                    <FileText className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="flex-grow font-medium">
                                    <p className="text-lg font-medium text-gray-900">{item.serviceName}</p>
                                    <p className="text-gray-700">
                                        File(s): {item.filesDetails.map((file, index) => (
                                            <span key={index}>{file.name}</span>
                                        )).reduce((prev, curr) => [prev, <span className='text-blue-600 font-semibold'> | </span>, curr])}
                                    </p>
                                    <p className="text-gray-700">Pages: {item.noOfPages}</p>
                                    <p className="text-gray-700">Print Color: {item.printColor}</p>
                                    <p className="text-gray-700">Copies: {item.noOfCopies}</p>
                                    <p className="text-left text-gray-900">Price: <span className="font-semibold text-blue-600">₹{item.articleAmount.toFixed(2)}</span></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default OrderDetails;
