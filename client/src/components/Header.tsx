/**
 * GameCritic — Header Component
 * Design: Classic Gaming — sticky header with gradient accent line, predictive search
 */

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Search, X, Gamepad2, Menu } from "lucide-react";
import { searchReviews, type Review } from "@/data/reviews";
import { SearchSuggestions } from "./SearchSuggestions";
import { AdSlot } from "./AdSlot";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Review[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setSearchResults(searchReviews(searchQuery));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSelect = (slug: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/reviews/${slug}`);
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleClearSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <>
      {/* Top banner ad */}
      <div className="w-full flex justify-center py-2 px-4" style={{ background: "oklch(0.15 0.01 260)" }}>
        <AdSlot slot="header-banner" className="max-w-4xl w-full" />
      </div>

      {/* Main header */}
      <header
        className="sticky top-0 z-50 w-full transition-all duration-300"
        style={{
          background: scrolled
            ? "oklch(0.15 0.01 260 / 95%)"
            : "oklch(0.15 0.01 260)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid oklch(1 0 0 / 8%)",
        }}
      >
        {/* Gradient accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.15 60), oklch(0.50 0.12 200), transparent)",
          }}
        />

        <div className="container">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2.5 group">
                <div
                  className="p-1.5 rounded-lg"
                  style={{
                    background: "oklch(0.72 0.15 60 / 15%)",
                    border: "1px solid oklch(0.72 0.15 60 / 30%)",
                  }}
                >
                  <Gamepad2
                    size={20}
                    style={{ color: "oklch(0.72 0.15 60)" }}
                  />
                </div>
                <span
                  className="text-xl font-bold tracking-wide gc-gradient-text"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  GameCritic
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { href: "/", label: "Home" },
                { href: "/reviews", label: "All Reviews" },
                { href: "/search", label: "Advanced Search" },
              ].map(({ href, label }) => (
                <Link key={href} href={href}>
                  <span
                    className="text-sm font-medium transition-colors hover:text-amber-400"
                    style={{
                      color: "oklch(0.75 0.01 260)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Search */}
            <div className="flex items-center gap-3">
              <div ref={searchRef} className="relative">
                {searchOpen ? (
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                      style={{
                        background: "oklch(0.20 0.012 260)",
                        border: "1px solid oklch(0.72 0.15 60 / 40%)",
                        width: "280px",
                      }}
                    >
                      <Search size={14} style={{ color: "oklch(0.72 0.15 60)" }} />
                      <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search games, genres, developers..."
                        className="bg-transparent outline-none flex-1 text-sm"
                        style={{
                          color: "oklch(0.92 0.008 260)",
                          fontFamily: "'Inter', sans-serif",
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            handleClearSearch();
                          } else if (e.key === "Enter" && searchResults.length > 0) {
                            handleSearchSelect(searchResults[0].slug);
                          }
                        }}
                      />
                      {searchQuery && (
                        <button
                          onClick={handleClearSearch}
                          className="flex-shrink-0 transition-colors hover:text-amber-400"
                          aria-label="Clear search"
                        >
                          <X size={14} style={{ color: "oklch(0.55 0.01 260)" }} />
                        </button>
                      )}
                    </div>

                    {/* Search suggestions dropdown */}
                    <SearchSuggestions
                      results={searchResults}
                      query={searchQuery}
                      onSelectResult={handleSearchSelect}
                    />
                  </div>
                ) : (
                  <button
                    onClick={handleSearchOpen}
                    className="p-2 rounded-lg transition-all hover:bg-opacity-80"
                    style={{
                      background: "oklch(0.20 0.012 260)",
                      border: "1px solid oklch(1 0 0 / 8%)",
                      color: "oklch(0.72 0.15 60)",
                    }}
                    aria-label="Search reviews"
                  >
                    <Search size={16} />
                  </button>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg"
                style={{
                  background: "oklch(0.20 0.012 260)",
                  border: "1px solid oklch(1 0 0 / 8%)",
                  color: "oklch(0.72 0.15 60)",
                }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu size={16} />
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileMenuOpen && (
            <div
              className="md:hidden py-3 border-t"
              style={{ borderColor: "oklch(1 0 0 / 6%)" }}
            >
              {[
                { href: "/", label: "Home" },
                { href: "/reviews", label: "All Reviews" },
                { href: "/search", label: "Advanced Search" },
              ].map(({ href, label }) => (
                <Link key={href} href={href}>
                  <span
                    className="block py-2 text-sm font-medium"
                    style={{ color: "oklch(0.70 0.01 260)", fontFamily: "'Inter', sans-serif" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
