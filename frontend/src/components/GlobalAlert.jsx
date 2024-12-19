// // src/components/GlobalAlert.js

// import React from 'react';
// import { useAlert } from '../contexts/AlertContext';

// const GlobalAlert = () => {
//   const { alert } = useAlert();

//   if (!alert.visible) return null;

//   return (
//     <div
//     className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 md:p-6 max-w-xs sm:max-w-sm w-full sm:w-auto rounded shadow-lg text-white ${
//         alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'
//       }`}
//     >
//       {alert.message}
//     </div>
//   );
// };

// export default GlobalAlert;





import React from 'react';
import { useAlert } from '../contexts/AlertContext';

const GlobalAlert = () => {
  const { alert, showAlert } = useAlert();

  if (!alert.visible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 md:p-6 max-w-xs sm:max-w-sm w-full sm:w-auto rounded shadow-lg text-white ${
        alert.type === 'error'
          ? 'bg-red-500'
          : alert.type === 'success'
          ? 'bg-green-600'
          : alert.type === 'info'
          ? 'bg-blue-600'
          : 'bg-yellow-500'
      }`}
    >
      <div className="flex justify-between items-center">
        <span>{alert.message}</span>
        <button
          className="ml-4 text-white hover:text-gray-200"
          onClick={() => showAlert('', '', 0)} // Clear the alert
          aria-label="Close alert"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default GlobalAlert;
