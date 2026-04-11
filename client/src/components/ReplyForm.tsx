/**
 * GameCritic — ReplyForm Component
 * Design: Obsidian Edge — formulaire simplifié pour répondre aux commentaires
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { addComment } from "@/data/comments";
import { toast } from "sonner";

interface ReplyFormProps {
  reviewSlug: string;
  parentCommentId: string;
  parentAuthor: string;
  onReplyAdded?: () => void;
}

export function ReplyForm({
  reviewSlug,
  parentCommentId,
  parentAuthor,
  onReplyAdded,
}: ReplyFormProps) {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim() || !email.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    if (content.trim().length < 5) {
      toast.error("Reply must be at least 5 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      addComment(reviewSlug, author, email, content, 0, parentCommentId);
      toast.success("Reply posted successfully!");
      setAuthor("");
      setEmail("");
      setContent("");
      onReplyAdded?.();
    } catch (error) {
      toast.error("Failed to post reply");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
      className="p-4 rounded-lg"
      style={{
        background: "oklch(0.18 0.015 265)",
        border: "1px solid oklch(1 0 0 / 8%)",
      }}
    >
      <p
        className="text-xs mb-3 font-medium"
        style={{ color: "oklch(0.65 0.015 265)", fontFamily: "'Inter', sans-serif" }}
      >
        Replying to <span style={{ color: "oklch(0.75 0.18 195)" }}>{parentAuthor}</span>
      </p>

      <div className="space-y-2">
        {/* Name */}
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          className="w-full px-2.5 py-1.5 rounded-lg outline-none text-xs transition-colors"
          style={{
            background: "oklch(0.14 0.014 265)",
            border: "1px solid oklch(1 0 0 / 8%)",
            color: "oklch(0.92 0.008 265)",
            fontFamily: "'Inter', sans-serif",
          }}
          onFocus={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "oklch(0.75 0.18 195 / 40%)";
          }}
          onBlur={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "oklch(1 0 0 / 8%)";
          }}
        />

        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-2.5 py-1.5 rounded-lg outline-none text-xs transition-colors"
          style={{
            background: "oklch(0.14 0.014 265)",
            border: "1px solid oklch(1 0 0 / 8%)",
            color: "oklch(0.92 0.008 265)",
            fontFamily: "'Inter', sans-serif",
          }}
          onFocus={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "oklch(0.75 0.18 195 / 40%)";
          }}
          onBlur={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "oklch(1 0 0 / 8%)";
          }}
        />

        {/* Reply content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your reply..."
          rows={2}
          className="w-full px-2.5 py-1.5 rounded-lg outline-none text-xs resize-none transition-colors"
          style={{
            background: "oklch(0.14 0.014 265)",
            border: "1px solid oklch(1 0 0 / 8%)",
            color: "oklch(0.92 0.008 265)",
            fontFamily: "'Inter', sans-serif",
          }}
          onFocus={(e) => {
            (e.target as HTMLTextAreaElement).style.borderColor = "oklch(0.75 0.18 195 / 40%)";
          }}
          onBlur={(e) => {
            (e.target as HTMLTextAreaElement).style.borderColor = "oklch(1 0 0 / 8%)";
          }}
        />

        {/* Submit */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all disabled:opacity-50"
            style={{
              background: "oklch(0.75 0.18 195)",
              color: "oklch(0.08 0.01 195)",
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 0 10px oklch(0.75 0.18 195 / 20%)",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 15px oklch(0.75 0.18 195 / 35%)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 10px oklch(0.75 0.18 195 / 20%)";
            }}
          >
            <Send size={12} />
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </motion.form>
  );
}
