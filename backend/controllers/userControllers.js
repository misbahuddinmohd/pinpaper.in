const { Users, UsersAddress } = require('../models/userModel');


exports.getAddress = async (req, res) => {
    try {
        const userID = req.userID;

        if (!userID) {
            return res.status(400).json({
                status: 'failed',
                message: 'User ID is required.'
            });
        }

        const retAddress = await UsersAddress.find({
            userMobNumber: userID
        })
            .select('-__v -_id')
            .sort('createdAt');
        console.log(retAddress);

        res.status(200).json({
            status: 'success',
            address: retAddress
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        // const userID = '7993924730';
        const userID = req.userID;

        if (!userID) {
            return res.status(400).json({
                status: 'failed',
                message: 'User ID is required.'
            });
        }

        const user = await Users.findOne({
            userMobNumber: userID
        })
            .select('-__v -_id');

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
};

// exports.addAddress = async (req, res) => {
//     try {
//         // const userID = '7993924730';
//         const userID = req.userID;

//         // later do data sanitizations and validations
//         const addrData = req.body;
//         addrData.userMobNumber = userID;
//         const address = await UsersAddress.create(addrData);
//         res.status(200).json({
//             status: 'success',
//             data: address
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'failed',
//             message: err.message
//         });
//     }
// };

exports.addAddress = async (req, res) => {
    const { userStreet, userLandmark, userCity, userState, userPincode, userGmapUrl } = req.body;
    const userID = req.userID;
    try {
        // Validate user ID
        if (!userID) {
            return res.status(401).json({ status: 'failed', message: 'User ID is required for adding an address.' });
        }

        // Validate required fields
        if (!userStreet || !userCity || !userState || !userPincode || !userGmapUrl) {
            return res.status(400).json({ status: 'failed', message: "All required fields must be provided." });
        }

        // Create new address
        const newAddress = {
            userMobNumber: userID,
            userStreet,
            userLandmark,
            userCity,
            userState,
            userPincode,
            userGmapUrl,
        };

        const address = await UsersAddress.create(newAddress);
        if (!address) {
            return res.status(500).json({ status: 'failed', message: "Failed to create address. Please try again later." });
        }
        res.status(200).json({
            status: 'success',
            data: address
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
};

exports.updateAddress = async (req, res) => {
    const { addressID, userStreet, userLandmark, userCity, userState, userPincode, userGmapUrl } = req.body;
    const userID = req.userID;

    try {
        // Validate user ID
        if (!userID) {
            return res.status(401).json({ status: 'failed', message: 'User ID is required for updating an address.' });
        }

        // Validate required fields
        if (!addressID) {
            return res.status(400).json({ status: 'failed', message: 'Address ID is required.' });
        }

        // Define the fields to update
        const updateFields = {};
        if (userStreet) updateFields.userStreet = userStreet;
        if (userLandmark) updateFields.userLandmark = userLandmark;
        if (userCity) updateFields.userCity = userCity;
        if (userState) updateFields.userState = userState;
        if (userPincode) updateFields.userPincode = userPincode;
        if (userGmapUrl) updateFields.userGmapUrl = userGmapUrl;

        // Update the address using findOneAndUpdate
        const updatedAddress = await UsersAddress.findOneAndUpdate(
            { addressID: addressID, userMobNumber: userID }, // Match criteria
            { $set: updateFields }, // Fields to update
            { new: true } // Return the updated document
        );

        if (!updatedAddress) {
            return res.status(404).json({ status: 'failed', message: 'Address not found.' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Address updated successfully.',
            data: updatedAddress
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            message: err.message || 'Internal Server Error'
        });
    }
};

exports.deleteAddress = async (req, res) => {
    const  addressID = req.params.addressID;
    const userID = req.userID;

    try {
        // Validate user ID
        if (!userID) {
            return res.status(401).json({ status: 'failed', message: 'User ID is required for updating an address.' });
        }

        // Validate required fields
        if (!addressID) {
            return res.status(400).json({ status: 'failed', message: 'Address ID is required.' });
        }

        // Update the address using findOneAndUpdate
        const deletedAddress = await UsersAddress.deleteOne(
            { addressID: addressID, userMobNumber: userID }
        );

        if (!deletedAddress) {
            return res.status(404).json({ status: 'failed', message: 'Address not found.' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Address updated successfully.',
            data: deletedAddress
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            message: err.message || 'Internal Server Error'
        });
    }
};



exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const phone = req.userID;

        console.log("In UPDATE USER");

        if (!phone || !name) {
            return res.status(400).json({
                status: 'failed',
                message: "Phone number and name are required",
            });
        }

        // Update user details or create a new record if the user doesn't exist
        const updatedUser = await Users.findOneAndUpdate(
            { userMobNumber: phone }, // Find user by phone
            {
                $set: {
                    userName: name,
                    ...(email && { userEmail: email }), // Only set email if provided
                }
            },
            {
                upsert: true,
                new: true, // Return the updated document
            }
        );

        console.log(updatedUser)

        if (!updatedUser) {
            return res.status(400).json({
                status: 'failed',
                message: "User details not updated",
            });
        }

        // Respond with the updated user details
        res.status(200).json({
            status: 'success',
            user: {
                name: updatedUser.userName,
                email: updatedUser.userEmail,
                phone: updatedUser.userMobNumber,
            },
        });
    } catch (err) {
        console.log("Error in updateUser:", err.message);
        res.status(500).json({
            status: 'failed',
            message: "An error occurred while updating user details",
        });
    }
};
