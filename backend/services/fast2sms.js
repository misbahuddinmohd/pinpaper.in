const axios = require('axios'); // Not used, consider removing if unnecessary
const { generateOTP } = require('../utils/OTPGeneration');
const { verifyMobileOTPs } = require('../models/verificationsModel');
const unirest = require("unirest");
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const sendOTP = async (phoneNumber) => {
    try {
        // Generate a 4-digit OTP
        const OTP = await generateOTP(4);

        // Update or insert the OTP in the database
        await verifyMobileOTPs.updateOne(
            { userMobNumber: phoneNumber },
            { userMobNumber: phoneNumber, currentOTP: OTP },
            { upsert: true }
        );

        // Create a promise-based wrapper for unirest
        const sendSMS = () => {
            return new Promise((resolve, reject) => {
                const fast2sms = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

                fast2sms.headers({
                    "authorization": process.env.FAST2SMS_API_KEY // Secure the API key
                });

                fast2sms.form({
                    "variables_values": OTP,
                    "route": "otp",
                    "numbers": phoneNumber.slice(3), // Adjust if number slicing logic changes
                });

                fast2sms.end((res) => {
                    if (res.error) {
                        reject({
                            statusCode: res.body.status_code || 500,
                            message: "Failed to send OTP: " + (res.body.message || "Unknown error"),
                        });
                    } else {
                        resolve({
                            statusCode: res.body.status_code,
                            body: res.body,
                        });
                    }
                });
            });
        };

        // Send the SMS and await the response
        const smsResponse = await sendSMS();
        console.log("OTP sent successfully:", smsResponse);

        // Return success status and SMS response
        return {
            status: "success",
            statusCode: smsResponse.statusCode,
            message: smsResponse.body.message
        };
    } catch (error) {
        console.error("Error in sendOTP:", error.message);

        // Return failed status and error details to the caller
        return {
            status: "failed",
            statusCode: error.statusCode || 500,
            message: error.message || "An error occurred",
        };
    }
};


const verifyEnteredOTP = async (phoneNumber, enteredOTP) => {
    try {
        // Fetch the OTP for the given phone number
        const record = await verifyMobileOTPs.findOne({ userMobNumber: phoneNumber });

        // Check if a record exists
        if (!record) {
            return { success: false, message: "Phone number not found" };
        }

        // Verify the entered OTP
        if (record.currentOTP === enteredOTP) {
            // Optionally clear the OTP after successful verification
            await verifyMobileOTPs.updateOne(
                { userMobNumber: phoneNumber },
                { $unset: { currentOTP: "" } }
            );

            return { status: "success", message: "OTP verified successfully" };
        } else {
            return { status: "failed", message: "Invalid OTP" };
        }
    } catch (error) {
        console.error("Error in verifyOTP:", error.message);
        return { status: "failed", message: "An error occurred during OTP verification" };
    }
};

module.exports = { sendOTP, verifyEnteredOTP };
