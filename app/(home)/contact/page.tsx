import React from "react";

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-center">Get in Touch</h1>

      {/* Contact Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6 w-full max-w-lg">
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
          <button className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300">Send Message 📩</button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="mt-6 text-gray-400 text-center">
        <p>
          Email: <span className="text-white">support@tinyclips.com</span>
        </p>
        <p>
          Follow us on <span className="text-purple-400">Twitter</span> & <span className="text-purple-400">Instagram</span>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
