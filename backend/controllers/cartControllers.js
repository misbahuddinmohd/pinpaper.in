const { OrderArticles } = require('../models/ordersModel');
const { ProjthesBindingUsrs, spiralBindingUsrs, thermalBindingUsrs, pinThePapersUsrs, Pricings } = require('../models/servicesModel');
const { getSignedUrl } = require('../utils/pinata');
const { getSpiralBindingPrice } = require('../utils/pricing');




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
        articleStatus: 'inCart',
        note: req.body.note,
        outerCoverColor: req.body.outerCoverColor,
        // articleType: req.body.articleType,
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
        const userID = req.userID; // Example hardcoded user ID; ideally, obtain this dynamically
        console.log(req.body);
        if (!req.body.filesDetails || req.body.filesDetails.length === 0) {
            return res.status(404).json({ message: "Files not found" });
        }

        // Determine service type and populate newArticle accordingly
        switch (req.body.articleType) {
            case 'spiralBindingUsrs':
                const spiralDetails = await spiralBindingData(req);

                spiralDetails.userID = userID;
                // spiralDetails.articleStatus = 'inCart';

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






exports.getCartItems = async (req, res) => {
    try {
        // const userID = req.query.userID;
        const userID = req.userID;
        console.log(userID)

        if (!userID) {
            return res.status(400).json({
                status: 'failed',
                message: 'User ID is required.'
            });
        }

        const cartItems = await OrderArticles.find({
            userID: userID,
            articleStatus: { $eq: 'inCart' }
        })
            .select('-__v -_id -userID -filesUri -aricleStatus -createdAt -updatedAt')
            .sort('createdAt');

        // console.log(cartItems);

        res.status(200).json({
            status: 'success',
            data: cartItems
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
};


// later do some data integrity and sanitization
exports.updateCartItem = async (req, res) => {
    try {
        let newArticle;
        const userID = req.userID; // Example hardcoded user ID; ideally, obtain this dynamically
        console.log(req.body);
        if (!req.body.filesDetails || req.body.filesDetails.length === 0) {
            return res.status(404).json({ message: "Files not found" });
        }

        // Determine service type and populate newArticle accordingly
        switch (req.body.articleType) {
            case 'spiralBindingUsrs':
                const spiralDetails = await spiralBindingData(req);


                if (req.body.mode === 'edit') {
                    spiralDetails.userID = userID;
                    spiralDetails.articleID = req.body.articleID;

                    spiralDetails.filesUri = await signUrls(spiralDetails.filesUri);

                    spiralDetails.articleAmount = await getSpiralBindingPrice(req);

                    console.log('inserted data: ',spiralDetails);

                    // later, do some data sanitization and processing
                    newArticle = await OrderArticles.findOneAndUpdate(
                        { userID: spiralDetails.userID, articleID: spiralDetails.articleID },
                        { $set: spiralDetails },
                        { new: true }
                    );

                } else {
                    spiralDetails.userID = userID;

                    spiralDetails.filesUri = await signUrls(spiralDetails.filesUri);

                    spiralDetails.articleAmount = await getSpiralBindingPrice(req);

                    console.log('inserted data: ',spiralDetails);

                    newArticle = await spiralBindingUsrs.create(spiralDetails);
                }

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
                throw new Error('Invalid Article type');
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


        // if (!updatedItem) {
        //     return res.status(404).json({
        //         status: 'failed',
        //         message: 'Item not found or no changes detected.'
        //     });
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
            data: newArticleObject
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const userID = req.userID;
        const articleID = req.query.articleID;
        const deleteItem = await OrderArticles.deleteOne({
            userID: userID,
            articleID: articleID,
            articleStatus: { $eq: 'inCart' }
        })
        res.status(200).json({
            status: 'success',
            data: deleteItem
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
};
