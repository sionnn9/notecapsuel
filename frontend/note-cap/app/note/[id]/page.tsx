"use client";

import React from "react";
import Navabar from "@/app/component/navbar/page";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { formatDate } from "@/app/lib/utils";
import instance from "@/app/lib/axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { Deletepop } from "@/app/component/deletepop/page";
/* ✅ 1. Define Note type */
type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

const Page = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const router = useRouter();

  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await instance.get<Note[]>("/notes");
        setNotes(res.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 429) {
            setIsRateLimited(true);
            router.push("/component/ratelimit");
            return;
          }
        } else {
          console.error("Error fetching notes:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [router]);

  /* ✅ 2. Typed delete handler */
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await instance.delete(`/notes/${deleteId}`);

      setNotes((prevNotes) =>
        prevNotes.filter((note: any) => note._id !== deleteId)
      );

      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    } finally {
      setOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="bg-black min-h-screen w-screen">
      <Navabar />

      {loading && (
        <div className="text-white text-lg text-center mt-10">Loading...</div>
      )}

      {!loading && notes.length === 0 && (
        <div
          className="
  text-white text-lg text-center mt-10
  animate-bounce
  drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]
"
        >
          No Notes Found. Kindly Enter a Note.
        </div>
      )}

      {!loading && notes.length > 0 && !isRateLimited && (
        <section className="mt-16 flex justify-evenly flex-wrap">
          {notes.map((note) => (
            <div
              key={note._id}
              onClick={() => router.push(`/create/${note._id}`)}
              className="flex justify-center items-center cursor-pointer"
            >
              <div className="rounded-xl w-96 bg-red-500 h-auto m-7 text-start px-5 border-t-[7px] border-blue-900 hover:scale-105 duration-300 ease-in-out">
                <span className="text-white font-bold text-lg mt-4 block">
                  {note.title}
                </span>

                <p className="text-white my-4">{note.content}</p>

                <span className="text-white text-sm mb-2 block">
                  {formatDate(note.createdAt)}
                </span>

                <div className="flex justify-end text-xl mb-4 gap-3">
                  <FaEdit
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-pointer hover:text-gray-300"
                  />

                  <FaRegTrashAlt
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(note._id);
                      setOpen(true);
                    }}
                    className="text-red-950 hover:text-rose-50 hover:animate-pulse cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      <Deletepop open={open} setOpen={setOpen} handleDelete={handleDelete} />
    </div>
  );
};

export default Page;
