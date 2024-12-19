// OrdersPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrdersContext';
import { useEdit } from '../contexts/EditContext';
import { FileText, Trash2, FilePenLine, Package, HandPlatter } from 'lucide-react';

// const OrdersPage = () => {
//   const { cartItems, totalPrice, fetchCartItems, removeItemFromCart } = useCart();
//   // const [selectedItem, setSelectedItem] = useState(null);
//   const { setEditItem } = useEdit();
//   const navigate = useNavigate();

//   const servicesComponents = {
//     1: {
//       name: 'Spiral Binding',
//       articleType: 'spiralBindingUsrs'
//     },
//     2: {
//       name: 'Thermal Binding',
//       articleType: 'thermalBinding'
//     },
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, [fetchCartItems]);

//   const handleEditItemClick = (item) => {
//     // setSelectedItem(item);
//     setEditItem(item);
//     navigate(`/services/book?serviceID=${item.serviceID}&mode=edit`);
//   };

//   return (
//     <div className="mt-16 p-4">
//       <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

//       {cartItems.length > 0 ? (
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="border rounded-lg shadow-md bg-white"
//             >
//               <div className="flex p-4">
//                 {/* Left Section: File Symbol */}
//                 <div className="flex items-center mr-4">
//                   <Package className="w-8 h-8 text-blue-600" />
//                 </div>

//                 {/* Middle Section: File Details */}
//                 <div className="flex-grow">
//                   {/* Service Name */}
//                   <p className="text-lg font-medium text-gray-900">{servicesComponents[item.serviceID].name}</p>

//                   {/* File Details */}
//                   <p className="text-gray-700">
//                     File(s): {item.files.map((file, index) => (
//                       <span key={index}>{file.name}</span>
//                     )).reduce((prev, curr) => [prev, <span className='text-blue-600 font-semibold'> | </span>, curr])}
//                   </p>

//                   {/* Other Details */}
//                   <p className="text-gray-700">Pages: {item.noOfPages}</p>
//                   <p className="text-gray-700">Print Color: {item.printColor}</p>
//                   <p className="text-gray-700">Copies: {item.noOfCopies}</p>
//                   <p className="text-left text-gray-900">Price: ₹{item.articleAmount.toFixed(2)}</p>
//                 </div>
//               </div>

//               {/* Bottom Section: Edit and Delete buttons */}
//               {/* <div className="flex border-t-2 border-gray-300 divide-x-2 divide-gray-300">
//                 <button
//                   type="button"
//                   onClick={() => handleEditItemClick(item)}
//                   className="w-1/2 p-3 text-blue-600 hover:text-blue-800 flex justify-center items-center"
//                 >
//                   <FilePenLine className="w-6 h-6 mr-1" />
//                   Edit
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => removeItemFromCart(item.articleID)}
//                   className="w-1/2 p-3 text-red-600 hover:text-red-800 flex justify-center items-center"
//                 >
//                   <Trash2 className="w-6 h-6 mr-1" />
//                   Delete
//                 </button>
//               </div> */}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-gray-600">Your cart is empty.</div>
//       )}
//     </div>
//   );
// };

const OrdersPage = () => {
  const { ordersItems, fetchOrdersItems } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrdersItems();
  }, [fetchOrdersItems]);

  const handleOrderClick = async (orderData) => {
    console.log(orderData.orderID);
    navigate('/orderDetails', {state: {order: orderData}})
    // Add your navigation or further logic here
  };

  return (
    <div className="mt-16 p-4">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

      {ordersItems.length > 0 ? (
        <div className="space-y-4">
          {ordersItems.map((item) => (
            <div
              key={item.orderID}
              className="border rounded-lg shadow-md bg-white cursor-pointer"
              onClick={() => handleOrderClick(item)}
            >
              <div className="flex p-4">
                {/* Left Section: Icon */}
                <div className="flex items-center mr-4">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>

                {/* Middle Section: Order Details */}
                <div className="flex-grow">
                  <p className="text-gray-700 text-sm font-medium">Order ID: {item.orderID}</p>

                  {item.articles.length > 0 ? (
                    <p className="text-gray-700">
                      Service(s):{" "}
                      {item.articles
                        .map((article, idx) => (
                          <span key={idx}>{article.serviceName}</span>
                        ))
                        .reduce((prev, curr) => [prev, " | ", curr])}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">No services listed</p>
                  )}

                  <p className="text-gray-700">Call Before Print ID: {item.callBeforePrint || "N/A"}</p>
                  <p className="text-gray-700 font-semibold">Order Status: {item.orderStatus || "Unknown"}</p>
                  <p className="text-left text-gray-900 font-semibold">
                    Order Price: ₹{item.orderAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-600">No Orders Found.</div>
      )}
    </div>
  );
};

export default OrdersPage;
