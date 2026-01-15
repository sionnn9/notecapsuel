"use client";

import React, { use, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import instance from "@/app/lib/axios";
import { FaRegTrashAlt } from "react-icons/fa";
type NoteInput = {
  title: string;
  content: string;
};

const page = () => {
  const [note, setNote] = useState<NoteInput>({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const { id } = useParams();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await instance.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch note. Please try again.");
      } finally {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 750);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="container mx-auto my-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between ">
            <Link
              href={`/note`}
              className="text-blue-500 hover:text-blue-700 rounded-2xl hover:bg-gray-800 p-3"
            >
              {"<-- Back to Notes"}
            </Link>

            <Link
              href={`/note`}
              className="text-red-500 flex  hover:text-red-700 rounded-2xl hover:bg-rose-400 p-3"
            >
              <FaRegTrashAlt className="m-1 " /> Delete Note
            </Link>
          </div>
          <div className="card bg-gray-900 p-6 rounded-xl shadow-lg mt-6">
            <div className="card-body ">
              <h2 className="text-2xl font-bold mb-4">Update This Note</h2>
              <form onSubmit={() => {}}>
                <div>
                  <label className="block text-md font-medium mb-2">
                    title
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                    value={note.title}
                    className="rounded-2xl text-white h-10 bg-gray-700 w-full p-1.5 mb-4"
                  ></input>
                </div>

                <div>
                  <label className="block text-md font-medium my-2 ">
                    content
                  </label>
                  <textarea
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                    value={note.content}
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
                    {loading ? "Updating..." : "Update Note"}
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
