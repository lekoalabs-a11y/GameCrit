import { Link } from "wouter";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function NotFound() {
  useSEO({ title: "404 — Page Not Found | GameCritic" });

  return (
    <main className="container flex flex-col items-center justify-center py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="text-8xl md:text-9xl font-bold mb-4 gc-gradient-text"
          style={{ fontFamily: "'Rajdhani', sans-serif", lineHeight: 1 }}
        >
          404
        </div>

        <h1
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "oklch(0.92 0.008 265)" }}
        >
          Game Over — Page Not Found
        </h1>

        <p
          className="text-sm mb-8 max-w-sm mx-auto"
          style={{ color: "oklch(0.55 0.015 265)", fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
        >
          The page you're looking for doesn't exist. It may have been moved, deleted, or you may have typed the URL incorrectly.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <button
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: "oklch(0.75 0.18 195)",
                color: "oklch(0.08 0.01 195)",
                fontFamily: "'Inter', sans-serif",
                boxShadow: "0 0 20px oklch(0.75 0.18 195 / 25%)",
              }}
            >
              <Home size={14} />
              Back to Home
            </button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: "oklch(0.18 0.015 265)",
              color: "oklch(0.70 0.015 265)",
              border: "1px solid oklch(1 0 0 / 8%)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
        </div>
      </motion.div>
    </main>
  );
}
