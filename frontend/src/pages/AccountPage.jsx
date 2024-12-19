// AccountPage.jsx

import Api from '../Api';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const AccountPage = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const response = await Api.get('/api/v1/auth/logout');

    if (response.status === 200) {
      navigate('/');
      window.location.reload(); // Reload the app
    }
  };
  return (
    <div className="p-4 mt-16">
      {/* Back Button */}
      <button
        className="flex items-center mb-6 text-gray-700 hover:text-blue-600 transition-colors duration-300"
        onClick={() => navigate("/")}
      >
        <ChevronLeft className="mr-2" />
        <span className="font-medium">Back</span>
      </button>

      <h2 className="text-xl font-semibold mb-4">My Account</h2>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border rounded-lg shadow-md" onClick={() => { navigate('/account/getUser') }}>
          <h3 className="font-medium mb-1">Profile Information</h3>
          <p className="text-sm text-gray-600">Manage your account details</p>
        </div>
        <div className="p-4 bg-blue-50 border rounded-lg shadow-md" onClick={() => { navigate('/account/getAddress') }}>
          <h3 className="font-medium mb-1">Address Book</h3>
          <p className="text-sm text-gray-600">Manage your delivery addresses</p>
        </div>
      </div>

      {/* Links to Policies */}
      <div className="mt-6 space-y-3">
        <button
          className="block px-4 py-2 text-left w-full bg-blue-50 border rounded-lg hover:bg-blue-100 text-blue-700 hover:text-blue-700 transition-all duration-200 shadow-md"
          onClick={() => navigate('/termsAndConditions')}
        >
          Terms & Conditions
        </button>
        <button
          className="block px-4 py-2 text-left w-full bg-blue-50 border rounded-lg hover:bg-blue-100 text-blue-700 hover:text-blue-700 transition-all duration-200 shadow-md"
          onClick={() => navigate('/cancellationAndRefund')}
        >
          Cancellation & Refund Policy
        </button>
        <button
          className="block px-4 py-2 text-left w-full bg-blue-50 border rounded-lg hover:bg-blue-100 text-blue-700 hover:text-blue-700 transition-all duration-200 shadow-md"
          onClick={() => navigate('/contactUs')}
        >
          Contact Us
        </button>
      </div>

      <button
        className=" bg-blue-600 text-white mt-4 px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-150"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default AccountPage;




// import { useLocation, useNavigate } from 'react-router-dom';

// const AddressPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const returnTo = location.state?.returnTo || '/'; // Default to home if returnTo is not provided

//   const handleAddressSave = () => {
//     // Logic to save the address
//     navigate(returnTo); // Navigate back to the delivery page
//   };

//   return (
//     <div>
//       <h2>Add or Update Address</h2>
//       {/* Form for adding address */}
//       <button onClick={handleAddressSave}>Save Address</button>
//     </div>
//   );
// };

// export default AddressPage;
