/**
 * GameCritic — Footer Component
 * Design: Obsidian Edge — dark footer with gradient accent and ad slot
 */

import { Link } from "wouter";
import { Gamepad2, Github, Twitter } from "lucide-react";
import { AdSlot } from "./AdSlot";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "oklch(0.08 0.01 265)",
        borderTop: "1px solid oklch(1 0 0 / 6%)",
      }}
    >
      {/* Footer banner ad */}
      <div className="w-full flex justify-center py-4 px-4" style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)" }}>
        <AdSlot slot="footer-banner" className="max-w-4xl w-full" />
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="p-1.5 rounded-lg"
                style={{
                  background: "oklch(0.75 0.18 195 / 15%)",
                  border: "1px solid oklch(0.75 0.18 195 / 30%)",
                }}
              >
                <Gamepad2 size={18} style={{ color: "oklch(0.75 0.18 195)" }} />
              </div>
              <span
                className="text-lg font-bold gc-gradient-text"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                GameCritic
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.50 0.015 265)", fontFamily: "'Inter', sans-serif" }}
            >
              Expert video game reviews with honest scores, in-depth analysis, and no compromise.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-sm font-semibold mb-3 uppercase tracking-widest"
              style={{ color: "oklch(0.65 0.015 265)", fontFamily: "'Inter', sans-serif" }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/reviews", label: "All Reviews" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span
                      className="text-sm transition-colors hover:text-cyan-400"
                      style={{ color: "oklch(0.55 0.015 265)", fontFamily: "'Inter', sans-serif" }}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Scoring guide */}
          <div>
            <h4
              className="text-sm font-semibold mb-3 uppercase tracking-widest"
              style={{ color: "oklch(0.65 0.015 265)", fontFamily: "'Inter', sans-serif" }}
            >
              Score Guide
            </h4>
            <div className="space-y-1.5">
              {[
                { range: "9.5–10", label: "Masterpiece", color: "#00e5ff" },
                { range: "9.0–9.4", label: "Outstanding", color: "#00e5ff" },
                { range: "8.0–8.9", label: "Great", color: "#69ff47" },
                { range: "7.0–7.9", label: "Good", color: "#ffd600" },
                { range: "6.0–6.9", label: "Average", color: "#ff9100" },
                { range: "< 6.0", label: "Poor", color: "#ff1744" },
              ].map(({ range, label, color }) => (
                <div key={range} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: color, boxShadow: `0 0 6px ${color}60` }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.55 0.015 265)", fontFamily: "'Inter', sans-serif" }}
                  >
                    <span style={{ color }}>{range}</span> — {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 pt-6"
          style={{ borderTop: "1px solid oklch(1 0 0 / 6%)" }}
        >
          <p
            className="text-xs"
            style={{ color: "oklch(0.40 0.01 265)", fontFamily: "'Inter', sans-serif" }}
          >
            © {year} GameCritic. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded transition-colors"
              style={{ color: "oklch(0.45 0.012 265)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.75 0.18 195)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.45 0.012 265)")}
            >
              <Twitter size={15} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded transition-colors"
              style={{ color: "oklch(0.45 0.012 265)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.75 0.18 195)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.45 0.012 265)")}
            >
              <Github size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
