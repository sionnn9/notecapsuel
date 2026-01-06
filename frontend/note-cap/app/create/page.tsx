"use client";

import React, { use } from "react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
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
      await axios.post("http://localhost:5001/api/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      router.push("/note/[id]");
    } catch (error) {
      setLoading(false);
      console.error("Error creating note:", error);
      toast.error("Failed to create note. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="container mx-auto my-3">
        <div className="max-w-2xl mx-auto">
          <Link
            //this href needs fixing
            href={`/note/$[id]`}
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
                    onChange={(e) => setTitle(e.target.value)}
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
                    onChange={(e) => setContent(e.target.value)}
                    className="rounded-2xl text-white h-28 bg-gray-700 w-full p-2 mb-4"
                  ></textarea>
                </div>
                <div className="justify-end flex py-1.5">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`font-bold py-2 px-4 rounded-xl text-white transition 
                          ${
                            loading
                              ? "bg-blue-400 cursor-not-allowed opacity-70"
                              : "bg-blue-500 hover:bg-blue-700 cursor-pointer"
                          }
                            `}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
