"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegTrashAlt, FaChevronLeft, FaSave } from "react-icons/fa";

import instance from "@/app/lib/axios";
import { Deletepop } from "@/app/component/deletepop/page";

type NoteInput = {
  _id: string;
  title: string;
  content: string;
};

const Page = () => {
  const [note, setNote] = useState<NoteInput>({
    _id: "",
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await instance.get(`/notes/${id}`);
        setNote(res.data);
      } catch {
        toast.error("Failed to fetch note.");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await instance.delete(`/notes/${deleteId}`);
      toast.success("Note deleted successfully");
      router.push("/note");
    } catch {
      toast.error("Failed to delete note");
    } finally {
      setOpen(false);
      setDeleteId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Fields cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      await instance.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      router.push("/note");
    } catch {
      toast.error("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="relative h-screen text-gray-100 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10
        [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
      />

      <div className="max-w-3xl mx-auto h-full px-4 py-6 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/note"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition
            bg-white/5 px-4 py-2 rounded-full border border-white/10"
          >
            <FaChevronLeft className="text-xs" />
            Back
          </Link>

          <button
            onClick={() => {
              setDeleteId(note._id);
              setOpen(true);
            }}
            className="flex items-center gap-2 text-sm font-semibold text-rose-400
            bg-rose-500/10 px-4 py-2 rounded-full border border-rose-500/20
            hover:bg-rose-500/30 transition"
          >
            <FaRegTrashAlt />
            Delete
          </button>
        </div>

        {/* Editor Card */}
        <div
          className="flex-1 bg-white/5 backdrop-blur-2xl border border-white/10
        rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col"
        >
          <div className="p-6 flex flex-col flex-1 gap-4">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Edit Note
              </h1>
              <p className="text-gray-400 text-sm">
                Polish your thoughts. Save when ready.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="flex flex-col flex-1 gap-4">
              {/* Title */}
              <div>
                <label className="text-xs font-semibold uppercase text-gray-500">
                  Title
                </label>
                <input
                  type="text"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-black/40 border border-white/10
                  px-5 py-3 text-lg focus:ring-2 focus:ring-blue-500/40 outline-none"
                />
              </div>

              {/* Content (auto grows) */}
              <div className="flex flex-col flex-1 min-h-0">
                <label className="text-xs font-semibold uppercase text-gray-500 mb-1">
                  Content
                </label>
                <textarea
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                  className="flex-1 min-h-0 rounded-xl bg-black/40 border border-white/10
                  px-5 py-4 resize-none focus:ring-2 focus:ring-blue-500/40 outline-none"
                />
              </div>

              {/* Save */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-3 px-8 py-3 rounded-xl font-bold
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  hover:from-blue-500 hover:to-indigo-500
                  transition-all active:scale-95 disabled:opacity-50"
                >
                  {saving ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    <FaSave />
                  )}
                  {saving ? "Saving…" : "Update Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Deletepop open={open} setOpen={setOpen} handleDelete={handleDelete} />
    </div>
  );
};

export default Page;
