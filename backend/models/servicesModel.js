const mongoose = require('mongoose');
const { OrderArticles } = require('./ordersModel');

// Services
const ServicesSchema = new mongoose.Schema({
    serviceID: {
        type: Number,
        required: true,
        min: [1, 'service Id should be greater than 1']
    },
    serviceName: {
        type: String,
        required: true
    },
    serviceDescription: {
        type: String,
        required: false
    },
    oprCollectionName: {
        type: String,
        required: true
    },
    usrCollectionName: {
        type: String,
        required: true
    },
    oprTemplate: {
        type: String,
        required: true
    },
    usrTemplate: {
        type: String,
        required: true
    },
    articleType: {
        type: String,
        required: true
    }
});

const Services = mongoose.model('Services', ServicesSchema);



// services prices
const servicesPricesSchema = new mongoose.Schema({
    accountID: {
        type: String,
        required: true
    },
    individualBWPerPage: {
        type: Number,
        required: true
    },
    individualColorPerPage: {
        type: Number,
        required: true
    },
    spiralBinding: {
        type: Number,
        required: true
    }
});

const ServicesPrices = mongoose.model('ServicesPrices', servicesPricesSchema);



// services tracking
const servicesTrackingsSchema = new mongoose.Schema({
    operatorID: {
        type: String,
        required: true
    },
    serviceID: {
        type: Number,
        required: true,
        min: [1, 'service Id should be greater than 1']
    },
    isOpted: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    },
    isActive: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    }
}, {
    timestamps: true
});

const ServicesTrackings = mongoose.model('ServicesTrackings', servicesTrackingsSchema);











// Pricing schema
const pricingSchema = new mongoose.Schema({
    operatorID: {
        type: String
    },
    BW: {
        type: Map,
        of: new mongoose.Schema({
            type: Map,
            of: new mongoose.Schema({
                type: Map,
                of: Number
            }, { _id: false })
        }, { _id: false }),
        required: true
    },
    Color: {
        type: Map,
        of: new mongoose.Schema({
            type: Map,
            of: new mongoose.Schema({
                type: Map,
                of: Number
            }, { _id: false })
        }, { _id: false }),
        required: true
    },
    spiralBindingPrice: {
        type: Number,
        required: true
    },
    thermalBindingPrice: {
        type: Number,
        required: true
    },
    projthesBindingPrice: {
        type: Number,
        required: true
    }
});

const Pricings = mongoose.model('Pricings', pricingSchema);











// custom services models

const projthesBindingUsrSchema = mongoose.Schema({
    paperGSM: {
        type: Number,
        required: true,
        enum: [70, 75, 80, 85, 90]
    }
});

const ProjthesBindingUsrs = OrderArticles.discriminator('ProjthesBindingUsrs', projthesBindingUsrSchema);


const spiralBindingUsrSchema = mongoose.Schema({
    outerCoverColor: {
        type: String,
        default: 'any',
        enum: ['any', 'white', 'green', 'blue', 'purple', 'red', 'orange', 'yellow', 'black']
    }
});

const spiralBindingUsrs = OrderArticles.discriminator('spiralBindingUsrs', spiralBindingUsrSchema);


const thermalBindingUsrSchema = mongoose.Schema({
    outerCoverColor: {
        type: String,
        default: 'white',
        enum: ['white', 'green', 'blue', 'purple', 'red', 'orange', 'yellow', 'black']
    }
});

const thermalBindingUsrs = OrderArticles.discriminator('thermalBindingUsrs', thermalBindingUsrSchema);


const pinThePapersUsrSchema = mongoose.Schema({
    pinningType: {
        type: String,
        enum: ['1 pin on top-left', '2 pins on left']
    }
});

const pinThePapersUsrs = OrderArticles.discriminator('pinThePapersUsrs', pinThePapersUsrSchema);











// templates model
const servicesTemplatesSchema = mongoose.Schema({
    serviceID: {
        type: String,
        required: true
    },
    oprTemplate: {
        type: String,
        required: true
    },
    usrTemplate: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ServicesTemplates = mongoose.model('ServicesTemplates', servicesTemplatesSchema);



module.exports = {
    Services,
    ServicesPrices,
    ServicesTrackings,

    Pricings,
    ProjthesBindingUsrs,
    spiralBindingUsrs,
    thermalBindingUsrs,
    pinThePapersUsrs,

    ServicesTemplates
};