/**
 * GameCritic — AdvancedSearchFilters Component
 * Design: Classic Gaming — filter panel with genre, platform, score, and sort options
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { SortOption } from "@/data/reviews";

interface AdvancedSearchFiltersProps {
  genres: string[];
  platforms: string[];
  selectedGenres: string[];
  selectedPlatforms: string[];
  minScore: number;
  maxScore: number;
  sortBy: SortOption;
  onGenreChange: (genres: string[]) => void;
  onPlatformChange: (platforms: string[]) => void;
  onScoreChange: (min: number, max: number) => void;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "highest-score", label: "Highest Score" },
  { value: "lowest-score", label: "Lowest Score" },
  { value: "title", label: "Title (A-Z)" },
];

export function AdvancedSearchFilters({
  genres,
  platforms,
  selectedGenres,
  selectedPlatforms,
  minScore,
  maxScore,
  sortBy,
  onGenreChange,
  onPlatformChange,
  onScoreChange,
  onSortChange,
  onReset,
}: AdvancedSearchFiltersProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("genres");

  const toggleGenre = (genre: string) => {
    const updated = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    onGenreChange(updated);
  };

  const togglePlatform = (platform: string) => {
    const updated = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter((p) => p !== platform)
      : [...selectedPlatforms, platform];
    onPlatformChange(updated);
  };

  const isFiltered =
    selectedGenres.length > 0 ||
    selectedPlatforms.length > 0 ||
    minScore > 0 ||
    maxScore < 10 ||
    sortBy !== "newest";

  return (
    <div
      className="rounded-xl p-6 space-y-6"
      style={{
        background: "oklch(0.20 0.012 260)",
        border: "1px solid oklch(1 0 0 / 10%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3
          className="text-lg font-bold"
          style={{
            color: "oklch(0.95 0.005 260)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Filters
        </h3>
        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold transition-colors hover:text-amber-400"
            style={{
              color: "oklch(0.72 0.15 60)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <X size={14} />
            Clear All
          </button>
        )}
      </div>

      {/* Genres */}
      <div>
        <button
          onClick={() =>
            setExpandedSection(expandedSection === "genres" ? null : "genres")
          }
          className="w-full flex items-center justify-between py-2 transition-colors hover:text-amber-400"
          style={{ color: "oklch(0.92 0.008 260)" }}
        >
          <span
            className="font-semibold text-sm"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Genres
          </span>
          <motion.div
            animate={{ rotate: expandedSection === "genres" ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{
            height: expandedSection === "genres" ? "auto" : 0,
            opacity: expandedSection === "genres" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 pt-3">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: selectedGenres.includes(genre)
                    ? "oklch(0.72 0.15 60)"
                    : "oklch(0.25 0.012 260)",
                  color: selectedGenres.includes(genre)
                    ? "oklch(0.15 0.01 60)"
                    : "oklch(0.70 0.01 260)",
                  border: selectedGenres.includes(genre)
                    ? "none"
                    : "1px solid oklch(1 0 0 / 10%)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Platforms */}
      <div>
        <button
          onClick={() =>
            setExpandedSection(expandedSection === "platforms" ? null : "platforms")
          }
          className="w-full flex items-center justify-between py-2 transition-colors hover:text-amber-400"
          style={{ color: "oklch(0.92 0.008 260)" }}
        >
          <span
            className="font-semibold text-sm"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Platforms
          </span>
          <motion.div
            animate={{ rotate: expandedSection === "platforms" ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{
            height: expandedSection === "platforms" ? "auto" : 0,
            opacity: expandedSection === "platforms" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 pt-3">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: selectedPlatforms.includes(platform)
                    ? "oklch(0.72 0.15 60)"
                    : "oklch(0.25 0.012 260)",
                  color: selectedPlatforms.includes(platform)
                    ? "oklch(0.15 0.01 60)"
                    : "oklch(0.70 0.01 260)",
                  border: selectedPlatforms.includes(platform)
                    ? "none"
                    : "1px solid oklch(1 0 0 / 10%)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {platform}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Score Range */}
      <div>
        <button
          onClick={() =>
            setExpandedSection(expandedSection === "score" ? null : "score")
          }
          className="w-full flex items-center justify-between py-2 transition-colors hover:text-amber-400"
          style={{ color: "oklch(0.92 0.008 260)" }}
        >
          <span
            className="font-semibold text-sm"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Score Range
          </span>
          <motion.div
            animate={{ rotate: expandedSection === "score" ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{
            height: expandedSection === "score" ? "auto" : 0,
            opacity: expandedSection === "score" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="space-y-3 pt-3">
            <div className="flex items-center gap-3">
              <label
                style={{
                  color: "oklch(0.70 0.01 260)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                }}
              >
                Min:
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={minScore}
                onChange={(e) =>
                  onScoreChange(
                    Math.min(Number(e.target.value), maxScore),
                    maxScore
                  )
                }
                className="w-16 px-2 py-1 rounded text-sm text-center"
                style={{
                  background: "oklch(0.15 0.01 260)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                  color: "oklch(0.92 0.008 260)",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <label
                style={{
                  color: "oklch(0.70 0.01 260)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                }}
              >
                Max:
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={maxScore}
                onChange={(e) =>
                  onScoreChange(
                    minScore,
                    Math.max(Number(e.target.value), minScore)
                  )
                }
                className="w-16 px-2 py-1 rounded text-sm text-center"
                style={{
                  background: "oklch(0.15 0.01 260)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                  color: "oklch(0.92 0.008 260)",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sort */}
      <div>
        <label
          style={{
            color: "oklch(0.92 0.008 260)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.875rem",
            fontWeight: "600",
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full px-3 py-2 rounded-lg text-sm"
          style={{
            background: "oklch(0.15 0.01 260)",
            border: "1px solid oklch(1 0 0 / 10%)",
            color: "oklch(0.92 0.008 260)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
