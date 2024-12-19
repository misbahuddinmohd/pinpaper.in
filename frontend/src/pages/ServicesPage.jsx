// import React from 'react';
// import { useNavigate } from 'react-router-dom';


// const ServicesPage = () => {
//   // const [selectedService, setSelectedService] = useState(null);
//   const navigate = useNavigate();

//   const handleServiceSelect = (service) => {
//     // setSelectedService(service);
//     navigate(`/services/book?serviceID=${service.id}`);
//   };

//   // Define services after the necessary functions are declared
//   const services = [
//     { id: 1, name: 'Spiral Binding', price: 15 },
//     // { id: 2, name: 'Thermal Binding', price: 20 },
//     // Define other services with their corresponding component
//   ];

//   const renderServiceSelection = () => (
//     <div className="p-4 mt-16">
//       <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
//       <div className="grid grid-cols-2 gap-4">
//         {services.map((service) => (
//           <div
//             key={service.id}
//             className="p-4 border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
//             onClick={() => handleServiceSelect(service)}
//           >
//             <h3 className="font-medium">{service.name}</h3>
//             <p className="text-sm text-gray-600">${service.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );



//   return renderServiceSelection();
// };

// export default ServicesPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    navigate(`/services/book?serviceID=${service.id}`);
  };

  const services = [
    { id: 1, name: 'Spiral Binding', price: 15, image: '/serviceImages/spiralBinding.jpg' },
    // { id: 2, name: 'Thermal Binding', price: 20, image: '/images/thermal-binding.jpg' },
    // Add other services as needed
  ];

  const renderServiceSelection = () => (
    <div className="p-4 mt-16 sm:mt-16 max-w-md mx-auto">
       <h2 className="text-lg sm:text-xl text-center text-gray-800 font-semibold mb-4">Select a Service</h2>
      <div className="space-y-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="overflow-hidden bg-white border border-blue-300 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => handleServiceSelect(service)}
          >
            {/* Image Section */}
            <div className="service-image relative">
              <img 
                src={service.image} 
                alt={`${service.name} Image`} 
                className="w-full h-40 sm:h-48 object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>
            
            {/* Details Section */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
              {/* <p className="text-gray-600 mt-1">Price: <span className="text-gray-900 font-medium">${service.price}</span></p> */}
              <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-semibold">
                Book Now →
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className='m-3 p-2 font-semibold text-lg text-blue-600 text-center'>more services coming soon....</p>
    </div>
  );

  return renderServiceSelection();
};

export default ServicesPage;
