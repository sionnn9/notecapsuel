"use client";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import Link from "next/link";
import React, { useEffect, useState } from "react";
const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10 outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-black" />
                ) : (
                  <FaEye className="text-black" />
                )}
              </button>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-all">
              Sign Up
            </button>
          </div>

          <p className="text-center mt-4 text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
