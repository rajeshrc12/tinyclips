"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaPalette, FaMagic, FaArrowRight, FaTwitter, FaGithub, FaLinkedin, FaChartLine, FaImage, FaCoins } from "react-icons/fa";
import Link from "next/link";
import ImageCarousel from "@/components/image-carousel";

const HomePage = () => {
  const steps = [
    {
      step: "1",
      title: "Add Your Script",
      description: "Paste your text script or let our AI help you generate one based on your topic.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      step: "2",
      title: "Select Voice & Style",
      description: "Choose from our library of natural-sounding voices and artistic styles.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      image: "https://raw.githubusercontent.com/rajeshrc12/tinyclips-public-files/main/images/2.png",
    },
    {
      step: "3",
      title: "Download & Share",
      description: "Download your video in HD quality or share directly to social platforms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  ];
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Navigation */}
      <nav className="py-6 px-4 sm:px-12 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-3">
          <Image src={"/images/logo.png"} height={40} width={40} alt="Logo.png" />
          <span className="text-2xl font-bold  bg-clip-text text-black">Tinyclips</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="hidden md:flex space-x-8">
          <a href="#features" className="font-medium text-gray-700 hover:text-orange-600">
            Features
          </a>
          <a href="#how-it-works" className="font-medium text-gray-700 hover:text-orange-600">
            How It Works
          </a>
          <a href="#pricing" className="font-medium text-gray-700 hover:text-orange-600">
            Pricing
          </a>
          <a href="#contact" className="font-medium text-gray-700 hover:text-orange-600">
            Contact
          </a>
          <Link href="/showcase" className="font-medium text-gray-700 hover:text-orange-600">
            Showcase
          </Link>
        </motion.div>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:bg-orange-700 transition-colors">
          <Link href="/login">Get Started</Link>
        </motion.button>
      </nav>

      {/* Hero Section */}
      <motion.section initial="hidden" animate="show" variants={container} className="py-16 px-4 sm:px-12 text-center max-w-6xl mx-auto">
        <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Transform Your <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Scripts</span> into Engaging Videos
        </motion.h1>

        <motion.p variants={item} className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Unlock your creative potential by converting text scripts into professional short videos with AI-generated visuals, voiceovers, and subtitles.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
          >
            <Link href="/login" className="flex items-center">
              Create Your First Video <FaArrowRight className="ml-2" />
            </Link>
          </motion.button>
          {/* 
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:bg-gray-50 transition-colors border border-orange-100"
          >
            Watch Demo
          </motion.button> */}
        </motion.div>
      </motion.section>
      <ImageCarousel />
      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to create stunning short videos from your scripts</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaMagic className="text-3xl text-orange-600" />,
                title: "AI-Powered Visuals",
                description: "Automatically generate relevant images for your script using advanced AI models.",
              },
              {
                icon: <FaMicrophone className="text-3xl text-orange-600" />,
                title: "Natural Voiceovers",
                description: "Choose from multiple natural-sounding voices in different languages and accents.",
              },
              {
                icon: <FaPalette className="text-3xl text-orange-600" />,
                title: "Custom Styles",
                description: "Select from various artistic styles to match your video's theme and mood.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-12 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Create professional videos in just a few simple steps</p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-orange-200 transform -translate-x-1/2"></div>

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`mb-12 md:mb-16 flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
              >
                <div className="md:w-1/2 mb-6 md:mb-0 md:px-8">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto md:mx-0">{step.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center md:text-left">{step.title}</h3>
                  <p className="text-gray-600 text-center md:text-left">{step.description}</p>
                </div>
                <div className="md:w-1/2">
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-4 rounded-xl shadow-md overflow-hidden">
                    <Image src={step.image} height={300} width={500} className="w-full h-auto rounded-lg" alt={`Step ${step.step}`} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <motion.section id="pricing" initial="hidden" animate="visible" variants={containerVariants} className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.h1 variants={itemVariants} className="text-4xl font-extrabold text-center text-orange-600 mb-12">
          Simple, Transparent Pricing
        </motion.h1>

        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                <FaCoins size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Free Trial</h2>
            </div>
            <p className="text-lg text-gray-600 ml-16">
              Get <span className="font-semibold text-orange-600">15 free images</span> to generate and test our service.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                <FaImage size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Pay As You Go</h2>
            </div>
            <p className="text-lg text-gray-600 ml-16 mb-4">
              We charge <span className="font-semibold">$0.0026 per image</span> after your free trial.
            </p>
            <div className="flex items-center ml-16 mt-4">
              <div className="p-2 rounded-full bg-orange-100 text-orange-600 mr-3">
                <FaChartLine size={18} />
              </div>
              <p className="text-gray-600">Track your image count for each video in the dashboard under My Videos section.</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 text-center text-gray-500 text-sm">
          No hidden fees. Cancel anytime.
        </motion.div>
      </motion.section>
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-12 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your Scripts into Videos?
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="text-xl text-orange-100 mb-10">
            Join thousands of creators who are saving time and boosting engagement with Tinyclips.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center mx-auto"
            >
              Get Started for Free <FaArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Have questions? Wed love to hear from you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-orange-700 transition-colors w-full"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="bg-orange-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">admin@tinyclips.space</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                    <p className="text-gray-600">+91 7620591981</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Address</h4>
                    <p className="text-gray-600">Maharashtra, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <motion.a whileHover={{ y: -3 }} href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                    <FaTwitter className="text-orange-600 text-xl" />
                  </motion.a>
                  <motion.a whileHover={{ y: -3 }} href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                    <FaGithub className="text-orange-600 text-xl" />
                  </motion.a>
                  <motion.a whileHover={{ y: -3 }} href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                    <FaLinkedin className="text-orange-600 text-xl" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4 gap-3">
                <Image src={"/images/logo.png"} height={40} width={40} alt="Logo.png" />

                <span className="text-xl font-bold">Tinyclips</span>
              </div>
              <p className="text-gray-400">Transforming scripts into engaging videos with the power of AI.</p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/showcase" className="text-gray-400 hover:text-white transition-colors">
                    Examples
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 Tinyclips. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
