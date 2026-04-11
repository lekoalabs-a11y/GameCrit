/**
 * GameCritic — GenreFilter Component
 * Design: Classic Gaming — genre filter buttons with toggle state
 */

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface GenreFilterProps {
  genres: string[];
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
  onClear: () => void;
}

export function GenreFilter({
  genres,
  selectedGenres,
  onGenreToggle,
  onClear,
}: GenreFilterProps) {
  return (
    <div className="w-full">
      {/* Filter header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ fontFamily: "'Poppins', sans-serif", color: "oklch(0.95 0.005 260)" }}
        >
          Filter by Genre
        </h3>
        {selectedGenres.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-medium transition-colors hover:text-amber-400"
            style={{ color: "oklch(0.72 0.15 60)", fontFamily: "'Inter', sans-serif" }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Genre buttons */}
      <motion.div
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <motion.button
              key={genre}
              onClick={() => onGenreToggle(genre)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5"
              style={{
                background: isSelected
                  ? "oklch(0.72 0.15 60 / 25%)"
                  : "oklch(0.20 0.012 260)",
                border: isSelected
                  ? "1px solid oklch(0.72 0.15 60 / 60%)"
                  : "1px solid oklch(1 0 0 / 12%)",
                color: isSelected
                  ? "oklch(0.72 0.15 60)"
                  : "oklch(0.70 0.01 260)",
                fontFamily: "'Inter', sans-serif",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {genre}
              {isSelected && <X size={12} />}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Selected count */}
      {selectedGenres.length > 0 && (
        <motion.div
          className="mt-3 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: "oklch(0.55 0.01 260)", fontFamily: "'Inter', sans-serif" }}
        >
          {selectedGenres.length} genre{selectedGenres.length !== 1 ? "s" : ""} selected
        </motion.div>
      )}
    </div>
  );
}
