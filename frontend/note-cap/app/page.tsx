import React from "react";
import Link from "next/link";
import { FaArrowRight, FaStickyNote, FaLock, FaRocket } from "react-icons/fa";
import Steps from "@/app/component/steps/page";
const Page = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* 🌌 Background */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Note Capsule
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            A minimal, fast, and secure note-taking app built to capture your
            thoughts, ideas, and reminders — all in one place.
          </p>

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <Link href="/note">
              <button
                className="
                  group flex items-center gap-3
                  bg-blue-600 hover:bg-blue-500
                  px-10 py-4 rounded-2xl
                  font-bold text-lg
                  transition-all
                  hover:-translate-y-1
                  active:scale-95
                  shadow-[0_0_30px_rgba(37,99,235,0.45)]
                "
              >
                Start Using App
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={<FaStickyNote />}
            title="Create & Edit Notes"
            desc="Quickly create, edit, and organize notes with a clean distraction-free editor."
          />
          <Feature
            icon={<FaRocket />}
            title="Fast & Responsive"
            desc="Built with modern web technologies for a smooth and fast experience."
          />
          <Feature
            icon={<FaLock />}
            title="Safe & Reliable"
            desc="Your notes are stored securely and protected with proper API handling."
          />
        </div>

        {/* How to Use */}
        <div className="mt-20 max-w-4xl mx-auto">
          <Steps />
        </div>
      </div>
    </div>
  );
};

/* 🔹 Feature Card */
const Feature = ({ icon, title, desc }: any) => (
  <div
    className="
      bg-white/5 backdrop-blur-xl
      border border-white/10
      rounded-3xl p-8
      text-center
      hover:bg-white/10 transition
    "
  >
    <div className="text-3xl text-blue-400 mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);

/* 🔹 Step Item */
const Step = ({ number, text }: any) => (
  <div className="flex items-start gap-4">
    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">
      {number}
    </span>
    <p>{text}</p>
  </div>
);

export default Page;
