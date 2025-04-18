import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Track if user is in Sign Up form

  // Function to toggle the login modal
  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    // Reset to login form when closing the modal
    if (isLoginModalOpen) {
      setIsSignUp(false);
    }
  };

  // Function to toggle between Login and Sign Up
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-gray-800 to-black px-6 py-4 shadow flex justify-between items-center">
        {/* Left side - Logo */}
        <h1 className="text-xl font-bold text-white">🎮 GameZone</h1>

        {/* Right side - Home + Login */}
        <div className="flex items-center gap-4">
          <nav>
            <Link to="/" className="text-white hover:underline">
              Home
            </Link>
          </nav>
          <button
            onClick={toggleLoginModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </header>

      <main className="flex-grow bg-gradient-to-r from-gray-900 to-black">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-black text-center py-3 text-sm text-white">
        © 2025 GameZone. All rights reserved.
      </footer>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80">
          <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg w-96 relative">
            {/* Close Icon */}
            <button
              onClick={toggleLoginModal}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times; {/* The "X" close icon */}
            </button>
            <h2 className="text-2xl font-semibold text-white text-center mb-4">
              {isSignUp ? "Sign Up" : "Login"}
            </h2>
            <form className="flex flex-col space-y-4">
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Name"
                  className="p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
              />
              {isSignUp && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
                />
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>
            <button
              onClick={toggleSignUp}
              className="mt-4 text-center text-red-500 hover:underline w-full"
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
