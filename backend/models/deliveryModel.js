const mongoose = require('mongoose');

const deliveryTypeSchema = new mongoose.Schema({
    deliveryTypeID: {
        type: String,
        required: true,
        unique: true
    },
    deliveryTypeName:{
        type: String,
        require: true
    },
    deliveryTypeDesc: {
        type: String,
        required: true
    },
    deliveryTypeTime: { // in days
        type: Number,
        required: true,
    },
    deliveryTypePrice: {
        type: String,
        required: true 
    }
}); 

const DeliveryTypes = mongoose.model('DeliveryTypes', deliveryTypeSchema);




const addressSchema = new mongoose.Schema({
    userStreet: {
        type: String,
        required: true
    },
    userLandmark: {
        type: String
    },
    userCity: {
        type: String,
        required: true
    },
    userState: {
        type: String,
        required: true
    },
    userPincode: {
        type: String,
        required: true
    },
    userGmapUrl: {
        type: String,
        required: true
    }
}, { _id: false });

const orderDeliveryDetailsSchema = new mongoose.Schema({
    orderID: {  // foreign key, refers to orderID in Orders collections
        type: String,
        required: true
    },
    deliveryTypeID: {
        type: String,
        required: true
    },
    // add an orderBokedDate
    orderDeliveryDate: {
        type: Date,
        required: true
    },
    pickupAddressIDFromUsersAddress: {
        type: String,
        required: true
    },
    dropAddress: {
        type: addressSchema
    },
    deliveryStatus: {
        type: String,
        required: true,
        enum: ['requested', 'dispatched', 'on the way']
    }
});

const OrderDeliveryDetails = mongoose.model('OrderDeliveryDetails', orderDeliveryDetailsSchema);




module.exports = {
    DeliveryTypes,
    OrderDeliveryDetails
}