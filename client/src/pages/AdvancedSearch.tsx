/**
 * GameCritic — Advanced Search Page
 * Design: Classic Gaming — advanced search with filters and sorting
 */

import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import {
  getAllGenres,
  getAllPlatforms,
  advancedSearch,
  type SortOption,
  type AdvancedSearchFilters,
} from "@/data/reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { AdvancedSearchFilters as AdvancedSearchFiltersComponent } from "@/components/AdvancedSearchFilters";
import { AdSlot } from "@/components/AdSlot";

export default function AdvancedSearch() {
  useSEO({
    title: "Advanced Search — GameCritic",
    description: "Search and filter video game reviews by genre, platform, score, and more.",
    type: "website",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(10);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const genres = getAllGenres();
  const platforms = getAllPlatforms();

  const results = useMemo(() => {
    return advancedSearch({
      query: searchQuery,
      genres: selectedGenres.length > 0 ? selectedGenres : undefined,
      platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
      minScore: minScore > 0 ? minScore : undefined,
      maxScore: maxScore < 10 ? maxScore : undefined,
      sortBy,
    });
  }, [searchQuery, selectedGenres, selectedPlatforms, minScore, maxScore, sortBy]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setMinScore(0);
    setMaxScore(10);
    setSortBy("newest");
  };

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedGenres.length > 0 ||
    selectedPlatforms.length > 0 ||
    minScore > 0 ||
    maxScore < 10 ||
    sortBy !== "newest";

  return (
    <main>
      {/* Header */}
      <section
        className="py-8"
        style={{
          background: "linear-gradient(135deg, oklch(0.18 0.01 260) 0%, oklch(0.15 0.01 260) 100%)",
          borderBottom: "1px solid oklch(1 0 0 / 8%)",
        }}
      >
        <div className="container">
          <Link href="/">
            <button
              className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors hover:text-amber-400"
              style={{
                color: "oklch(0.72 0.15 60)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </Link>

          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{
              color: "oklch(0.95 0.005 260)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Advanced Search
          </h1>
          <p
            style={{
              color: "oklch(0.70 0.01 260)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Find your perfect game with powerful filters and sorting options
          </p>
        </div>
      </section>

      {/* Ad placement */}
      <div className="container py-4 flex justify-center">
        <AdSlot slot="in-content" className="max-w-4xl w-full" />
      </div>

      {/* Main content */}
      <section className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <div className="lg:col-span-1">
            <AdvancedSearchFiltersComponent
              genres={genres}
              platforms={platforms}
              selectedGenres={selectedGenres}
              selectedPlatforms={selectedPlatforms}
              minScore={minScore}
              maxScore={maxScore}
              sortBy={sortBy}
              onGenreChange={setSelectedGenres}
              onPlatformChange={setSelectedPlatforms}
              onScoreChange={(min, max) => {
                setMinScore(min);
                setMaxScore(max);
              }}
              onSortChange={setSortBy}
              onReset={handleReset}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Search input */}
            <div className="mb-8">
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-lg"
                style={{
                  background: "oklch(0.20 0.012 260)",
                  border: "1px solid oklch(0.72 0.15 60 / 40%)",
                }}
              >
                <Search size={18} style={{ color: "oklch(0.72 0.15 60)" }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by game title, developer, or publisher..."
                  className="bg-transparent outline-none flex-1 text-sm"
                  style={{
                    color: "oklch(0.92 0.008 260)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
              </div>
            </div>

            {/* Results header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2
                  className="text-xl font-bold"
                  style={{
                    color: "oklch(0.95 0.005 260)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {results.length} Results
                </h2>
                {isFiltered && (
                  <p
                    className="text-sm mt-1"
                    style={{
                      color: "oklch(0.70 0.01 260)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Filtered by:{" "}
                    {[
                      searchQuery && `"${searchQuery}"`,
                      selectedGenres.length > 0 &&
                        `${selectedGenres.join(", ")}`,
                      selectedPlatforms.length > 0 &&
                        `${selectedPlatforms.join(", ")}`,
                      (minScore > 0 || maxScore < 10) &&
                        `${minScore.toFixed(1)}-${maxScore.toFixed(1)} score`,
                    ]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>
                )}
              </div>
            </div>

            {/* Results grid */}
            {results.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {results.map((review, idx) => (
                  <motion.div
                    key={review.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <ReviewCard review={review} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Search
                  size={48}
                  style={{
                    color: "oklch(0.50 0.01 260)",
                    marginBottom: "1rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{
                    color: "oklch(0.70 0.01 260)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  No reviews found
                </h3>
                <p
                  style={{
                    color: "oklch(0.55 0.01 260)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 rounded-lg font-medium text-sm transition-all"
                  style={{
                    background: "oklch(0.72 0.15 60)",
                    color: "oklch(0.15 0.01 60)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Ad placement */}
      <div className="container py-8 flex justify-center">
        <AdSlot slot="footer-banner" className="max-w-4xl w-full" />
      </div>
    </main>
  );
}
