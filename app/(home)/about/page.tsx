import React from "react";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-center">About Tiny Clips</h1>

      {/* Description */}
      <p className="text-lg md:text-xl mt-4 text-gray-300 max-w-2xl text-center">
        Tiny Clips is an AI-powered tool that generates short videos from a simple prompt. It automatically selects relevant background visuals, making video creation effortless. Whether you are a
        content creator or marketer, creating faceless videos has never been easier!
      </p>

      {/* Decorative Section */}
      <div className="mt-12 flex gap-6">
        <div className="w-24 h-24 bg-purple-700 rounded-lg shadow-lg opacity-60"></div>
        <div className="w-24 h-24 bg-blue-700 rounded-lg shadow-lg opacity-60"></div>
        <div className="w-24 h-24 bg-indigo-700 rounded-lg shadow-lg opacity-60"></div>
      </div>
    </div>
  );
};

export default AboutPage;
