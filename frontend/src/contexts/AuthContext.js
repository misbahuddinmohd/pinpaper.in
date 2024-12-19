import React, { createContext, useState, useEffect, useContext } from 'react';
import { verifyJWT } from '../utils/Auth'; // Utility to verify token if needed

const AuthContext = createContext();

// Hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        userID: null,
        authLoading: true,
    });

    const verifyToken = async () => {
        try {
            const isVerified = await verifyJWT();
            console.log('verified token: ', isVerified);
            if (isVerified.isLoggedIn === true) {
                setAuthState({ isLoggedIn: true, userID: isVerified.userID, authLoading: false });
            } else {
                setAuthState({ isLoggedIn: false, userID: null, authLoading: false }); // Handle case where token is invalid
            }
        } catch (err) {
            console.error('Token verification failed:', err);
            setAuthState({ isLoggedIn: false, userID: null, authLoading: false }); // Ensure authLoading is updated
        }
    };
    

    useEffect(() => {
        verifyToken();
    },[]);

    if (authState.authLoading) {
        return <div>Loading...</div>; // Or use a proper <LoadingScreen />
    }

    return (
        <AuthContext.Provider value={{ ...authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
