import Image from "next/image";
import Link from "next/link";
import SignIn from "@/components/sign-in";

const LoginPage = () => {
  return (
    <div className="min-h-screen">
      {/* Animated Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm py-3 sticky top-0 z-10">
        <div className="max-w-6xl p-1 flex justify-between items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <div>
              <Image src={"/images/logo.png"} height={40} width={40} alt="Logo.png" />
            </div>
            <span className="text-base font-bold">Tinyclips</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 max-w-md">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome to <span className="text-orange-600">Tinyclips</span>
              </h1>
              <p className="text-gray-600 mb-8">The simplest way to create AI Short Videos.</p>

              <div>
                <SignIn />
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                By continuing, you agree to our{" "}
                <Link href="#" className="text-orange-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-orange-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
