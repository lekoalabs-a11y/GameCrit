/**
 * GameCritic — CommentForm Component
 * Design: Obsidian Edge — formulaire de commentaire avec validation
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import { addComment } from "@/data/comments";
import { toast } from "sonner";

interface CommentFormProps {
  reviewSlug: string;
  onCommentAdded?: () => void;
}

export function CommentForm({ reviewSlug, onCommentAdded }: CommentFormProps) {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(8);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

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

    if (content.trim().length < 10) {
      toast.error("Comment must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      addComment(reviewSlug, author, email, content, rating, undefined);
      toast.success("Comment posted successfully!");
      setAuthor("");
      setEmail("");
      setContent("");
      setRating(8);
      onCommentAdded?.();
    } catch (error) {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="p-6 rounded-xl"
      style={{
        background: "oklch(0.14 0.014 265)",
        border: "1px solid oklch(1 0 0 / 8%)",
      }}
    >
      <h3
        className="text-lg font-bold mb-4"
        style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.92 0.008 265)" }}
      >
        Share Your Thoughts
      </h3>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label
            className="block text-xs font-semibold mb-2 uppercase tracking-widest"
            style={{ color: "oklch(0.65 0.015 265)", fontFamily: "'Inter', sans-serif" }}
          >
            Your Name
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g., Alex"
            className="w-full px-3 py-2 rounded-lg outline-none text-sm transition-colors"
            style={{
              background: "oklch(0.18 0.015 265)",
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
        </div>

        {/* Email */}
        <div>
          <label
            className="block text-xs font-semibold mb-2 uppercase tracking-widest"
            style={{ color: "oklch(0.65 0.015 265)", fontFamily: "'Inter', sans-serif" }}
          >
            Email (not published)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 py-2 rounded-lg outline-none text-sm transition-colors"
            style={{
              background: "oklch(0.18 0.015 265)",
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
        </div>

        {/* Rating */}
        <div>
          <label
            className="block text-xs font-semibold mb-2 uppercase tracking-widest"
            style={{ color: "oklch(0.65 0.015 265)", fontFamily: "'Inter', sans-serif" }}
          >
            Your Rating: {hoveredRating || rating}/10
          </label>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i)}
                onMouseEnter={() => setHoveredRating(i)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={18}
                  style={{
                    fill: i <= (hoveredRating || rating) ? "oklch(0.75 0.18 195)" : "transparent",
                    color: i <= (hoveredRating || rating) ? "oklch(0.75 0.18 195)" : "oklch(0.40 0.01 265)",
                    filter: i <= (hoveredRating || rating) ? "drop-shadow(0 0 4px oklch(0.75 0.18 195 / 60%))" : "none",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label
            className="block text-xs font-semibold mb-2 uppercase tracking-widest"
            style={{ color: "oklch(0.65 0.015 265)", fontFamily: "'Inter', sans-serif" }}
          >
            Your Comment
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What did you think about this game? Share your experience..."
            rows={4}
            className="w-full px-3 py-2 rounded-lg outline-none text-sm resize-none transition-colors"
            style={{
              background: "oklch(0.18 0.015 265)",
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
          <p
            className="text-xs mt-1"
            style={{ color: "oklch(0.45 0.012 265)", fontFamily: "'Inter', sans-serif" }}
          >
            {content.length} characters (minimum 10)
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
          style={{
            background: "oklch(0.75 0.18 195)",
            color: "oklch(0.08 0.01 195)",
            fontFamily: "'Inter', sans-serif",
            boxShadow: "0 0 15px oklch(0.75 0.18 195 / 25%)",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 25px oklch(0.75 0.18 195 / 40%)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 15px oklch(0.75 0.18 195 / 25%)";
          }}
        >
          <Send size={14} />
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </motion.form>
  );
}
