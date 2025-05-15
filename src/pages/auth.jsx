import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.js";
import { toast } from "react-toastify";
import { getFriendlyFirebaseError } from "../utils/firebase_errors.jsx";

const AuthPage = ({ isLogin: initialIsLogin }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin ?? true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        setLoading(true);
        const result = await getRedirectResult(auth);
        if (result?.user) {
          navigate("/home");
          toast.success("Successfully logged in with Google!");
        }
      } catch (error) {
        const friendlyMessage = getFriendlyFirebaseError(error.code);
        toast.error(friendlyMessage);
      } finally {
        setLoading(false);
      }
    };

    checkRedirectResult();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/home");
      toast.success(`Successfully ${isLogin ? "logged in" : "signed up"}!`);
    } catch (error) {
      const friendlyMessage = getFriendlyFirebaseError(error.code);
      toast.error(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        await signInWithPopup(auth, googleProvider);
        navigate("/home");
        toast.success("Successfully logged in with Google!");
        setLoading(false);
      }
    } catch (error) {
      const friendlyMessage = getFriendlyFirebaseError(error.code);
      toast.error(friendlyMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg w-full max-w-md sm:max-w-xl md:max-w-3xl relative">
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="w-full p-6 sm:p-10 md:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome to <span className="text-blue-600">RenderWonders</span>
          </h2>
          <p className="text-sm text-gray-500 mb-6 sm:mb-8">
            Gaze and attention modeling powered by AI is optimizing virtual reality experiences
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center border rounded-full px-4 py-2 bg-gray-100">
              <i className="fas fa-envelope text-gray-400"></i>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="ml-2 bg-transparent w-full outline-none"
                required
                disabled={loading}
              />
            </div>

            <div className="flex items-center border rounded-full px-4 py-2 bg-gray-100">
              <i className="fas fa-lock text-gray-400"></i>
              <input
                type="password"
                placeholder="Password"
                className="ml-2 bg-transparent w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {!isLogin && (
              <div className="flex items-center border rounded-full px-4 py-2 bg-gray-100">
                <i className="fas fa-lock text-gray-400"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="ml-2 bg-transparent w-full outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {isLogin ? "Login" : "Sign up"}
            </button>

            <div className="text-center text-gray-500">or</div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border rounded-full py-2 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
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
            <div className="flex items-center justify-center gap-2 text-center">
              <span>Join with 20k+ Users! Let’s see our happy customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
