// // HomePage.jsx
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//     const navigate = useNavigate();
  
//     return (
//       <div className="p-4 mt-16">
//         <h2 className="text-xl font-semibold mb-4">Welcome to PinPaper</h2>
//         <div className="grid gap-4">
//           <div className="p-4 bg-blue-50 rounded-lg">
//             <h3 className="font-medium mb-2">Quick Print</h3>
//             <p className="text-sm text-gray-600">Start a new print order now</p>
//             <button 
//               className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
//               onClick={() => navigate('/services')}
//             >
//               Book Service
//             </button>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <h3 className="font-medium mb-2">Recent Orders</h3>
//             <p className="text-sm text-gray-600">View your order history</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

// export default HomePage;



// import React from "react";

// const HomePage = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen text-gray-800">
//       {/* Header Section */}
//       <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-12 px-6 text-center">
//         <h1 className="text-4xl font-bold mb-4">Welcome to Pinpaper.in</h1>
//         <p className="text-lg mb-6">
//           Effortlessly upload, print, and get your documents delivered to your
//           doorstep.
//         </p>
//         <button className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-md hover:bg-gray-200">
//           Get Started
//         </button>
//       </header>

//       {/* Why Choose Us Section */}
//       <section className="py-16 px-6">
//         <h2 className="text-2xl font-bold text-center mb-8">
//           Why Choose Pinpaper.in?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-md text-center">
//             <h3 className="text-xl font-semibold mb-4">
//               Effortless Document Upload
//             </h3>
//             <p>Easily upload files in just a few clicks.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md text-center">
//             <h3 className="text-xl font-semibold mb-4">
//               Local Printing Partners
//             </h3>
//             <p>Support trusted nearby operators for fast service.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md text-center">
//             <h3 className="text-xl font-semibold mb-4">Doorstep Delivery</h3>
//             <p>Professional-quality prints delivered to your location.</p>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="bg-gray-100 py-16 px-6">
//         <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
//         <ol className="list-decimal list-inside space-y-4 max-w-xl mx-auto">
//           <li>
//             <strong>Upload Documents:</strong> Drag and drop or browse to upload
//             your files.
//           </li>
//           <li>
//             <strong>Choose Your Printer:</strong> Select a trusted local
//             operator for speedy service.
//           </li>
//           <li>
//             <strong>Confirm & Deliver:</strong> Relax while your prints are
//             delivered to your doorstep.
//           </li>
//         </ol>
//       </section>

//       {/* Call to Action Section */}
//       <section className="py-16 px-6 text-center">
//         <h2 className="text-2xl font-bold mb-6">Start Printing Today!</h2>
//         <button className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-600">
//           Upload Your Documents
//         </button>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-gray-400 py-6 text-center">
//         <p>&copy; 2024 Pinpaper.in | Your Printing Companion</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;






// import React from "react";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Hero Section */}
//       <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 text-center">
//         <h1 className="text-4xl font-bold mb-4">Welcome to PinPaper</h1>
//         <p className="text-lg max-w-2xl mx-auto">
//           Upload your documents, print them at affordable prices, and get them delivered right to your doorstep.
//         </p>
//         <div className="mt-6">
//           <Link
//             to="/services"
//             className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100"
//           >
//             Explore Services
//           </Link>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="py-12 px-6">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
//           Why Choose PinPaper?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Feature 1 */}
//           <div className="p-6 bg-white rounded-lg shadow-md text-center">
//             <img
//               src="/images/upload-documents.png"
//               alt="Upload Documents"
//               className="h-24 mx-auto mb-4"
//             />
//             <h3 className="text-lg font-semibold mb-2">Easy Upload</h3>
//             <p className="text-gray-600">
//               Quickly upload your documents in various formats with just a few clicks.
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="p-6 bg-white rounded-lg shadow-md text-center">
//             <img
//               src="/images/affordable-printing.png"
//               alt="Affordable Prices"
//               className="h-24 mx-auto mb-4"
//             />
//             <h3 className="text-lg font-semibold mb-2">Affordable Prices</h3>
//             <p className="text-gray-600">
//               Get high-quality printing services at competitive rates.
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="p-6 bg-white rounded-lg shadow-md text-center">
//             <img
//               src="/images/doorstep-delivery.png"
//               alt="Doorstep Delivery"
//               className="h-24 mx-auto mb-4"
//             />
//             <h3 className="text-lg font-semibold mb-2">Doorstep Delivery</h3>
//             <p className="text-gray-600">
//               Receive your printed documents delivered to your preferred address.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="bg-blue-600 text-white py-12 text-center">
//         <h2 className="text-2xl font-bold mb-4">
//           Ready to Simplify Your Printing Needs?
//         </h2>
//         <p className="text-lg max-w-2xl mx-auto mb-6">
//           Join thousands of happy customers who trust PinPaper for their document printing needs.
//         </p>
//         <Link
//           to="/signup"
//           className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100"
//         >
//           Get Started Now
//         </Link>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6 text-center">
//         <p className="text-sm">
//           &copy; {new Date().getFullYear()} PinPaper. All Rights Reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;



import React from 'react';
import { FileText, Printer, Truck, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="w-12 h-12 text-blue-600" />,
      title: "Upload Easily",
      description: "Upload any document with just a few clicks."
    },
    {
      icon: <Printer className="w-12 h-12 text-green-600" />,
      title: "Print Affordably",
      description: "Get high-quality prints at prices that won't break the bank. Transparent and competitive pricing."
    },
    {
      icon: <Truck className="w-12 h-12 text-purple-600" />,
      title: "Doorstep Delivery",
      description: "No need to step out. We'll deliver your printed documents right to your doorstep."
    }
  ];

  return (
    <div className="min-h-screen mt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Upload, Print, Deliver
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-5xl mx-auto">
            Upload your documents, get them printed professionally, and delivered to your doorstep. <br />
            Fast, affordable, and hassle-free.
          </p>
          <button
            onClick={() => navigate('/services')}
            className="bg-white text-blue-700 hover:bg-blue-100 px-8 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-lg"
          >
            Start Printing Now
          </button>
        </div>
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            How Pinpaper Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-5xl font-bold text-blue-600 mb-4">1</div>
              <h4 className="text-xl font-semibold mb-3">Upload</h4>
              <p className="text-gray-600">
                Upload your document securely through our platform.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-5xl font-bold text-green-600 mb-4">2</div>
              <h4 className="text-xl font-semibold mb-3">Customize</h4>
              <p className="text-gray-600">
                Choose print settings like color, binding, and copies.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-5xl font-bold text-purple-600 mb-4">3</div>
              <h4 className="text-xl font-semibold mb-3">Deliver</h4>
              <p className="text-gray-600">
                We print and deliver your document to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-blue-50 p-8 rounded-lg">
          <ShieldCheck className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Your Documents, Our Responsibility
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We guarantee confidentiality, secure handling, and high-quality prints.
            Your documents are treated with the utmost care and professionalism.
          </p>
        </div>
      </div>

      {/* Footer Section
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto flex justify-center space-x-6 text-sm">
          <button onClick={() => navigate('/termsAndConditions')} className="hover:text-white">
            Terms & Conditions
          </button>
          <button onClick={() => navigate('/cancellationAndRefund')} className="hover:text-white">
            Cancellation & Refund Policy
          </button>
          <button onClick={() => navigate('/contactUs')} className="hover:text-white">
            Contact Us
          </button>
        </div>
      </footer> */}
    </div>
  );
};

export default HomePage;
