import React from 'react';
import { Mail, MapPin, Phone, User } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 mt-16 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Contact Us</h1>
        <p className="text-gray-700 mb-6 text-center">
          If you have any queries or need assistance, feel free to reach out to us using the contact details below.
        </p>


        <div className="space-y-6">


          <div className="flex items-start space-x-4">
            <User className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Legal entity name</h2>
              <p className="text-gray-600">
                Mohammed Misbahuddin
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MapPin className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Address</h2>
              <p className="text-gray-600">
                Asif Nagar, Hyderabad, Telangana, PIN: 500028
              </p>
            </div>
          </div>

          {/* <div className="flex items-start space-x-4">
            <MapPin className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Operational Address</h2>
              <p className="text-gray-600">
                Asif Nagar, Hyderabad, Telangana, PIN: 500028
              </p>
            </div>
          </div> */}

          <div className="flex items-start space-x-4">
            <Phone className="w-8 h-8 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Telephone</h2>
              <p className="text-gray-600">+91 7993924730</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Mail className="w-8 h-8 text-red-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Email</h2>
              <p className="text-gray-600">pinpaper.in@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
