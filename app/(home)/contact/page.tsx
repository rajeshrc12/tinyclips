import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-sm text-gray-500 mb-4">
          Last updated on <span className="font-medium">22-03-2025 22:49:50</span>
        </p>
        <div className="text-gray-700 space-y-3">
          <p>
            <span className="font-semibold">Merchant Legal Entity Name:</span> RAJESH SOMNATH CHARHAJARI
          </p>
          <p>
            <span className="font-semibold">Registered Address:</span> 190 Telangi Pachha Peth, Daji Peth, Maharashtra, PIN: 413005
          </p>
          <p>
            <span className="font-semibold">Operational Address:</span> 190 Telangi Pachha Peth, Daji Peth, Maharashtra, PIN: 413005
          </p>
          <p>
            <span className="font-semibold">Telephone No:</span> 7620591981
          </p>
          <p>
            <span className="font-semibold">E-Mail ID:</span>{" "}
            <a href="mailto:rajesh.charhajari@gmail.com" className="text-blue-500 hover:underline">
              rajesh.charhajari@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
