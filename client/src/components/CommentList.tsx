/**
 * GameCritic — CommentList Component
 * Design: Obsidian Edge — affichage des commentaires avec réponses imbriquées, votes et pagination
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageCircle, ChevronDown } from "lucide-react";
import { getComments, getCommentStats, markHelpful, type Comment } from "@/data/comments";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  reviewSlug: string;
  refreshTrigger?: number;
  commentsPerPage?: number;
}

const DEFAULT_COMMENTS_PER_PAGE = 5;

export function CommentList({ reviewSlug, refreshTrigger, commentsPerPage = DEFAULT_COMMENTS_PER_PAGE }: CommentListProps) {
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [displayedComments, setDisplayedComments] = useState<Comment[]>([]);
  const [stats, setStats] = useState({ total: 0, averageRating: 0, ratingDistribution: {} });
  const [helpfulIds, setHelpfulIds] = useState<Set<string>>(new Set());
  const [userVotes, setUserVotes] = useState<Map<string, "upvote" | "downvote">>(new Map());
  const [voteRefresh, setVoteRefresh] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const loadComments = () => {
      const comments = getComments(reviewSlug);
      setAllComments(comments);
      setStats(getCommentStats(reviewSlug));
      setCurrentPage(1);
      // Load first page
      setDisplayedComments(comments.slice(0, commentsPerPage));
    };
    loadComments();
  }, [reviewSlug, refreshTrigger, voteRefresh, commentsPerPage]);

  const handleMarkHelpful = (commentId: string) => {
    if (!helpfulIds.has(commentId)) {
      markHelpful(commentId);
      const newSet = new Set(helpfulIds);
      newSet.add(commentId);
      setHelpfulIds(newSet);
      // Refresh comments
      setAllComments(getComments(reviewSlug));
    }
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const newComments = allComments.slice(0, nextPage * commentsPerPage);
      setDisplayedComments(newComments);
      setCurrentPage(nextPage);
      setIsLoadingMore(false);
    }, 300);
  };

  const hasMoreComments = displayedComments.length < allComments.length;

  if (stats.total === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="py-8 text-center"
      >
        <MessageCircle size={32} style={{ color: "oklch(0.40 0.01 265)", margin: "0 auto 1rem" }} />
        <p
          className="text-sm"
          style={{ color: "oklch(0.50 0.015 265)", fontFamily: "'Inter', sans-serif" }}
        >
          No comments yet. Be the first to share your thoughts!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Stats header */}
      <div
        className="p-5 rounded-xl mb-6 flex items-center justify-between"
        style={{
          background: "oklch(0.14 0.014 265)",
          border: "1px solid oklch(1 0 0 / 8%)",
        }}
      >
        <div>
          <div
            className="text-2xl font-bold"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.92 0.008 265)" }}
          >
            {stats.averageRating.toFixed(1)}
          </div>
          <p
            className="text-xs"
            style={{ color: "oklch(0.50 0.015 265)", fontFamily: "'Inter', sans-serif" }}
          >
            User Rating
          </p>
        </div>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={16}
              style={{
                fill: i <= Math.round(stats.averageRating / 2) ? "oklch(0.75 0.18 195)" : "transparent",
                color: i <= Math.round(stats.averageRating / 2) ? "oklch(0.75 0.18 195)" : "oklch(0.40 0.01 265)",
              }}
            />
          ))}
        </div>

        <div className="text-right">
          <div
            className="text-lg font-bold"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.92 0.008 265)" }}
          >
            {stats.total}
          </div>
          <p
            className="text-xs"
            style={{ color: "oklch(0.50 0.015 265)", fontFamily: "'Inter', sans-serif" }}
          >
            {stats.total === 1 ? "Comment" : "Comments"}
          </p>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {displayedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            reviewSlug={reviewSlug}
            helpfulIds={helpfulIds}
            onMarkHelpful={handleMarkHelpful}
            userVotes={userVotes}
            onVoteChange={() => setVoteRefresh((prev) => prev + 1)}
          />
        ))}
      </div>

      {/* Load more button */}
      {hasMoreComments && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-60"
            style={{
              background: "oklch(0.75 0.18 195)",
              color: "oklch(0.08 0.01 195)",
              fontFamily: "'Rajdhani', sans-serif",
              boxShadow: "0 0 15px oklch(0.75 0.18 195 / 25%)",
            }}
            onMouseEnter={(e) => {
              if (!isLoadingMore) {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 20px oklch(0.75 0.18 195 / 40%)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 15px oklch(0.75 0.18 195 / 25%)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            <span>{isLoadingMore ? "Loading..." : "Load More Comments"}</span>
            <ChevronDown
              size={16}
              style={{
                transform: isLoadingMore ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
          </button>
        </motion.div>
      )}

      {/* Pagination info */}
      {allComments.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-4 text-center"
        >
          <p
            className="text-xs"
            style={{ color: "oklch(0.50 0.015 265)", fontFamily: "'Inter', sans-serif" }}
          >
            Showing {displayedComments.length} of {allComments.length} comments
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
