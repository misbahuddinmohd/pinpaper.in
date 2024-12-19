// // HelplinePage.jsx
// const HelplinePage = () => {
//     return (
//       <div className="p-4 mt-16">
//         <h2 className="text-xl font-semibold mb-4">Help Line</h2>
//         <div className="text-gray-600">No orders found</div>
//       </div>
//     );
//   };

// export default HelplinePage;




import React from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  Clock, 
  MapPin 
} from 'lucide-react';

const HelplinePage = () => {
  const contactMethods = [
    {
      icon: <Phone className="w-12 h-12 text-green-600" />,
      title: 'Call Us',
      details: '+91 7993924730',
      action: () => window.location.href = 'tel:+917993924730'
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-blue-600" />,
      title: 'WhatsApp',
      details: '+91 7993924730',
      action: () => window.open('https://wa.me/917993924730', '_blank')
    },
    {
      icon: <Mail className="w-12 h-12 text-red-600" />,
      title: 'Email',
      details: 'pinpaper.in@gmail.com',
      action: () => window.location.href = 'mailto:pinpaper.in@gmail.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-16 p-4">
      <div className="container mx-auto max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          We're Here to Help
        </h1>

        {/* Contact Methods */}
        <div className="space-y-4">
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex items-center hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={method.action}
            >
              <div className="mr-6">
                {method.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{method.title}</h3>
                <p className="text-gray-600">{method.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Support Hours */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Clock className="w-8 h-8 text-blue-600 mr-4" />
            <h3 className="text-xl font-semibold text-gray-800">Support Hours</h3>
          </div>
          <p className="text-gray-600">
            Monday to Sunday: 9:00 AM to 6:00 PM
            <br />
            {/* Closed on Sundays and Public Holidays */}
          </p>
        </div>

        {/* Address */}
        {/* <div className="mt-8 bg-green-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <MapPin className="w-8 h-8 text-green-600 mr-4" />
            <h3 className="text-xl font-semibold text-gray-800">Our Office</h3>
          </div>
          <p className="text-gray-600">
            Pinpaper Technologies Pvt Ltd
            <br />
            123, Tech Park, Bangalore - 560001
            <br />
            Karnataka, India
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default HelplinePage;