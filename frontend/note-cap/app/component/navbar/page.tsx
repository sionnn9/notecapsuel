import React from "react";

const page = () => {
  return (
    <div>
      {" "}
      <nav className="w-full h-16 bg-slate-900 shadow-md shadow-gray-800/50">
        <div className="flex justify-between items-center h-full px-8">
          <a href="/">
            {" "}
            <span className="font-bold text-3xl text-red-500">
              Note Capsuel
            </span>
          </a>
          <a href="/create">
            <button className="w-32 font-bold h-10 rounded-2xl bg-blue-500 hover:scale-110 transition-transform ease-out duration-300 hover:bg-blue-600">
              Add Note
            </button>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default page;
