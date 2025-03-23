import React from "react";

const CancellationAndRefund = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cancellation & Refund Policy</h2>
        <p className="text-sm text-gray-500 mb-4">
          Last updated on <span className="font-medium">23-03-2025 07:40:45</span>
        </p>
        <div className="text-gray-700 space-y-4 text-justify">
          <p>
            <span className="font-semibold">RAJESH SOMNATH CHARHAJARI</span> believes in helping its customers as far as possible and has therefore adopted a liberal cancellation policy.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">Cancellation Policy</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have already been
              processed and shipped.
            </li>
            <li>
              Cancellations are not accepted for perishable items like flowers, eatables, etc. However, refunds or replacements may be granted if the customer can prove that the product delivered was
              of substandard quality.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800">Damaged or Defective Items</h3>
          <p>
            If you receive a damaged or defective item, please report the issue to our Customer Service team within <span className="font-semibold">2 days</span> of receiving the product. The request
            will be reviewed, and the merchant will determine the validity of the claim.
          </p>
          <p>
            If the product received does not match the description on the website or does not meet your expectations, please notify our Customer Service within{" "}
            <span className="font-semibold">2 days</span>. After reviewing your complaint, an appropriate resolution will be provided.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">Warranty-Related Issues</h3>
          <p>For products that come with a manufacturer’s warranty, customers are advised to reach out to the manufacturer directly for assistance.</p>

          <h3 className="text-lg font-semibold text-gray-800">Refund Policy</h3>
          <p>
            In cases where a refund is approved by <span className="font-semibold">RAJESH SOMNATH CHARHAJARI</span>, the refund process will be completed within{" "}
            <span className="font-semibold">1-2 days</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationAndRefund;
