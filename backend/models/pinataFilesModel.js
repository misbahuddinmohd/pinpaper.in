const mongoose = require('mongoose');

const pinataFilesSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    orderID: {
        type: String,
        required: true,
        unique: true
    },
    filesCids: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

const PinataFiles = mongoose.model('PinataFiles', pinataFilesSchema);

module.exports = PinataFiles;