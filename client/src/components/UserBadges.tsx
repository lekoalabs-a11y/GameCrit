/**
 * GameCritic — UserBadges Component
 * Design: Obsidian Edge — affichage des badges des commentateurs
 */

import { motion } from "framer-motion";
import { BADGES, type BadgeType } from "@/data/comments";

interface UserBadgesProps {
  badges: BadgeType[];
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function UserBadges({ badges, size = "sm", showLabel = false }: UserBadgesProps) {
  if (badges.length === 0) return null;

  const sizeMap = {
    sm: { container: "gap-1", badge: "text-xs px-1.5 py-0.5" },
    md: { container: "gap-1.5", badge: "text-sm px-2 py-1" },
    lg: { container: "gap-2", badge: "text-base px-3 py-1.5" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center flex-wrap ${currentSize.container}`}>
      {badges.map((badgeType, index) => {
        const badge = BADGES[badgeType];
        return (
          <motion.div
            key={badgeType}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className={`${currentSize.badge} rounded-full font-semibold flex items-center gap-1 transition-all hover:scale-105`}
            style={{
              background: `${badge.color}15`,
              border: `1px solid ${badge.color}40`,
              color: badge.color,
              fontFamily: "'Rajdhani', sans-serif",
            }}
            title={badge.description}
          >
            <span>{badge.icon}</span>
            {showLabel && <span>{badge.label}</span>}
          </motion.div>
        );
      })}
    </div>
  );
}
