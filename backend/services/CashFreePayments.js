const Cashfree = require('cashfree-pg');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

// Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
// Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
// Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

// async function createOrder() {
//     var request = {
//         "order_amount": "100",
//         "order_currency": "INR",
//         "customer_details": {
//             "customer_id": "node_sdk_test",
//             "customer_name": "",
//             "customer_email": "misbahuddinsaudagar@gmail.com",
//             "customer_phone": "+917993924730"
//         },
//         "order_meta": {
//             "return_url": "https://test.cashfree.com/pgappsdemos/return.php?order_id=order_123"
//         },
//         "order_note": "sample"
//     }

//     Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {
//         var a = response.data;
//         console.log(a);
//         return a;
//     })
//     .catch((error) => {
//         console.error('Error setting up order request:', error.response.data);
//     });
// }



async function createOrder() {
    const url = 'https://sandbox.cashfree.com/pg/orders';

     // Headers with API credentials
     const headers = {
        'x-client-id': process.env.CASHFREE_CLIENT_ID,
        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
        'x-api-version': '2023-08-01', // You can change this based on your API version
    };
    
    // Prepare the request body
    const requestBody = {
        order_amount: "1",
        order_currency: "INR",
        customer_details: {
            customer_id: "test_usr_1",
            customer_name: "Test User",
            customer_email: "example@gmail.com",
            customer_phone: "9999999999",
        },
        order_meta: {
            return_url: "https://test.cashfree.com/pgappsdemos/return.php?order_id=order_123",
        },
        order_note: "Sample order note",
    };


    try {
        // Make the POST request
        const response = await axios.post(url, requestBody, { headers });
        
        // Log the response
        console.log('Order creation response:', response.data);
        return response.data; // You can return or handle the response as needed
    } catch (error) {
        console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
}








module.exports = {
    createOrder
}