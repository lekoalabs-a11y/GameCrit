/**
 * GameCritic — ScoreRing Component
 * Design: Obsidian Edge — animated SVG ring that fills based on score
 * Score range: 0–10
 */

import { useEffect, useRef, useState } from "react";
import { getScoreColor, getScoreLabel } from "@/data/reviews";

interface ScoreRingProps {
  score: number;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  showLabel?: boolean;
}

const SIZE_MAP = {
  sm: { px: 56, stroke: 4, fontSize: "0.85rem", labelSize: "0.55rem" },
  md: { px: 80, stroke: 5, fontSize: "1.1rem", labelSize: "0.6rem" },
  lg: { px: 120, stroke: 7, fontSize: "1.6rem", labelSize: "0.7rem" },
};

export function ScoreRing({ score, size = "md", animate = true, showLabel = true }: ScoreRingProps) {
  const { px, stroke, fontSize, labelSize } = SIZE_MAP[size];
  const radius = (px - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  const [progress, setProgress] = useState(animate ? 0 : score / 10);
  const hasAnimated = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start: number | null = null;
          const duration = 1200;
          const target = score / 10;

          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const eased = Math.min(elapsed / duration, 1);
            const easedValue = 1 - Math.pow(1 - eased, 3); // ease-out cubic
            setProgress(easedValue * target);
            if (elapsed < duration) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animate, score]);

  const strokeDashoffset = circumference * (1 - progress);
  const cx = px / 2;
  const cy = px / 2;

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center justify-center flex-col"
      style={{ width: px, height: px }}
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        className="absolute inset-0 gc-score-ring"
        style={{ "--score-color": color } as React.CSSProperties}
      >
        {/* Background track */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="oklch(1 0 0 / 8%)"
          strokeWidth={stroke}
        />
        {/* Progress arc */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{
            filter: `drop-shadow(0 0 6px ${color}80)`,
            transition: animate ? "none" : undefined,
          }}
        />
      </svg>

      {/* Score text */}
      <div className="relative z-10 flex flex-col items-center leading-none">
        <span
          style={{ fontSize, color, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, lineHeight: 1 }}
        >
          {score.toFixed(1)}
        </span>
        {showLabel && (
          <span
            style={{
              fontSize: labelSize,
              color: "oklch(0.58 0.02 265)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginTop: "2px",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
