const crypto = require('crypto');

exports.generateOrderID = async (userMobNumber) => {
    const timestamp = Math.floor(Date.now() / 1000).toString(); // e.g., 1633022923
    const mobilePart = userMobNumber.slice(-3);
    // Add a random string for extra uniqueness
    const randomString = crypto.randomBytes(2).toString('hex').toUpperCase(); // Generates 4 characters (hexadecimal)
    return `ORD${mobilePart}${timestamp}${randomString}`;
};


exports.generateOperatorID = async (shopName, operatorMobNumber) => {
    // const timestamp = Math.floor(Date.now() / 1000).toString(); // e.g., 1633022923
    // const mobilePart = userMobNumber.substring(0, 3);
    // Add a random string for extra uniqueness

    // 3 letters of shop name
    const shpNm = shopName.replace(/ /g,'').substring(0, 3).toUpperCase();

    // last 3 numbers of phone number
    const phNm = operatorMobNumber.slice(-3);

    // Add a random string for extra uniqueness
    const randomString = crypto.randomBytes(2).toString('hex').toUpperCase(); // Generates 4 characters (hexadecimal)

    return `OPR${shpNm}${phNm}${randomString}`;
};


exports.generateArticleID = async () => {
    try {
        const length = 8;
        const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
        const randomHex = randomBytes.toString('hex').slice(0, length);
        return `ART-${randomHex}`.toUpperCase();
    } catch (error) {
        console.error('Article ID generation failed:', error);
        throw new Error('Failed to generate Article ID');
    }
};

exports.generateAddressID = async (userMobNumber) => {
    try {
        // const length = 8;
        // const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
        // const randomHex = randomBytes.toString('hex').slice(0, length);
        const mobilePart = userMobNumber.slice(-3);
        const timestamp = Math.floor(Date.now() / 1000).toString();
        return `ADDR${mobilePart}${timestamp}`.toUpperCase();
    } catch (err) {
        console.error('Address ID generation failed:', err);
        throw new Error('Failed to generate Address ID');
    }
};
