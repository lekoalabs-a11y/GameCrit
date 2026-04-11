/**
 * GameCritic — AdSlot Component
 * Design: Obsidian Edge
 *
 * HOW TO ACTIVATE GOOGLE ADSENSE:
 * 1. Add your AdSense script to client/index.html:
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
 * 2. Replace the placeholder div below with your AdSense ins tag
 * 3. Set ADSENSE_ENABLED=true and provide your ad slot IDs
 */

interface AdSlotProps {
  slot: "header-banner" | "in-content" | "footer-banner" | "sidebar";
  className?: string;
}

const AD_DIMENSIONS: Record<AdSlotProps["slot"], { width: string; height: string; label: string }> = {
  "header-banner": { width: "100%", height: "90px", label: "Advertisement — 728×90 Leaderboard" },
  "in-content": { width: "100%", height: "250px", label: "Advertisement — 300×250 Rectangle" },
  "footer-banner": { width: "100%", height: "90px", label: "Advertisement — 728×90 Leaderboard" },
  sidebar: { width: "300px", height: "600px", label: "Advertisement — 300×600 Half Page" },
};

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  const { width, height, label } = AD_DIMENSIONS[slot];

  return (
    <div
      className={`gc-ad-slot ${className}`}
      style={{ width, height, minHeight: height }}
      aria-label="Advertisement"
      data-ad-slot={slot}
    >
      {/* 
        TO REPLACE WITH ADSENSE:
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
      <span>{label}</span>
    </div>
  );
}
