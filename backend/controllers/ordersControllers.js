const { OrderArticles, Orders } = require('../models/ordersModel');
const { ProjthesBindingUsrs, spiralBindingUsrs, thermalBindingUsrs, pinThePapersUsrs, Pricings } = require('../models/servicesModel');
const { DeliveryTypes, OrderDeliveryDetails } = require('../models/deliveryModel');
const { getSignedUrl } = require('../utils/pinata');
const { getSpiralBindingPrice } = require('../utils/pricing');
const { createOrder } = require('../services/CashFreePayments');

// Helper function for spiral binding data structure
const spiralBindingData = async (req) => {
    const spiralDetails = {
        serviceID: req.body.serviceID,
        filesDetails: req.body.filesDetails,
        filesUri: req.body.filesUri,
        noOfPages: req.body.noOfPages,
        noOfCopies: req.body.noOfCopies,
        printColor: req.body.printColor,
        bwPageNos: req.body.bwPageNos,
        colorPagesNos: req.body.colorPagesNos,
        printSides: req.body.printSides,
        note: req.body.note,
        outerCoverColor: req.body.outerCoverColor,
        articleType: req.body.articleType,
        articleAmount: req.body.articleAmount
    }
    return spiralDetails;
};

// function to get signed urls from cid
const signUrls = async (filesUriArray) => {
    try {
        const signingPromises = filesUriArray.map(cid => getSignedUrl(cid));
        const signedUrls = await Promise.all(signingPromises);
        return signedUrls;
    } catch (error) {
        console.error("Error signing one of the URLs:", error);
        throw new Error("Failed to sign all URLs");
    }
};


// Main handler for adding to cart
exports.addToCart = async (req, res) => {
    try {
        let newArticle;
        const userID = '7993924730'; // Example hardcoded user ID; ideally, obtain this dynamically
        console.log(req.body);
        if (!req.body.filesDetails || req.body.filesDetails.length === 0) {
            return res.status(404).json({ message: "Files not found" });
        }

        // Determine service type and populate newArticle accordingly
        switch (req.body.articleType) {
            case 'spiralBinding':
                const spiralDetails = await spiralBindingData(req);
 
                spiralDetails.userID = userID;
                spiralDetails.articleStatus = 'inCart';

                // spiralDetails.files = await filesDetails(req.body.files);

                spiralDetails.filesUri = await signUrls(spiralDetails.filesUri);

                spiralDetails.articleAmount = await getSpiralBindingPrice(req);

                console.log(spiralDetails);
                newArticle = await spiralBindingUsrs.create(spiralDetails);
                break;

            case 'thermalBinding':
                // Add thermal binding data handling here
                // e.g., newArticle = await thermalBindingUsrs.create(await thermalBindingData(req));
                break;

            case 'projthesBinding':
                // Add projthes binding data handling here
                break;

            case 'pinThePapers':
                // Add pin the papers data handling here
                break;

            default:
                throw new Error('Invalid service type');
        }

        // Remove userID from response
        // if (newArticle && newArticle.userID) {
        //     delete newArticle.userID;
        // }
        // or
        // Convert to object and exclude userID before sending response
        // if (newArticle) {
        //     newArticle = newArticle.toObject();
        //     delete newArticle.userID;
        // }

        // Ensure newArticle is in object form and remove userID from response
        // if (newArticle && newArticle.toObject) {
        //     newArticle = newArticle.toObject(); // Convert to plain JS object if it's a Mongoose document
        // }
        // if (newArticle && newArticle.userID) {
        //     delete newArticle.userID; // Remove userID field
        // }

        // Convert the document to a plain object and delete unwanted fields
        const newArticleObject = newArticle.toObject();
        delete newArticleObject.__v;
        delete newArticleObject._id;
        delete newArticleObject.userID;
        delete newArticleObject.filesUri;
        delete newArticleObject.articleStatus;
        delete newArticleObject.articleType;
        delete newArticleObject.createdAt;
        delete newArticleObject.updatedAt;

        // Send response
        res.status(200).json({
            status: 'success',
            data: newArticle
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};




exports.submitOrder = async (req, res) => {
    try {
        const orderDetails = {
            userID: req.userID,
            operatorID: 'tbd',
            articleIDs: req.body.items.map(item => item.articleID),
            noOfServices: req.body.items.length,
            callBeforePrint: req.body.callBeforePrint ? 'Yes' : 'No',
            // deliveryOption: 'tbd',
            deliveryTypeID: req.body.deliveryOption.deliveryTypeID,  // LATER REMOVE THIS, COZ PRESENT IN OrderDeliveryDetails
            // later make db call and calculate price explicitly
            orderAmount: req.body.totalPrice,
            paymentStatus: 'pending',
            orderStatus: 'completed'  // for this part of time later logic need to be changed, as paymnet gateway is not integrated
        }

        const submittedOrder = await Orders.create(orderDetails);

        if (!submittedOrder) {
            return res.status(404).json({ status: 'failed', message: 'error submitting order' });
        }

        const orderDeliveryDate = new Date();
        orderDeliveryDate.setDate(orderDeliveryDate.getDate() + 3);  // later calculate this using some logic

        const deliveryDetails = {
            orderID: submittedOrder.orderID,
            deliveryTypeID: submittedOrder.deliveryTypeID,
            // add an orderBokedDate
            orderDeliveryDate, 
            pickupAddressIDFromUsersAddress: req.body.selectedAddress.addressID,
            // drop address is updated later
            deliveryStatus: "requested"
        }
        const orderDelDtls = await OrderDeliveryDetails.create(deliveryDetails);

        if (!orderDelDtls) {
            // delete the above created order
            return res.status(404).json({ status: 'failed', message: 'error submitting order delivery details' });
        }


        // update the status in cart
        const updatedCartStatus = await OrderArticles.updateMany(
            {
                userID: orderDetails.userID,
                articleID: { $in: orderDetails.articleIDs }
            },
            { $set: { articleStatus: 'ordered' } }
        );

        if (!updatedCartStatus) {
            return res.status(404).json({ status: 'failed', message: 'error updating cart' });
        }

        // payment
        const paymentResp = await createOrder();
        console.log(paymentResp);


        res.status(200).json({
            status: 'success',
            data: {
                paymentResp: paymentResp,
                // orderID: submittedOrder.orderID,
                // articleIDs: submittedOrder.articleIDs,
                // noOfServices: submittedOrder.noOfServices,
                // callBeforePrint: submittedOrder.callBeforePrint,
                // orderAmount: submittedOrder.orderAmount,
                // paymentStatus: submittedOrder.paymentStatus,
                // orderStatus: submittedOrder.orderStatus,
                // orderDeliveryDetails: {
                //     orderDeliveryDate: orderDelDtls.orderDeliveryDate,
                //     pickupAddressID: orderDelDtls.pickupAddressIDFromUsersAddress,
                //     deliveryStatus: orderDelDtls.deliveryStatus
                // }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};


exports.getOrders = async (req, res) => {
    try {
        const queryS = {};
        
        // use with auth logic
        //  if(req.query.userID){
        //     queryS.userID = req.query.userID;
        // }else{
        //     return res.status(400).json({ error: 'User ID Not Found' });
        // }
        queryS.userID = req.userID;
        // queryS.userID = '7993924730';
        const allOrders = await Orders.aggregate([
            // Initial match to filter orders early
            { 
                $match: queryS 
            },
            // Single lookup for articles with service filtering built in
            {
                $lookup: {
                    from: 'orderarticles',
                    let: { articleIds: '$articleIDs' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ['$articleID', '$$articleIds'] },
                            }
                        },
                        // Include service lookup within the articles pipeline
                        {
                            $lookup: {
                                from: 'services',
                                localField: 'serviceID',
                                foreignField: 'serviceID',
                                as: 'service'
                            }
                        },
                        // Project only needed fields and map service name
                        {
                            $project: {
                                articleID: 1,
                                serviceID: 1,
                                serviceName: {
                                    $ifNull: [
                                        { $arrayElemAt: ['$service.serviceName', 0] },
                                        'Unknown Service'
                                    ]
                                },
                                filesDetails: 1,
                                noOfPages: 1,
                                noOfCopies: 1,
                                printColor: 1,
                                printSides: 1,
                                articleAmount: 1,
                                note: 1,
                                createdAt: 1
                            }
                        },
                        // Sort articles by createdAt within the lookup
                        { $sort: { createdAt: 1 } }
                    ],
                    as: 'articles'
                }
            },
            
            // Project final order structure
            {
                $project: {
                    _id: 0,  // only _id is allowed for this type of syntax
                    orderID: 1,
                    // noOfServices,
                    callBeforePrint: 1,
                    deliveryTypeID: 1,  // later instead of ID send name
                    orderAmount: 1,
                    orderStatus: 1,
                    createdAt: 1,
                    articles: 1,
                    updatedAt: 1
                }
            },
            
            // Final sort of orders
            { 
                $sort: { createdAt: -1 }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: allOrders
        })
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}







//only for dev, later delete these

exports.priceTest = async (req, res) => {
    try {
        const operatorID = "OPRADMN79939";

        const printColor = req.body.printColor;
        const printSides = req.body.printSides;
        const paperDim = 'A4';
        const paperGSM = req.body.paperGSM || '70GSM';

        const price = await Pricings.findOne({ operatorID });

        // const resprice = price['BW'].get('singleSide').get('A4')["70GSM"];
        const resprice = price.get(printColor).get(printSides).get(paperDim)[paperGSM];

        res.status(200).json({
            status: 'success',
            priceres: resprice,
            data: price
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};

exports.addDeliveryTypes = async (req, res) => {
    try {
        const deliveryTypes = await DeliveryTypes.create({
            deliveryTypeID: "DT1",
            deliveryTypeName: "standard",
            deliveryTypeDesc: "DTD1",
            deliveryTypeTime: 2,
            deliveryTypePrice: 50
        });

        res.status(200).json({
            status: 'success',
            data: deliveryTypes
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};

exports.addOrderDeliveryDetails = async (req, res) => {
    try {
        const deliveryDetails = await OrderDeliveryDetails.create({
            orderID: "abc123",
            deliveryTypeID: "DT1",
            orderDeliveryDate: new Date(),
            pickupAddressIDFromUsersAddress: "ADDR123456",
            dropAddress: {
                userStreet: "malakpet",
                userLandmark: "opp lake",
                userCity: "Hyd",
                userState: "TS",
                userPincode: "500024",
                userGmapUrl: "fgkwhejfejfwefwef"
            },
            deliveryStatus: "requested"
        });

        res.status(200).json({
            status: 'success',
            data: deliveryDetails
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};

