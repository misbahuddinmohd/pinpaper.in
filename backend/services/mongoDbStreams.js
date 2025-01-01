const {Orders} = require('../models/ordersModel');
const redisClient = require("../config/redisClient");

async function monitorChangeStream() {
    console.log("Listening for MongoDB Change Streams...");

    // Start watching the Mongoose model's underlying MongoDB collection
    const changeStream = Orders.watch();

    changeStream.on("change", async (change) => {
        console.log("Change detected:", change);

        // const cacheKey = `mycollection:${change.documentKey._id}`;
        const cacheKey = `orders:${change.fullDocument.userID}`;

        try {
            if (change.operationType === "insert" || change.operationType === "replace") {
                const fullDocument = change.fullDocument;
                console.log("on insert doc". fullDocument);
                // await redisClient.set(cacheKey, JSON.stringify(fullDocument));
                // console.log(`Cache updated for document ID: ${change.documentKey._id}`);

                await redisClient.del(cacheKey);
                console.log(`Cache invalidated for document ID: ${cacheKey}`);
                console.log("hereeeeeeeeeeeeeee");
            } else if (change.operationType === "update") {
                await redisClient.del(cacheKey);
                console.log(`Cache invalidated for document ID: ${change.documentKey._id}`);
            } else if (change.operationType === "delete") {
                await redisClient.del(cacheKey);
                console.log(`Cache deleted for document ID: ${change.documentKey._id}`);
            }
        } catch (error) {
            console.error("Error handling change:", error);
        }
    });

    changeStream.on("error", (error) => {
        console.error("Change stream error:", error);
    });
}

module.exports = monitorChangeStream;
