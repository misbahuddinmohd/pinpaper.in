async function generateOTP(length = 4, alphanumeric = false) {
    if (length < 4) {
        throw new Error("Length of OTP must be above 3");
    }

    const numericChars = '0123456789';
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characters = alphanumeric ? alphanumericChars : numericChars;

    let otp = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters[randomIndex];
    }

    return otp;
}

module.exports = {
    generateOTP
}