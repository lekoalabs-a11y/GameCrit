/**
 * GameCritic — CommentsSection Component
 * Design: Obsidian Edge — section complète de commentaires
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

interface CommentsSectionProps {
  reviewSlug: string;
}

export function CommentsSection({ reviewSlug }: CommentsSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCommentAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <section
      className="py-10"
      style={{ borderTop: "1px solid oklch(1 0 0 / 6%)" }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-1 h-6 rounded-full"
              style={{
                background: "linear-gradient(180deg, oklch(0.65 0.22 285), oklch(0.75 0.18 195))",
              }}
            />
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.95 0.005 265)" }}
            >
              Community Comments
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Form */}
            <CommentForm reviewSlug={reviewSlug} onCommentAdded={handleCommentAdded} />

            {/* List */}
            <CommentList reviewSlug={reviewSlug} refreshTrigger={refreshTrigger} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
