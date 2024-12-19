import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

const ProtectedRoute =({ children }) => {
    // const { authState } = useContext(AuthContext);
    const { isLoggedIn, authLoading } = useAuth();

    if (authLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;


// import React, { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import AuthContext from '../contexts/AuthContext';

// const ProtectedRoute = () => {
//     const { isLoggedIn } = useContext(AuthContext);

//     // if (isLoading) {
//     //     return <div>Loading...</div>; // Optional spinner or loading state
//     // }

//     return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
