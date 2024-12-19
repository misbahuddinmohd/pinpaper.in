const mongoose =  require('mongoose');


const verifyMobileOTPSchema = new mongoose.Schema({
    userMobNumber: {
        type: String,
        required: true,
        unique: true
    },
    currentOTP: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const verifyMobileOTPs = mongoose.model('verifyMobileOTPs', verifyMobileOTPSchema);

module.exports = {
    verifyMobileOTPs
}