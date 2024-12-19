import Api from '../Api';

export const verifyJWT = async() => {
    try {
        const response = await Api.get('/api/v1/auth/verifyJWT');
        const isVerified = await response.data;

        console.log('verified JWT: ',isVerified);

        // Check 
        if (isVerified.isLoggedIn === true) {
            return { isLoggedIn: true, userID: isVerified.userID };
        } else {
            return { isLoggedIn: false, error: 'Token has expired' };
        }
    } catch (error) {
        // Handle cases where jwtDecode fails (invalid token)
        return { isLoggedIn: false, error: 'Invalid token' };
    }
}   
