const idGeneration = require('../utils/idGeneration');

const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    operatorID: {
        type: String,
        required: true
    },
    orderID: {
        type: String,
        unique: true
    },
    articleIDs: {
        type: [String],
        required: true,
        unique: true
    },
    noOfServices: {
        type: Number,
        required: true
    },
    callBeforePrint: {
        type: String,
        required: true,
        enum: ["Yes", "No"]
    },
    // deliveryOption: {
    //     type: String,
    //     required: true,
    //     enum: ['tbd', 'Self', '3rdParty']  // Add delivery options as per requirement
    // },
    deliveryTypeID: {   // LATER REMOVE THIS, COZ PRESENT IN OrderDeliveryDetails
        type: String,
        required: true
    },
    orderAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed']
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['requested', 'processing', 'completed', 'rejected']
    }
}, {
    timestamps: true  // Automatically add createdAt and updatedAt fields
});

OrdersSchema.pre('save', async function (next) {
    if(!this.orderID){
        try {
            this.orderID = await idGeneration.generateOrderID(this.userID);
        } catch(err) {
            return next(err);
        }
    }
    next();
});

const Orders = mongoose.model('Orders', OrdersSchema);




const FileSchema = new mongoose.Schema({
    cid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    noOfPages: {
        type: Number,
         required: true
    },
    type: {         // e.g., "application/pdf"
        type: String,
        required: true,
    }         
}, { _id: false });

const OrderArticlesSchema = new mongoose.Schema({
    userID: {
        type: String
    },
    articleID: {
        type: String,
        unique: true
    },
    serviceID: {
        type: Number,
        required: true,
    },
    // files: {
    //     type: Map,
    //     of: new mongoose.Schema({
    //         type: Map,
    //         of: Number
    //     }, { _id: false }),
    //     required: true
    // },
    filesDetails: {
        type: [FileSchema],
        required: true
    },
    filesUri: {
        type: [String],  // Assuming this is an array of file URIs
        required: true
    },
    noOfPages: {
        type: Number,
        required: true
    },
    noOfCopies: {
        type: Number,
        required: true
    },
    printColor: {
        type: String,
        required: true,
        enum: ['BW', 'Color', 'BWandColorMix']
    },
    bwPageNos: {      // remove this, write logic (total - color)
        type: String
    },
    colorPagesNos: {
        type: [Number]
    },
    printSides: {
        type: String,
        required: true,
        enum: ['singleSide', 'bothSides']
    },
    note: {
        type: String,
    },
    articleAmount: {
        type: Number,
        required: true
    },
    articleStatus: {
        type: String,
        required: true,
        enum: ['inCart', 'ordered'],
        default: 'inCart'
    }
}, {
    discriminatorKey: 'articleType',
    timestamps: true  // Automatically add createdAt and updatedAt fields
});

OrderArticlesSchema.pre('save', async function (next) {  // Change to a regular function
    if (!this.articleID) {
        try {
            this.articleID = await idGeneration.generateArticleID();
        } catch (err) {
            return next(err); // Pass the error to Mongoose
        }
    }
    next();
});

const OrderArticles = mongoose.model('OrderArticles', OrderArticlesSchema);



module.exports = {
    Orders,
    OrderArticles
};
