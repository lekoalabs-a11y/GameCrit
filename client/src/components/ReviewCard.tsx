/**
 * GameCritic — ReviewCard Component
 * Design: Obsidian Edge — glassmorphism card with hover glow
 */

import { Link } from "wouter";
import { Review, getScoreColor } from "@/data/reviews";
import { ScoreRing } from "./ScoreRing";
import { Calendar, Monitor } from "lucide-react";

interface ReviewCardProps {
  review: Review;
  featured?: boolean;
}

export function ReviewCard({ review, featured = false }: ReviewCardProps) {
  const scoreColor = getScoreColor(review.score);

  if (featured) {
    return (
      <Link href={`/reviews/${review.slug}`}>
        <article
          className="gc-card-hover group relative overflow-hidden rounded-xl cursor-pointer"
          style={{
            background: "oklch(0.20 0.012 260)",
            border: "1px solid oklch(1 0 0 / 10%)",
          }}
        >
          {/* Cover image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <img
              src={review.coverImage}
              alt={review.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.20 0.012 260) 0%, oklch(0.20 0.012 260 / 60%) 50%, transparent 100%)",
              }}
            />
            {/* Score badge */}
            <div className="absolute top-3 right-3">
              <ScoreRing score={review.score} size="sm" animate={false} showLabel={false} />
            </div>
            {/* Featured badge */}
            <div
              className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: "oklch(0.72 0.15 60 / 20%)",
                  border: "1px solid oklch(0.72 0.15 60 / 40%)",
                  color: "oklch(0.72 0.15 60)",
                  fontFamily: "'Inter', sans-serif",
                }}
            >
              Featured
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Genres */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {review.genre.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.50 0.12 200 / 15%)",
                    color: "oklch(0.60 0.12 200)",
                    fontFamily: "'Inter', sans-serif",
                    border: "1px solid oklch(0.50 0.12 200 / 25%)",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>

            <h3
              className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif", color: "oklch(0.95 0.005 260)" }}
            >
              {review.title}
            </h3>

            <p
              className="text-sm line-clamp-2 mb-4"
              style={{ color: "oklch(0.70 0.01 260)", fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}
            >
              {review.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" style={{ color: "oklch(0.55 0.01 260)" }}>
                  <Monitor size={12} />
                  <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {review.platform.slice(0, 2).join(" · ")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5" style={{ color: "oklch(0.55 0.01 260)" }}>
                <Calendar size={12} />
                <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {new Date(review.reviewDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, ${scoreColor}, oklch(0.50 0.12 200))` }}
          />
        </article>
      </Link>
    );
  }

  // Standard card
  return (
    <Link href={`/reviews/${review.slug}`}>
      <article
        className="gc-card-hover group flex gap-4 p-4 rounded-xl cursor-pointer"
        style={{
          background: "oklch(0.20 0.012 260)",
          border: "1px solid oklch(1 0 0 / 10%)",
        }}
      >
        {/* Thumbnail */}
        <div
          className="relative flex-shrink-0 overflow-hidden rounded-lg"
          style={{ width: "100px", height: "130px" }}
        >
          <img
            src={review.coverImage}
            alt={review.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            {/* Genres */}
            <div className="flex flex-wrap gap-1 mb-1.5">
              {review.genre.slice(0, 2).map((g) => (
                <span
                  key={g}
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    background: "oklch(0.65 0.22 285 / 15%)",
                    color: "oklch(0.70 0.12 285)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>

            <h3
              className="font-bold mb-1 group-hover:text-cyan-400 transition-colors truncate"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "1.05rem",
                color: "oklch(0.92 0.008 265)",
              }}
            >
              {review.title}
            </h3>

            <p
              className="text-xs line-clamp-2"
              style={{ color: "oklch(0.58 0.015 265)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}
            >
              {review.excerpt}
            </p>
          </div>

          {/* Score + date */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <div
                className="px-2 py-0.5 rounded text-sm font-bold"
                style={{
                  background: `${scoreColor}20`,
                  color: scoreColor,
                  fontFamily: "'Rajdhani', sans-serif",
                  border: `1px solid ${scoreColor}40`,
                }}
              >
                {review.score.toFixed(1)}
              </div>
            </div>
            <span
              className="text-xs"
              style={{ color: "oklch(0.45 0.012 265)", fontFamily: "'Inter', sans-serif" }}
            >
              {new Date(review.reviewDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
