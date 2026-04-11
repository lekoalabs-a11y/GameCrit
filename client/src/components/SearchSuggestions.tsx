/**
 * GameCritic — SearchSuggestions Component
 * Design: Classic Gaming — predictive search dropdown with suggestions
 */

import { motion, AnimatePresence } from "framer-motion";
import { Review } from "@/data/reviews";

interface SearchSuggestionsProps {
  results: Review[];
  query: string;
  onSelectResult: (slug: string) => void;
  isLoading?: boolean;
}

export function SearchSuggestions({
  results,
  query,
  onSelectResult,
  isLoading = false,
}: SearchSuggestionsProps) {
  if (!query.trim() || query.trim().length < 2) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden shadow-2xl z-50"
        style={{
          background: "oklch(0.20 0.012 260)",
          border: "1px solid oklch(1 0 0 / 10%)",
          width: "320px",
          boxShadow: "0 20px 60px oklch(0 0 0 / 60%)",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {isLoading ? (
          <div className="px-4 py-3 text-sm" style={{ color: "oklch(0.55 0.01 260)" }}>
            Searching...
          </div>
        ) : results.length > 0 ? (
          <motion.div>
            {/* Results header */}
            <div
              className="px-4 py-2 text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "oklch(0.72 0.15 60)",
                borderBottom: "1px solid oklch(1 0 0 / 8%)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Game Reviews
            </div>

            {/* Results list */}
            {results.slice(0, 8).map((r, idx) => (
              <motion.button
                key={r.slug}
                onClick={() => onSelectResult(r.slug)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                style={{ borderBottom: "1px solid oklch(1 0 0 / 5%)" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.25 0.012 260)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {/* Cover image */}
                <img
                  src={r.coverImage}
                  alt={r.title}
                  className="w-10 h-12 object-cover rounded"
                  loading="lazy"
                />

                {/* Title and meta */}
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-semibold truncate"
                    style={{
                      color: "oklch(0.92 0.008 260)",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {r.title}
                  </div>
                  <div
                    className="text-xs truncate"
                    style={{
                      color: "oklch(0.55 0.01 260)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {r.genre.slice(0, 2).join(" · ")}
                  </div>
                </div>

                {/* Score badge */}
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold flex-shrink-0"
                  style={{
                    background: "oklch(0.72 0.15 60 / 15%)",
                    color: "oklch(0.72 0.15 60)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {r.score.toFixed(1)}
                </div>
              </motion.button>
            ))}

            {/* Show more indicator */}
            {results.length > 8 && (
              <div
                className="px-4 py-2 text-xs text-center"
                style={{
                  color: "oklch(0.55 0.01 260)",
                  borderTop: "1px solid oklch(1 0 0 / 8%)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                +{results.length - 8} more results
              </div>
            )}
          </motion.div>
        ) : (
          <div
            className="px-4 py-3 text-sm"
            style={{
              color: "oklch(0.55 0.01 260)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            No reviews found for "{query}"
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
