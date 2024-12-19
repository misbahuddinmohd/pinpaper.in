// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';

// // Create the context
// const UserContext = createContext();

// // Custom hook to use UserContext
// export const useUser = () => {
//   return useContext(UserContext);
// };

// // Provider component
// export const UserProvider = ({ children }) => {
//   const { isLoggedIn, userID } = useAuth();
//   const [user, setUser] = useState(null);
//   const [address, setAddress] = useState(null);

//   // Fetch user data from the backend
//   const fetchUserData = async () => {
//     if (!isLoggedIn) return;

//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/v1/user`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUser(data.data);
//         // setAddress(data.data); 
//       } else {
//         console.error('Failed to fetch user data:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   // Fetch address separately if needed
//   const fetchUserAddress = async () => {
//     if (!isLoggedIn) return;

//     if (address) return address; // Return cached address if available

//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/v1/user/getAddress`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('address: ', data);
//         setAddress(data.address);
//         return data.address;
//       } else {
//         console.error('Failed to fetch address:', response.status);
//         return null;
//       }
//     } catch (error) {
//       console.error('Error fetching address:', error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     fetchUserData(); // Fetch user data on component mount
//   }, []);

//   // Context value
//   const value = {
//     user,
//     address,
//     setUser,
//     fetchUserAddress
//     };

//   return <UserContext.Provider value={value}> {children}  </UserContext.Provider>;
// };








// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';
// import Api from '../Api';

// // Create the context
// const UserContext = createContext();

// // Custom hook to use UserContext
// export const useUser = () => {
//   return useContext(UserContext);
// };

// // Provider component
// export const UserProvider = ({ children }) => {
//   const { isLoggedIn, userID } = useAuth();
//   const [user, setUser] = useState(null);
//   const [address, setAddress] = useState(null);

//   // Fetch user data from the backend
//   const fetchUserData = async () => {
//     if (!isLoggedIn) return;

//     try {
//       // const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/v1/user`, {
//       //   method: 'GET',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       // });

//       const response = await Api.get('/api/v1/user/getUser');

//       if (response.status === 200) {
//         const data = await response.data.data;
//         console.log("user context- user data",data);
//         setUser(data);
//       } else {
//         console.error(`Failed to fetch user data: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error fetching user data from /api/v1/user:', error);
//     }
//   };

//   // Fetch address separately if needed
//   const fetchUserAddress = async () => {
//     if (!isLoggedIn) return null; // Do not fetch if logged out
//     // if (address) return address; // Return cached address if available

//     try {
//       // const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/v1/user/getAddress`, {
//       //   method: 'GET',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       // });

//       const response = await Api.get('/api/v1/user/getAddress');

//       if (response.status === 200) {
//         const data = await response.data;
//         console.log('Fetched address:', data);
//         setAddress(data.address);
//         return data.address;
//       } else {
//         console.error(`Failed to fetch address: ${response.status}`);
//         return null;
//       }
//     } catch (error) {
//       console.error('Error fetching address from /api/v1/user/getAddress:', error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchUserData();
//     } else {
//       setUser(null); // Clear user data when logged out
//       setAddress(null); // Clear address when logged out
//     }
//   }, [isLoggedIn]);

//   // Context value
//   const value = {
//     user,
//     address,
//     setUser,
//     fetchUserAddress,
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };





import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Api from '../Api';

// Create the context
const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
  const { isLoggedIn, authLoading } = useAuth();
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);

  // Fetch user data from the backend
  const fetchUserData = async () => {
    if (!isLoggedIn) return;

    try {
      const response = await Api.get('/api/v1/user/getUser');
      if (response.status === 200) {
        const data = response.data.data;
        console.log("user context - user data", data);
        setUser(data);
      } else {
        console.error(`Failed to fetch user data: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data from /api/v1/user:', error);
    }
  };

  // Fetch address separately if needed
  const fetchUserAddress = async () => {
    if (!isLoggedIn) return null; // Do not fetch if logged out

    try {
      const response = await Api.get('/api/v1/user/getAddress');
      if (response.status === 200) {
        const data = response.data;
        console.log('Fetched address:', data);
        setAddress(data.address);
        // return data.address;
      } else {
        console.error(`Failed to fetch address: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching address from /api/v1/user/getAddress:', error);
      return null;
    }
  };

   // Refresh address function
   const refreshUserAddress = async () => {
    await fetchUserAddress();  // Re-fetch the address and update context
  };

  // Automatically fetch user data when user logs in
  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      fetchUserData();
    }
  }, [authLoading, isLoggedIn]);

  // Automatically fetch user address data when user logs in
  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      fetchUserAddress();
    }
  }, [authLoading, isLoggedIn]);


  return (<UserContext.Provider
    value={{
      user,
      address,
      setUser,
      setAddress,
      refreshUserAddress
    }}
  >
    {children}
  </UserContext.Provider>
  );


};
