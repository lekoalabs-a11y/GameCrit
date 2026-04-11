/**
 * GameCritic — Home Page
 * Design: Classic Gaming — hero banner, featured reviews, genre filter, latest reviews grid
 */

import { useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Zap } from "lucide-react";
import { getLatestReviews, getFeaturedReviews, getAllGenres, getReviewsByGenres } from "@/data/reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { GenreFilter } from "@/components/GenreFilter";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663530105637/WpQQxE6BG26rErDtiDLBRY/hero-banner-oABQP86xKYenxf8RTVZmhn.webp";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  useSEO({
    title: "GameCritic — Expert Video Game Reviews",
    description:
      "GameCritic delivers in-depth, expert video game reviews with scores, pros & cons, and detailed analysis. Find your next great game.",
    type: "website",
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const allGenres = getAllGenres();
  const featured = getFeaturedReviews();
  const latest = selectedGenres.length > 0 ? getReviewsByGenres(selectedGenres) : getLatestReviews();

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleClearGenres = () => {
    setSelectedGenres([]);
  };

  return (
    <main>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "520px" }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="GameCritic Hero"
            className="w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.15 0.01 260 / 90%) 0%, oklch(0.15 0.01 260 / 70%) 50%, oklch(0.18 0.01 260 / 85%) 100%)",
            }}
          />
        </div>

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.72 0.15 60) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.15 60) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container relative z-10 py-16 md:py-24">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            {/* Label */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: "oklch(0.72 0.15 60 / 15%)",
                  border: "1px solid oklch(0.72 0.15 60 / 35%)",
                  color: "oklch(0.72 0.15 60)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <Zap size={10} />
                Expert Game Reviews
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", color: "oklch(0.97 0.005 260)" }}
            >
              Your Trusted{" "}
              <span className="gc-gradient-text">Gaming</span>
              <br />
              Review Source
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg mb-8 max-w-lg"
              style={{
                color: "oklch(0.68 0.015 265)",
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.7,
              }}
            >
              In-depth reviews, honest scores, and detailed analysis to help you find your next great game.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <Link href="/reviews">
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
                  style={{
                    background: "oklch(0.72 0.15 60)",
                    color: "oklch(0.15 0.01 60)",
                    fontFamily: "'Inter', sans-serif",
                    boxShadow: "0 0 20px oklch(0.72 0.15 60 / 30%)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 30px oklch(0.72 0.15 60 / 50%)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 20px oklch(0.72 0.15 60 / 30%)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Browse All Reviews
                  <ArrowRight size={15} />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            {[
              { icon: Star, label: "Reviews Published", value: `${latest.length}+` },
              {
                icon: TrendingUp,
                label: "Avg. Score",
                value: latest.length > 0 ? (latest.reduce((a, r) => a + r.score, 0) / latest.length).toFixed(1) : "N/A",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    background: "oklch(0.72 0.15 60 / 10%)",
                    border: "1px solid oklch(0.72 0.15 60 / 20%)",
                  }}
                >
                  <Icon size={16} style={{ color: "oklch(0.72 0.15 60)" }} />
                </div>
                <div>
                  <div
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Poppins', sans-serif", color: "oklch(0.95 0.005 260)" }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.55 0.01 260)", fontFamily: "'Inter', sans-serif" }}
                  >
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Reviews ── */}
      <section className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-1 h-6 rounded-full"
                style={{
                  background: "linear-gradient(180deg, oklch(0.72 0.15 60), oklch(0.50 0.12 200))",
                }}
              />
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "'Poppins', sans-serif", color: "oklch(0.95 0.005 260)" }}
              >
                Featured Reviews
              </h2>
            </div>
            <Link href="/reviews">
              <span
                className="text-sm flex items-center gap-1 transition-colors hover:text-amber-400"
                style={{ color: "oklch(0.55 0.01 260)", fontFamily: "'Inter', sans-serif" }}
              >
                View all <ArrowRight size={13} />
              </span>
            </Link>
          </div>

          {/* Featured grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.slice(0, 3).map((review, i) => (
              <motion.div
                key={review.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <ReviewCard review={review} featured />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Genre Filter ── */}
      <section className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-xl"
          style={{
            background: "oklch(0.20 0.012 260)",
            border: "1px solid oklch(1 0 0 / 10%)",
          }}
        >
          <GenreFilter
            genres={allGenres}
            selectedGenres={selectedGenres}
            onGenreToggle={handleGenreToggle}
            onClear={handleClearGenres}
          />
        </motion.div>
      </section>

      {/* ── Latest Reviews ── */}
      <section className="container pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-1 h-6 rounded-full"
              style={{
                background: "linear-gradient(180deg, oklch(0.50 0.12 200), oklch(0.72 0.15 60))",
              }}
            />
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "'Poppins', sans-serif", color: "oklch(0.95 0.005 260)" }}
            >
              {selectedGenres.length > 0 ? `${selectedGenres.join(", ")} Reviews` : "Latest Reviews"}
            </h2>
          </div>

          {latest.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latest.map((review, i) => (
                <motion.div
                  key={review.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p
                style={{ color: "oklch(0.55 0.01 260)", fontFamily: "'Inter', sans-serif" }}
              >
                No reviews found for the selected genres. Try a different combination.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </main>
  );
}
