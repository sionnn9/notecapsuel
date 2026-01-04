"use client";

import React, { use } from "react";
import { useState } from "react";
import Link from "next/link";

const page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlesubmit = () => {};
  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="container mx-auto my-3">
        <div className="max-w-2xl mx-auto">
          <Link
            //this href needs fixing
            href={"/note/$[id]"}
            className="text-blue-500 hover:text-blue-700 rounded-2xl hover:bg-gray-800 p-3"
          >
            {"<-- Back to Notes"}
          </Link>
          <div className="card bg-gray-900 p-6 rounded-xl shadow-lg mt-6">
            <div className="card-body ">
              <h2 className="text-2xl font-bold mb-4">Create a New Note</h2>
              <form onSubmit={handlesubmit}>
                <div>
                  <label className="block text-md font-medium mb-2">
                    title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    className="rounded-2xl text-white h-10 bg-gray-700 w-full p-1.5 mb-4"
                  ></input>
                </div>

                <div>
                  <label className="block text-md font-medium my-2 ">
                    content
                  </label>
                  <textarea
                    placeholder="Content"
                    className="rounded-2xl text-white h-28 bg-gray-700 w-full p-2 mb-4"
                  ></textarea>
                </div>
              </form>
              <div className="justify-end flex py-1.5">
                <button
                  type="submit"
                  disabled={loading}
                  className={`font-bold py-2 px-4 rounded-xl text-white transition cursor-pointer
                          ${
                            loading
                              ? "bg-blue-400 cursor-not-allowed opacity-70"
                              : "bg-blue-500 hover:bg-blue-700"
                          }
                            `}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
