"use client";

import React from "react";
import Navabar from "@/app/component/navbar/page";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { formatDate } from "@/app/lib/utils";
import instance from "@/app/lib/axios";
import toast from "react-hot-toast";
import Deletepop from "@/app/component/deletepop/page";

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
          if (error.response?.status === 401) {
            toast.error("Unauthorized. Please log in.");
            router.push("/login");
            return;
          }
        }

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 429) {
            setIsRateLimited(true);
            router.push("/component/ratelimit");
            return;
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [router]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await instance.delete(`/notes/${deleteId}`);
      setNotes((prev) => prev.filter((n) => n._id !== deleteId));
      toast.success("Note deleted successfully");
    } catch {
      toast.error("Failed to delete note");
    } finally {
      setOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="relative min-h-screen text-gray-100 overflow-hidden pt-16">
      {/* 🌌 Radial Gradient Background */}
      <div
        className="absolute inset-0 -z-10 h-full w-full px-5 py-24
        [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
      />

      <Navabar />

      {/* Loading */}
      {loading && (
        <div className="flex justify-center mt-24">
          <span className="text-gray-400 animate-pulse">Loading notes…</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && notes.length === 0 && (
        <div className="flex flex-col items-center mt-32 text-center">
          <p className="text-xl font-semibold text-gray-300">No notes yet</p>
          <p className="text-gray-500 mt-2">
            Create your first note to get started ✨
          </p>
        </div>
      )}

      {/* Notes Grid */}
      {!loading && notes.length > 0 && !isRateLimited && (
        <section className="max-w-7xl mx-auto px-6 py-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              onClick={() => router.push(`/noteDetail/${note._id}`)}
              className="group cursor-pointer"
            >
              <div
                className="
                relative h-full rounded-3xl
                bg-white/5 backdrop-blur-xl
                border border-white/10
                p-6
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_40px_rgba(99,102,241,0.25)]
                "
              >
                {/* Title */}
                <h3 className="text-lg font-bold text-white line-clamp-1">
                  {note.title}
                </h3>

                {/* Content Preview */}
                <p className="text-gray-200 mt-3 text-sm line-clamp-3 leading-relaxed">
                  {note.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs text-gray-400">
                    {formatDate(note.createdAt)}
                  </span>

                  <div className="flex gap-3 text-lg opacity-0 group-hover:opacity-100 transition">
                    <FaEdit
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-blue-400 transition"
                    />
                    <FaRegTrashAlt
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(note._id);
                        setOpen(true);
                      }}
                      className="hover:text-rose-400 transition"
                    />
                  </div>
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
