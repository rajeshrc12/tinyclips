"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle, FaArrowRight } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className="min-h-screen">
      {/* Animated Navbar */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }} className="bg-white/80 backdrop-blur-md shadow-sm py-3 sticky top-0 z-10">
        <div className="max-w-6xl p-1 flex justify-between items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Image src={"https://raw.githubusercontent.com/rajeshrc12/tinyclips-public-files/main/images/logo.png"} height={30} width={30} alt="Logo.png" />
            </motion.div>
            <span className="text-base font-bold">Tinyclips</span>
          </Link>
        </div>
      </motion.nav>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Right Side - Login Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full md:w-1/2 max-w-md">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white">
              <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-3xl font-bold text-gray-800 mb-2">
                Welcome to <span className="text-orange-600">Tinyclips</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-gray-600 mb-8">
                The simplest way to create AI Short Videos.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <Button className="w-full py-6 rounded-xl text-base font-medium shadow-sm hover:shadow-md transition-all" variant="outline">
                  <FaGoogle className="mr-3 h-5 w-5 text-red-500" />
                  Continue with Google
                  <FaArrowRight className="ml-3 h-4 w-4 opacity-70" />
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-6 text-center text-sm text-gray-500">
                By continuing, you agree to our{" "}
                <Link href="#" className="text-orange-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-orange-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
