/**
 * GameCritic — Comments System
 * Design: Obsidian Edge
 *
 * Stockage: localStorage (MVP)
 * Pour la production: migrer vers une base de données backend
 */

export interface Comment {
  id: string;
  reviewSlug: string;
  author: string;
  email: string;
  content: string;
  rating: number; // 1-10 (only for top-level comments)
  createdAt: string;
  helpful: number; // deprecated, kept for compatibility
  upvotes: number; // count of upvotes
  downvotes: number; // count of downvotes
  parentCommentId?: string; // if this is a reply to another comment
  replies?: Comment[]; // nested replies (for display only)
}

const STORAGE_KEY = "gamecritic_comments";

export function getComments(reviewSlug: string): Comment[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    const reviewComments = allComments.filter((c) => c.reviewSlug === reviewSlug);

    // Build nested structure: top-level comments with their replies
    const topLevelComments = reviewComments
      .filter((c) => !c.parentCommentId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return topLevelComments.map((comment) => ({
      ...comment,
      replies: reviewComments
        .filter((c) => c.parentCommentId === comment.id)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    }));
  } catch {
    return [];
  }
}

export function addComment(
  reviewSlug: string,
  author: string,
  email: string,
  content: string,
  rating: number,
  parentCommentId?: string
): Comment {
  if (typeof window === "undefined") throw new Error("Cannot add comment on server");

  const comment: Comment = {
    id: `comment_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    reviewSlug,
    author,
    email,
    content,
    rating: parentCommentId ? 0 : Math.max(1, Math.min(10, rating)),
    createdAt: new Date().toISOString(),
    helpful: 0,
    upvotes: 0,
    downvotes: 0,
    parentCommentId,
  };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    allComments.push(comment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
  } catch {
    console.error("Failed to save comment");
  }

  return comment;
}

export function markHelpful(commentId: string): void {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    const comment = allComments.find((c) => c.id === commentId);
    if (comment) {
      comment.helpful += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
    }
  } catch {
    console.error("Failed to mark comment as helpful");
  }
}

export function getAverageRating(reviewSlug: string): number {
  const comments = getComments(reviewSlug);
  if (comments.length === 0) return 0;
  const sum = comments.reduce((acc, c) => acc + c.rating, 0);
  return sum / comments.length;
}

export function getCommentStats(reviewSlug: string): {
  total: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
} {
  const comments = getComments(reviewSlug);
  const distribution: Record<number, number> = {};
  for (let i = 1; i <= 10; i++) {
    distribution[i] = 0;
  }

  comments.forEach((c) => {
    distribution[c.rating]++;
  });

  return {
    total: comments.length,
    averageRating: getAverageRating(reviewSlug),
    ratingDistribution: distribution,
  };
}

export function getParentComment(commentId: string, reviewSlug: string): Comment | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    return allComments.find((c) => c.id === commentId && c.reviewSlug === reviewSlug);
  } catch {
    return undefined;
  }
}

export function upvoteComment(commentId: string): void {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    const comment = allComments.find((c) => c.id === commentId);
    if (comment) {
      comment.upvotes += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
    }
  } catch {
    console.error("Failed to upvote comment");
  }
}

export function downvoteComment(commentId: string): void {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    const comment = allComments.find((c) => c.id === commentId);
    if (comment) {
      comment.downvotes += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
    }
  } catch {
    console.error("Failed to downvote comment");
  }
}

export function removeUpvote(commentId: string): void {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    const comment = allComments.find((c) => c.id === commentId);
    if (comment && comment.upvotes > 0) {
      comment.upvotes -= 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
    }
  } catch {
    console.error("Failed to remove upvote");
  }
}

export function removeDownvote(commentId: string): void {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    const comment = allComments.find((c) => c.id === commentId);
    if (comment && comment.downvotes > 0) {
      comment.downvotes -= 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
    }
  } catch {
    console.error("Failed to remove downvote");
  }
}

export function getCommentScore(comment: Comment): number {
  return comment.upvotes - comment.downvotes;
}


/**
 * Badge System for Commentators
 * Badges are awarded based on activity and relevance
 */

export type BadgeType = "verified" | "active" | "helpful" | "expert" | "trending";

export interface Badge {
  type: BadgeType;
  label: string;
  description: string;
  icon: string; // emoji or icon name
  color: string; // oklch color
}

export const BADGES: Record<BadgeType, Badge> = {
  verified: {
    type: "verified",
    label: "Verified",
    description: "Verified commentator",
    icon: "✓",
    color: "oklch(0.78 0.18 140)",
  },
  active: {
    type: "active",
    label: "Active",
    description: "5+ comments",
    icon: "🔥",
    color: "oklch(0.75 0.22 25)",
  },
  helpful: {
    type: "helpful",
    label: "Helpful",
    description: "50+ upvotes",
    icon: "👍",
    color: "oklch(0.75 0.18 195)",
  },
  expert: {
    type: "expert",
    label: "Expert",
    description: "Average score 8+",
    icon: "⭐",
    color: "oklch(0.80 0.20 85)",
  },
  trending: {
    type: "trending",
    label: "Trending",
    description: "Recent high-score comment",
    icon: "📈",
    color: "oklch(0.65 0.22 25)",
  },
};

export function getUserBadges(email: string): BadgeType[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    const userComments = allComments.filter((c) => c.email === email);

    if (userComments.length === 0) return [];

    const badges: BadgeType[] = [];

    // Active badge: 5+ comments
    if (userComments.length >= 5) {
      badges.push("active");
    }

    // Helpful badge: 50+ total upvotes
    const totalUpvotes = userComments.reduce((sum, c) => sum + c.upvotes, 0);
    if (totalUpvotes >= 50) {
      badges.push("helpful");
    }

    // Expert badge: average rating 8+ on top-level comments
    const topLevelComments = userComments.filter((c) => !c.parentCommentId && c.rating > 0);
    if (topLevelComments.length >= 3) {
      const avgRating = topLevelComments.reduce((sum, c) => sum + c.rating, 0) / topLevelComments.length;
      if (avgRating >= 8) {
        badges.push("expert");
      }
    }

    // Trending badge: recent comment with high score (score >= 10)
    const recentComments = userComments.filter((c) => {
      const daysSinceCreated = (Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceCreated <= 7; // within last 7 days
    });
    const hasTrendingComment = recentComments.some((c) => c.upvotes - c.downvotes >= 10);
    if (hasTrendingComment) {
      badges.push("trending");
    }

    // Verified badge: always awarded (for MVP)
    badges.push("verified");

    // Remove duplicates
    return Array.from(new Set(badges));
  } catch {
    return [];
  }
}

export function getCommentatorStats(email: string): {
  totalComments: number;
  totalUpvotes: number;
  averageScore: number;
  badges: BadgeType[];
} {
  if (typeof window === "undefined") return { totalComments: 0, totalUpvotes: 0, averageScore: 0, badges: [] };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allComments: Comment[] = stored ? JSON.parse(stored) : [];
    const userComments = allComments.filter((c) => c.email === email);

    const totalUpvotes = userComments.reduce((sum, c) => sum + c.upvotes, 0);
    const totalScore = userComments.reduce((sum, c) => sum + (c.upvotes - c.downvotes), 0);
    const averageScore = userComments.length > 0 ? totalScore / userComments.length : 0;
    const badges = getUserBadges(email);

    return {
      totalComments: userComments.length,
      totalUpvotes,
      averageScore,
      badges,
    };
  } catch {
    return { totalComments: 0, totalUpvotes: 0, averageScore: 0, badges: [] };
  }
}
