import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-black text-white px-6 text-center">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Make AI Faceless Videos in Minutes</h1>

      {/* Description */}
      <p className="text-lg md:text-xl mt-4 text-gray-300 max-w-2xl">Enter a prompt, and Tiny Clips will generate a short video with the perfect background—no editing required.</p>

      {/* CTA Button */}
      <button className="mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300">Try Tiny Clips Now 🚀</button>

      {/* Decorative Section */}
      <div className="mt-12 flex gap-6">
        <div className="w-32 h-32 bg-purple-700 rounded-lg shadow-lg opacity-60"></div>
        <div className="w-32 h-32 bg-blue-700 rounded-lg shadow-lg opacity-60"></div>
        <div className="w-32 h-32 bg-indigo-700 rounded-lg shadow-lg opacity-60"></div>
      </div>
    </div>
  );
};

export default HomePage;
