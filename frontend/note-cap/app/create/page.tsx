"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import instance from "@/app/lib/axios";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await instance.post("/notes", { title, content });
      toast.success("Note created successfully!");
      router.push("/note");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          toast.error("Slow down! You are creating notes too quickly.", {
            duration: 4000,
            icon: "⚠️",
          });
        } else {
          toast.error("Failed to create note. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-gray-100 overflow-hidden pt-10">
      {/* 🌌 Radial Gradient Background */}
      <div
        className="absolute inset-0 -z-10 h-full w-full px-5 py-24
        [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
      />

      <div className="max-w-3xl mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/note"
          className="inline-flex items-center gap-2 text-sm font-medium
          text-gray-400 hover:text-white transition mb-8"
        >
          <FaChevronLeft className="text-xs" />
          Back to Notes
        </Link>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Create a New Note
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Capture your thoughts before they fade away.
              </p>
            </div>

            <form onSubmit={handlesubmit} className="space-y-3">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter a title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="
                    w-full bg-white/5 border border-white/10
                    rounded-2xl px-5 py-4 text-white
                    placeholder:text-gray-600
                    focus:outline-none focus:ring-2
                    focus:ring-blue-500/50 focus:border-blue-500/50
                    transition-all text-lg
                  "
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                  Content
                </label>
                <textarea
                  placeholder="Start writing..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="
                    w-full bg-white/5 border border-white/10
                    rounded-2xl px-5 py-4 text-white
                    placeholder:text-gray-600
                    focus:outline-none focus:ring-2
                    focus:ring-blue-500/50 focus:border-blue-500/50
                    transition-all min-h-[220px]
                    resize-none leading-relaxed
                  "
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group flex items-center gap-2
                    bg-blue-600 hover:bg-blue-500
                    text-white font-bold
                    py-4 px-10 rounded-2xl
                    transition-all
                    active:scale-95
                    disabled:opacity-50 disabled:active:scale-100
                    shadow-[0_0_20px_rgba(37,99,235,0.3)]
                  "
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    <FaPlus className="group-hover:rotate-12 transition-transform" />
                  )}
                  <span>{loading ? "Creating..." : "Create Note"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
