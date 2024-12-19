const axios = require('axios');  // Add axios for making HTTP requests
const dotenv = require('dotenv');
const PinataFiles = require('../models/pinataFilesModel');
const PinataSDK = require('pinata').PinataSDK;
// import { PinataSDK } from 'pinata';

dotenv.config({ path: '../config.env' });

const getSignedUrl = async (cid) => {
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

        console.log(response.data);  // Log the response data (the signed URL)
        return response.data;  // Return the signed URL for further use if needed

    } catch (err) {
        console.error(`Error fetching signed URL for CID ${cid}:`, err.response ? err.response.data : err.message);
    }
};

exports.getFiles = async (req, res) => {
    const orderID = req.params.id;

    try {
        // Fetch the CIDs from MongoDB based on orderID
        const filesData = await PinataFiles.findOne({ orderID });

        if (!filesData) {
            return res.status(404).json({ message: "Files not found for the provided order ID" });
        }

        const cids = filesData.filesCids;
        console.log("CIDs: ", cids);

        // Generate signed URLs for all CIDs using Promise.all
        const signedUrls = await Promise.all(
            cids.map(cid => getSignedUrl(cid))  // Map each CID to get its signed URL
        );

        res.status(200).json({ signedUrls });  // Send the signed URLs back to the client

    } catch (error) {
        console.error(`Error fetching files for orderID ${orderID}:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
};





exports.getFilesFromPinata = async (req, res) => {
    try {
        const filesUris = req.body.filesUris;

        const pinata = new PinataSDK({
            pinataJwt: process.env.PINATA_JWT,
            pinataGateway: process.env.PINATA_GATEWAY_URL,
        });

        // const data = await pinata.gateways.get("bafybeig2ycbymbepocwe33kfvjrlmn757kuupitbvfjiilo62zaq4qb2me");
        // console.log(data);


        const files = [];
        for (const fileCid of filesUris) {
            const { data, contentType } = await pinata.gateways.get(fileCid);
            

            if (data instanceof Blob) {
                // Convert Blob data to a File, using a generic name if unavailable
                const fileName = `file`;
                files.push(new File([data], fileName, { type: contentType }));
            } else {
                console.warn(`Expected Blob data but received ${typeof data} for CID: ${fileCid}`);
            }
        }

        res.status(200).json({
            message: "success",
            datas: files
        });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(400).json({
            message: "failure",
            err: error
        })
    }
};