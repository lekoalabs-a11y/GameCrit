/**
 * GameCritic — CommentItem Component
 * Design: Obsidian Edge — affichage d'un commentaire avec réponses imbriquées et votes
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageCircle, ChevronDown } from "lucide-react";
import { markHelpful, upvoteComment, downvoteComment, removeUpvote, removeDownvote, getUserBadges, type Comment } from "@/data/comments";
import { ReplyForm } from "./ReplyForm";
import { VoteButtons } from "./VoteButtons";
import { UserBadges } from "./UserBadges";

interface CommentItemProps {
  comment: Comment;
  reviewSlug: string;
  isReply?: boolean;
  onReplyAdded?: () => void;
  helpfulIds: Set<string>;
  onMarkHelpful: (commentId: string) => void;
  userVotes?: Map<string, "upvote" | "downvote">;
  onVoteChange?: () => void;
}

export function CommentItem({
  comment,
  reviewSlug,
  isReply = false,
  onReplyAdded,
  helpfulIds,
  onMarkHelpful,
  userVotes = new Map(),
  onVoteChange,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleUpvote = (id: string) => {
    const currentVote = userVotes.get(id);
    if (currentVote === "upvote") {
      removeUpvote(id);
      userVotes.delete(id);
    } else {
      if (currentVote === "downvote") {
        removeDownvote(id);
      }
      upvoteComment(id);
      userVotes.set(id, "upvote");
    }
    onVoteChange?.();
  };

  const handleDownvote = (id: string) => {
    const currentVote = userVotes.get(id);
    if (currentVote === "downvote") {
      removeDownvote(id);
      userVotes.delete(id);
    } else {
      if (currentVote === "upvote") {
        removeUpvote(id);
      }
      downvoteComment(id);
      userVotes.set(id, "downvote");
    }
    onVoteChange?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={isReply ? "ml-4 md:ml-8" : ""}
    >
      <div
        className="p-4 rounded-lg"
        style={{
          background: "oklch(0.14 0.014 265)",
          border: "1px solid oklch(1 0 0 / 6%)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="font-semibold text-sm"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.92 0.008 265)" }}
              >
                {comment.author}
              </div>
              {isReply && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.75 0.18 195 / 15%)",
                    color: "oklch(0.75 0.18 195)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Reply
                </span>
              )}
            </div>
            <div className="mb-1">
              <UserBadges badges={getUserBadges(comment.email)} size="sm" />
            </div>
            <p
              className="text-xs"
              style={{ color: "oklch(0.45 0.012 265)", fontFamily: "'Inter', sans-serif" }}
            >
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Rating (only for top-level comments) */}
          {!isReply && comment.rating > 0 && (
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={12}
                  style={{
                    fill: i <= Math.round(comment.rating / 2) ? "oklch(0.75 0.18 195)" : "transparent",
                    color: i <= Math.round(comment.rating / 2) ? "oklch(0.75 0.18 195)" : "oklch(0.40 0.01 265)",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <p
          className="text-sm mb-3 leading-relaxed"
          style={{ color: "oklch(0.75 0.01 265)", fontFamily: "'Inter', sans-serif" }}
        >
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Vote buttons */}
          <VoteButtons
            commentId={comment.id}
            upvotes={comment.upvotes}
            downvotes={comment.downvotes}
            userVote={userVotes.get(comment.id) || null}
            onUpvote={handleUpvote}
            onDownvote={handleDownvote}
          />

          {/* Reply button */}
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-opacity-80"
            style={{
              background: "oklch(0.18 0.015 265)",
              color: "oklch(0.45 0.012 265)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <MessageCircle size={12} />
            Reply
          </button>

          {/* Show/hide replies button */}
          {hasReplies && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: "oklch(0.18 0.015 265)",
                color: "oklch(0.45 0.012 265)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <ChevronDown
                size={12}
                style={{
                  transform: showReplies ? "rotate(0deg)" : "rotate(-90deg)",
                  transition: "transform 0.2s",
                }}
              />
              {comment.replies?.length} {comment.replies?.length === 1 ? "Reply" : "Replies"}
            </button>
          )}
        </div>
      </div>

      {/* Reply form */}
      <AnimatePresence>
        {showReplyForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 ml-4 md:ml-8"
          >
            <ReplyForm
              reviewSlug={reviewSlug}
              parentCommentId={comment.id}
              parentAuthor={comment.author}
              onReplyAdded={() => {
                setShowReplyForm(false);
                onReplyAdded?.();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nested replies */}
      <AnimatePresence>
        {showReplies && hasReplies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 space-y-3 ml-4 md:ml-8"
          >
            {comment.replies?.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                reviewSlug={reviewSlug}
                isReply
                onReplyAdded={onReplyAdded}
                helpfulIds={helpfulIds}
                onMarkHelpful={onMarkHelpful}
                userVotes={userVotes}
                onVoteChange={onVoteChange}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
