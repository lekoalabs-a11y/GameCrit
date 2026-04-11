/**
 * GameCritic — All Reviews Page
 * Design: Obsidian Edge — full review listing with search and filters
 */

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { Search, SlidersHorizontal } from "lucide-react";
import { getLatestReviews, searchReviews } from "@/data/reviews";
import { ReviewCard } from "@/components/ReviewCard";

const ALL_GENRES = ["Action", "RPG", "Strategy", "Platformer", "Roguelite", "Survival", "Adventure", "Noir", "Sci-Fi", "Dark Fantasy", "Cyberpunk", "4X", "Stealth", "Thriller", "Open World"];

export default function Reviews() {
  useSEO({
    title: "All Reviews — GameCritic",
    description: "Browse all video game reviews on GameCritic. Filter by genre, search by title, and find your next great game.",
  });

  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const allReviews = getLatestReviews();

  const filtered = useMemo(() => {
    let result = query.trim().length >= 2 ? searchReviews(query) : allReviews;
    if (selectedGenre) {
      result = result.filter((r) => r.genre.includes(selectedGenre));
    }
    return result;
  }, [query, selectedGenre, allReviews]);

  return (
    <main className="container py-10">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.95 0.005 265)" }}
        >
          All Reviews
        </h1>
        <p
          className="text-sm"
          style={{ color: "oklch(0.55 0.015 265)", fontFamily: "'Inter', sans-serif" }}
        >
          {allReviews.length} reviews published
        </p>
      </motion.div>

      {/* Search + filters */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        {/* Search bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: "oklch(0.14 0.014 265)",
            border: "1px solid oklch(1 0 0 / 8%)",
          }}
        >
          <Search size={16} style={{ color: "oklch(0.55 0.015 265)", flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, genre, developer, or platform..."
            className="bg-transparent outline-none flex-1 text-sm"
            style={{
              color: "oklch(0.92 0.008 265)",
              fontFamily: "'Inter', sans-serif",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs px-2 py-0.5 rounded"
              style={{ color: "oklch(0.55 0.015 265)", fontFamily: "'Inter', sans-serif" }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Genre filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGenre(null)}
            className="px-3 py-1 rounded-full text-xs font-medium transition-all"
            style={{
              background: selectedGenre === null ? "oklch(0.75 0.18 195)" : "oklch(0.18 0.015 265)",
              color: selectedGenre === null ? "oklch(0.08 0.01 195)" : "oklch(0.60 0.015 265)",
              border: `1px solid ${selectedGenre === null ? "transparent" : "oklch(1 0 0 / 8%)"}`,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            All
          </button>
          {ALL_GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                background: selectedGenre === genre ? "oklch(0.65 0.22 285 / 25%)" : "oklch(0.18 0.015 265)",
                color: selectedGenre === genre ? "oklch(0.75 0.15 285)" : "oklch(0.60 0.015 265)",
                border: `1px solid ${selectedGenre === genre ? "oklch(0.65 0.22 285 / 40%)" : "oklch(1 0 0 / 8%)"}`,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div
          className="text-center py-16"
          style={{ color: "oklch(0.50 0.015 265)", fontFamily: "'Inter', sans-serif" }}
        >
          <SlidersHorizontal size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">No reviews match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((review, i) => (
            <motion.div
              key={review.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
