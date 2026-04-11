/**
 * GameCritic — VoteButtons Component
 * Design: Obsidian Edge — système de vote upvote/downvote
 */

import { ThumbsUp, ThumbsDown } from "lucide-react";

interface VoteButtonsProps {
  commentId: string;
  upvotes: number;
  downvotes: number;
  userVote: "upvote" | "downvote" | null;
  onUpvote: (commentId: string) => void;
  onDownvote: (commentId: string) => void;
}

export function VoteButtons({
  commentId,
  upvotes,
  downvotes,
  userVote,
  onUpvote,
  onDownvote,
}: VoteButtonsProps) {
  const score = upvotes - downvotes;
  const isPositive = score > 0;
  const isNegative = score < 0;

  return (
    <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg" style={{ background: "oklch(0.18 0.015 265)" }}>
      {/* Upvote button */}
      <button
        onClick={() => onUpvote(commentId)}
        className="flex items-center gap-1 px-1.5 py-0.5 rounded transition-all hover:bg-opacity-80"
        style={{
          background: userVote === "upvote" ? "oklch(0.78 0.18 140 / 20%)" : "transparent",
          color: userVote === "upvote" ? "oklch(0.78 0.18 140)" : "oklch(0.45 0.012 265)",
        }}
        title="Upvote this comment"
      >
        <ThumbsUp size={13} />
        {upvotes > 0 && <span className="text-xs font-medium">{upvotes}</span>}
      </button>

      {/* Score display */}
      <div
        className="px-1.5 text-xs font-semibold min-w-[2rem] text-center"
        style={{
          color: isPositive ? "oklch(0.78 0.18 140)" : isNegative ? "oklch(0.65 0.22 25)" : "oklch(0.50 0.015 265)",
          fontFamily: "'Rajdhani', sans-serif",
        }}
      >
        {score > 0 ? `+${score}` : score < 0 ? `${score}` : "0"}
      </div>

      {/* Downvote button */}
      <button
        onClick={() => onDownvote(commentId)}
        className="flex items-center gap-1 px-1.5 py-0.5 rounded transition-all hover:bg-opacity-80"
        style={{
          background: userVote === "downvote" ? "oklch(0.65 0.22 25 / 20%)" : "transparent",
          color: userVote === "downvote" ? "oklch(0.65 0.22 25)" : "oklch(0.45 0.012 265)",
        }}
        title="Downvote this comment"
      >
        <ThumbsDown size={13} />
        {downvotes > 0 && <span className="text-xs font-medium">{downvotes}</span>}
      </button>
    </div>
  );
}
