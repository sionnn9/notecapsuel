"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import instance from "../lib/axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await instance.post("/auth/login", { email, password });
      console.log("Login response:", response.data);
      toast.success("Logged in successfully!");
      // Redirect to notes page after a short delay to allow the toast to show
      const timer = setTimeout(() => {
        window.location.href = "/note";
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.log("Full error:", error);
      console.log("Server response:", error.response?.data);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10 outline-none pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-all"
            >
              Login
            </button>
          </div>

          <p className="text-center mt-4 text-gray-400">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
