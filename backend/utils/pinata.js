const axios = require('axios');  // Add axios for making HTTP requests
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

exports.getSignedUrl = async (cid) => {
    try {
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const bodyData = {
            url: `https://${process.env.PINATA_GATEWAY_URL}/files/${cid}`,
            expires: 604800,  // 7 days in seconds
            date: unixTimestamp,
            method: "GET"
        };

        // Make the POST request using axios
        const response = await axios.post(
            'https://api.pinata.cloud/v3/files/sign',  // URL for signing the file
            bodyData,  // Data to send in the body
            {
                headers: {
                    Authorization: `Bearer ${process.env.PINATA_JWT}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // console.log("the response is: ", response.data);  // Log the response data (the signed URL)
        return response.data.data;  // Return the signed URL for further use if needed

    } catch (err) {
        console.error(`Error fetching signed URL for CID ${cid}:`, err.response ? err.response.data : err.message);
    }
};