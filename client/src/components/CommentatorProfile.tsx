/**
 * GameCritic — CommentatorProfile Component
 * Design: Obsidian Edge — affichage du profil et stats d'un commentateur
 */

import { motion } from "framer-motion";
import { TrendingUp, MessageSquare, ThumbsUp } from "lucide-react";
import { getCommentatorStats } from "@/data/comments";
import { UserBadges } from "./UserBadges";

interface CommentatorProfileProps {
  email: string;
  author: string;
  compact?: boolean;
}

export function CommentatorProfile({ email, author, compact = false }: CommentatorProfileProps) {
  const stats = getCommentatorStats(email);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background: "oklch(0.75 0.18 195 / 20%)",
            color: "oklch(0.75 0.18 195)",
            fontFamily: "'Rajdhani', sans-serif",
          }}
        >
          {author.charAt(0).toUpperCase()}
        </div>
        <div>
          <div
            className="text-sm font-semibold"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.92 0.008 265)" }}
          >
            {author}
          </div>
          <UserBadges badges={stats.badges} size="sm" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 rounded-lg"
      style={{
        background: "oklch(0.18 0.015 265)",
        border: "1px solid oklch(1 0 0 / 8%)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
            style={{
              background: "oklch(0.75 0.18 195 / 20%)",
              color: "oklch(0.75 0.18 195)",
              fontFamily: "'Rajdhani', sans-serif",
            }}
          >
            {author.charAt(0).toUpperCase()}
          </div>
          <div>
            <div
              className="text-base font-semibold"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.92 0.008 265)" }}
            >
              {author}
            </div>
            <UserBadges badges={stats.badges} size="md" showLabel />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {/* Total Comments */}
        <div
          className="p-3 rounded-lg"
          style={{
            background: "oklch(0.14 0.014 265)",
            border: "1px solid oklch(1 0 0 / 6%)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <MessageSquare size={14} style={{ color: "oklch(0.75 0.18 195)" }} />
            <p
              className="text-xs"
              style={{ color: "oklch(0.50 0.015 265)", fontFamily: "'Inter', sans-serif" }}
            >
              Comments
            </p>
          </div>
          <div
            className="text-lg font-bold"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.92 0.008 265)" }}
          >
            {stats.totalComments}
          </div>
        </div>

        {/* Total Upvotes */}
        <div
          className="p-3 rounded-lg"
          style={{
            background: "oklch(0.14 0.014 265)",
            border: "1px solid oklch(1 0 0 / 6%)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <ThumbsUp size={14} style={{ color: "oklch(0.78 0.18 140)" }} />
            <p
              className="text-xs"
              style={{ color: "oklch(0.50 0.015 265)", fontFamily: "'Inter', sans-serif" }}
            >
              Upvotes
            </p>
          </div>
          <div
            className="text-lg font-bold"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.92 0.008 265)" }}
          >
            {stats.totalUpvotes}
          </div>
        </div>

        {/* Average Score */}
        <div
          className="p-3 rounded-lg"
          style={{
            background: "oklch(0.14 0.014 265)",
            border: "1px solid oklch(1 0 0 / 6%)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp size={14} style={{ color: "oklch(0.80 0.20 85)" }} />
            <p
              className="text-xs"
              style={{ color: "oklch(0.50 0.015 265)", fontFamily: "'Inter', sans-serif" }}
            >
              Avg Score
            </p>
          </div>
          <div
            className="text-lg font-bold"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.92 0.008 265)" }}
          >
            {stats.averageScore.toFixed(1)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
