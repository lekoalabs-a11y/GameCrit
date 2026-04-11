/**
 * GameCritic — Review Detail Page
 * Design: Obsidian Edge — full review with score ring, pros/cons, ad slots
 */

import { useParams, Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, XCircle, Calendar, Monitor, Building2, Tag } from "lucide-react";
import { getReviewBySlug, getLatestReviews, getScoreColor } from "@/data/reviews";
import { ScoreRing } from "@/components/ScoreRing";
import { ReviewCard } from "@/components/ReviewCard";
import { AdSlot } from "@/components/AdSlot";
import { CommentsSection } from "@/components/CommentsSection";

export default function ReviewDetail() {
  const { slug } = useParams<{ slug: string }>();
  const review = getReviewBySlug(slug);
  const related = getLatestReviews().filter((r) => r.slug !== slug).slice(0, 3);

  useSEO({
    title: review ? `${review.title} Review — GameCritic` : "Review Not Found — GameCritic",
    description: review?.excerpt,
    image: review?.coverImage,
    type: "article",
  });

  if (!review) {
    return (
      <main className="container py-20 text-center">
        <h1
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.95 0.005 265)" }}
        >
          Review Not Found
        </h1>
        <p className="mb-6" style={{ color: "oklch(0.55 0.015 265)", fontFamily: "'Inter', sans-serif" }}>
          This review doesn't exist or may have been removed.
        </p>
        <Link href="/">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{
              background: "oklch(0.75 0.18 195)",
              color: "oklch(0.08 0.01 195)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <ArrowLeft size={14} />
            Back to Home
          </button>
        </Link>
      </main>
    );
  }

  const scoreColor = getScoreColor(review.score);

  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "400px" }}
      >
        {/* Background cover */}
        <div className="absolute inset-0">
          <img
            src={review.coverImage}
            alt={review.title}
            className="w-full h-full object-cover"
            style={{ opacity: 0.25 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.10 0.012 265 / 85%) 0%, oklch(0.10 0.012 265) 100%)",
            }}
          />
        </div>

        <div className="container relative z-10 pt-8 pb-10">
          {/* Back link */}
          <Link href="/">
            <button
              className="inline-flex items-center gap-1.5 mb-6 text-sm transition-colors hover:text-cyan-400"
              style={{ color: "oklch(0.55 0.015 265)", fontFamily: "'Inter', sans-serif" }}
            >
              <ArrowLeft size={14} />
              Back to Reviews
            </button>
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Cover image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex-shrink-0"
            >
              <div
                className="overflow-hidden rounded-xl shadow-2xl"
                style={{
                  width: "180px",
                  height: "240px",
                  boxShadow: `0 20px 60px oklch(0 0 0 / 60%), 0 0 40px ${scoreColor}20`,
                }}
              >
                <img
                  src={review.coverImage}
                  alt={review.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex-1"
            >
              {/* Genres */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {review.genre.map((g) => (
                  <span
                    key={g}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.65 0.22 285 / 15%)",
                      color: "oklch(0.75 0.15 285)",
                      border: "1px solid oklch(0.65 0.22 285 / 25%)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1
                className="text-3xl md:text-5xl font-bold mb-3 leading-tight"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.97 0.005 265)" }}
              >
                {review.title}
              </h1>

              {/* Excerpt */}
              <p
                className="text-sm md:text-base mb-5 max-w-xl"
                style={{
                  color: "oklch(0.68 0.015 265)",
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.7,
                }}
              >
                {review.excerpt}
              </p>

              {/* Meta grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Building2, label: "Developer", value: review.developer },
                  { icon: Tag, label: "Publisher", value: review.publisher },
                  { icon: Monitor, label: "Platforms", value: review.platform.join(", ") },
                  {
                    icon: Calendar,
                    label: "Released",
                    value: new Date(review.releaseDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }),
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="p-3 rounded-lg"
                    style={{
                      background: "oklch(0.14 0.014 265 / 80%)",
                      border: "1px solid oklch(1 0 0 / 6%)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon size={11} style={{ color: "oklch(0.75 0.18 195)" }} />
                      <span
                        className="text-xs uppercase tracking-wider"
                        style={{ color: "oklch(0.50 0.015 265)", fontFamily: "'Inter', sans-serif" }}
                      >
                        {label}
                      </span>
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "oklch(0.82 0.008 265)", fontFamily: "'Inter', sans-serif" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Score ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0 flex flex-col items-center gap-2"
            >
              <ScoreRing score={review.score} size="lg" animate />
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: "oklch(0.45 0.012 265)", fontFamily: "'Inter', sans-serif" }}
              >
                GameCritic Score
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container pb-12">
        <div className="max-w-3xl mx-auto">

          {/* Pros & Cons */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          >
            {/* Pros */}
            <div
              className="p-5 rounded-xl"
              style={{
                background: "oklch(0.14 0.014 265)",
                border: "1px solid oklch(0.78 0.18 140 / 20%)",
              }}
            >
              <h3
                className="text-base font-bold mb-3 flex items-center gap-2"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.78 0.18 140)" }}
              >
                <CheckCircle2 size={16} />
                Pros
              </h3>
              <ul className="space-y-2">
                {review.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: "oklch(0.78 0.18 140)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.75 0.01 265)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}
                    >
                      {pro}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div
              className="p-5 rounded-xl"
              style={{
                background: "oklch(0.14 0.014 265)",
                border: "1px solid oklch(0.65 0.22 25 / 20%)",
              }}
            >
              <h3
                className="text-base font-bold mb-3 flex items-center gap-2"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.65 0.22 25)" }}
              >
                <XCircle size={16} />
                Cons
              </h3>
              <ul className="space-y-2">
                {review.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: "oklch(0.65 0.22 25)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.75 0.01 265)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}
                    >
                      {con}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* In-content ad */}
          <div className="flex justify-center mb-8">
            <AdSlot slot="in-content" className="max-w-xl w-full" />
          </div>

          {/* Full review content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="gc-prose"
            dangerouslySetInnerHTML={{ __html: review.content }}
          />

          {/* Review date */}
          <div
            className="mt-8 pt-6 flex items-center gap-2"
            style={{ borderTop: "1px solid oklch(1 0 0 / 6%)" }}
          >
            <Calendar size={13} style={{ color: "oklch(0.45 0.012 265)" }} />
            <span
              className="text-xs"
              style={{ color: "oklch(0.45 0.012 265)", fontFamily: "'Inter', sans-serif" }}
            >
              Reviewed on{" "}
              {new Date(review.reviewDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* ── Comments Section ── */}
      <CommentsSection reviewSlug={review.slug} />

      {/* ── More Reviews ── */}
      {related.length > 0 && (
        <section
          className="py-10"
          style={{ borderTop: "1px solid oklch(1 0 0 / 6%)" }}
        >
          <div className="container">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-1 h-6 rounded-full"
                style={{ background: "linear-gradient(180deg, oklch(0.75 0.18 195), oklch(0.65 0.22 285))" }}
              />
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.95 0.005 265)" }}
              >
                More Reviews
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => (
                <ReviewCard key={r.slug} review={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
