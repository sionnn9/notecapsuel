import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl border-b border-white/10" />

      <div className="relative h-16 max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span
            className="
              text-2xl sm:text-3xl font-extrabold
              bg-gradient-to-r from-blue-500 to-purple-500
              bg-clip-text text-transparent
              tracking-tight
              group-hover:opacity-90 transition
            "
          >
            Note Capsule
          </span>
        </Link>

        {/* Action Button */}
        <Link href="/create">
          <button
            className="
              relative overflow-hidden
              px-6 py-2.5 rounded-2xl
              font-semibold text-white
              bg-blue-600
              hover:bg-blue-500
              transition-all duration-300
              hover:-translate-y-0.5
              active:translate-y-0
              shadow-[0_0_20px_rgba(37,99,235,0.35)]
            "
          >
            Add Note
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Page;
