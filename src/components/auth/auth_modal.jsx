import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-lg max-w-4xl w-full">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to <span className="text-blue-600">RenderWonders</span>
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Gaze and attention modeling powered by AI is optimizing virtual
            reality experiences
          </p>

          <form className="space-y-4">
            <div className="flex items-center border rounded-full px-4 py-2 bg-gray-100">
              <i className="fas fa-envelope text-gray-400"></i>
              <input
                type="email"
                placeholder="Email"
                className="ml-2 bg-transparent w-full outline-none"
              />
            </div>
            <div className="flex items-center border rounded-full px-4 py-2 bg-gray-100">
              <i className="fas fa-lock text-gray-400"></i>
              <input
                type="password"
                placeholder="Password"
                className="ml-2 bg-transparent w-full outline-none"
              />
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full transition duration-300">
              {isLogin ? "Login" : "Sign up"}
            </button>

            <div className="text-center text-gray-500">or</div>

            <button className="w-full border rounded-full py-2 flex items-center justify-center hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              {isLogin ? "Login with Google" : "Sign up with Google"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 font-medium cursor-pointer"
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>

          <div className="mt-8 text-center text-gray-500 text-xs">
            <div className="flex items-center justify-center gap-2">
              <span>Join with 20k+ Users! Let’s see our happy customers</span>
            </div>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-200 to-blue-400 flex flex-col justify-center items-center text-white p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Elevate your everyday with timeless design.
          </h2>
          <img
            src="https://i.postimg.cc/VkZZvhcg/3d-box.png"
            alt="3D Illustration"
            className="w-48 h-48 mb-6"
          />
          <p className="mt-4 text-sm text-center">
            Discover handcrafted furniture that blends elegance, comfort, and enduring quality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
