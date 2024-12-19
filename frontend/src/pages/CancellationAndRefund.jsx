import React from 'react';

const CancellationRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 mt-16 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
          Cancellation & Refund Policy
        </h1>
        <p className="text-gray-700 mb-6">
          PinPaper believes in helping its customers as far as possible and has therefore adopted a liberal cancellation policy. The terms of this policy are outlined below:
        </p>

        <ul className="list-disc list-inside space-y-4 text-gray-700">
          <li>
            Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
          </li>
          <li>
            PinPaper does not accept cancellation requests for perishable items like flowers, eatables, etc. However, refund/replacement can be made if the customer establishes that the quality of the product delivered is not good.
          </li>
          <li>
            In case of receipt of damaged or defective items, please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at their own end. This should be reported within the same day of receipt of the product.
          </li>
          <li>
            If you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within the same day of receiving the product. The Customer Service Team, after reviewing your complaint, will take an appropriate decision.
          </li>
          <li>
            For products that come with a warranty from manufacturers, please refer the issue to them directly. 
          </li>
          <li>
            In case of any refunds approved by PinPaper, it will take 6-8 business days for the refund to be processed and credited to the customer's account.
          </li>
        </ul>

        <p className="text-gray-700 mt-6">
          For any further assistance or queries regarding cancellations and refunds, please contact our Customer Service team using the contact information provided on the website.
        </p>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
