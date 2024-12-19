const twilio = require('twilio')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const {sendOTP, verifyEnteredOTP} = require('../services/fast2sms');
const {Users} = require('../models/userModel');

dotenv.config({ path: '../config.env' });


exports.sendOTP = async (req, res) => {
    try {
        const { to } = req.body;
        if (!to) {
            return res.status(400).json({ status: 'failed', message: "Phone number is required" });
        }

        // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        // const sentOTP = await client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID).verifications.create({ to, channel: "sms" });
        
        const resp = await sendOTP(to);
        console.log(resp);

        if(resp.status !== "success"){
            if(resp.statusCode == 995){
                return res.status(400).json({ status: 'failed', message: "Too many login request. Try again after sometime" });
            }
            return res.status(400).json({ status: 'failed', message: "Failed to send OTP. Try again Later" });
        }

        
        res.status(200).json({
            status: 'success',
            message: resp.data
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};



exports.verifyOTP = async (req, res) => {
    try {
        const { to, code } = req.body;
        let isDtlSetup = false;

        if (!to || !code) {
            return res.status(400).json({ status: 'failed', message: "Phone number and OTP are required" });
        }

        // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        // const verificationCheck = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID).verificationChecks.create({ to, code });
        // verificationCheck.status == "approved"

        const resp = await verifyEnteredOTP(to, code);

        if (resp.status === "success") {
            // Optionally, check if the user exists in your database
            const user = await Users.findOne({userMobNumber: to }); 

            if(user){
                isDtlSetup = user.isDetailSetup;
            }

            // Create a JWT token for the operator
            const token = jwt.sign(
                { userID: to },  // Payload with operator ID and email
                process.env.JWT_SECRET,                               // Secret key from .env
                { expiresIn: '30d' }                                    // Token expiration
            );

            // send the token in cookie
            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,            };
            if (process.env.NODE_ENV === 'production'){
                cookieOptions.secure = true;
                cookieOptions.sameSite = 'None';
            } else {
                cookieOptions.sameSite = 'Strict';
            }

            res.cookie('jwt', token, cookieOptions);

            return res.status(200).json({
                status: 'success',
                userExists: true, // later add logic
                isDetailSetup: isDtlSetup,
                message: resp
            });
        }

        res.status(400).json({
            status: 'failed',
            message: 'Invalid OTP"'
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};



exports.submitDetails = async (req, res) => {
    try {
        const { phone, name, email } = req.body;

        console.log("in submit details");

        if (!phone || !name) {
            return res.status(400).json({ status: 'failed', message: "Phone number and name are required" });
        }

        // Update user details or create a new record if the user doesn't exist
        const updatedUser = await Users.findOneAndUpdate(
            { userMobNumber: phone }, // Find user by phone
            {
                userMobNumber: phone,
                userName: name,
                ...(email && { userEmail: email }), // Only set email if provided
                isDetailSetup: true,
            },
            { upsert: true, new: true } // Create a new record if no match is found
        );

        if (!updatedUser) {
            return res.status(400).json({ status: 'failed', message: "User details not updated" });
        }

        // Successfully updated or created the user
        res.status(200).json({
            status: 'success',
            user: updatedUser,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',
            message: err.message,
        });
    }
};




exports.verifyJWT = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ isLoggedIn: false });
        }

        // Verify token with your JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token is expired
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ isLoggedIn: false });
        }

        res.status(200).json({
            isLoggedIn: true,
            userID: decoded.userID
        });

    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
};


exports.protect = async (req, res, next) => {
    try {
        // 1) Getting token and checking if it's there
        let token;
        if(req.cookies.jwt){
            token = req.cookies.jwt;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                message: 'You are not logged in! Please log in.'
            });
        }

        // 2) Verifying the token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ status: 'failed', message: 'not authorized' });
        }
        //   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // Check if token is expired
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ status: 'failed', message: 'not authorized' });
        }

        // 3) Check if user still exists
        // const currentUser = await Operators.findOne({ operatorID: decoded.operatorID });
        // if (!currentUser) {
        //     return res.status(401).json({
        //         message: 'The user no longer exists.'
        //     });
        // }

        // 4) Check if the user changed the password after the token was issued
        // if (currentUser.changedPasswordAfter(decoded.iat)) {
        //     return res.status(401).json({
        //         message: 'User recently changed password! Please log in again.'
        //     });
        // }
        // GRANT ACCESS TO PROTECTED ROUTE
        req.userID = decoded.userID;
        next();
    } catch (err) {
        next(err); // Pass the error to the global error handler
    }
};

exports.logout = async (req, res) => {
    try {


        const cookieOptions = {
            expires: new Date(0),
            httpOnly: true,            };
        if (process.env.NODE_ENV === 'production'){
            cookieOptions.secure = true;
            cookieOptions.sameSite = 'None';
        } else {
            cookieOptions.sameSite = 'Strict';
        }
        
        res.cookie('jwt', '', cookieOptions);

        // Send a success response
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'failed',
            message: 'Failed to log out. Please try again.',
        });
    }
};
