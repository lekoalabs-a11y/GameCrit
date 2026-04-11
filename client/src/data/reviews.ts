/**
 * GameCritic — Review Data Store
 * Design: Obsidian Edge (Dark Luxury / Premium Gaming Editorial)
 *
 * HOW TO ADD A NEW REVIEW:
 * 1. Add a new object to the `reviews` array below
 * 2. Fill in all required fields (slug must be unique and URL-safe)
 * 3. No code changes needed elsewhere — the site auto-discovers all reviews
 */

export interface Review {
  slug: string;
  title: string;
  coverImage: string;
  score: number; // 0–10
  excerpt: string;
  genre: string[];
  platform: string[];
  developer: string;
  publisher: string;
  releaseDate: string;
  reviewDate: string;
  pros: string[];
  cons: string[];
  content: string; // Markdown-compatible HTML string
  featured?: boolean;
}

export const reviews: Review[] = [
  {
    slug: "neon-abyss-ii",
    title: "Neon Abyss II",
    coverImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663530105637/WpQQxE6BG26rErDtiDLBRY/review-placeholder-1-efXYWMFqGRb79oYodNGuGZ.png",
    score: 9.2,
    excerpt:
      "A relentless, neon-soaked descent into procedural chaos that perfects everything its predecessor promised. Neon Abyss II is a masterclass in roguelite design.",
    genre: ["Roguelike", "Action", "Platformer"],
    platform: ["PC", "PS5", "Xbox Series X"],
    developer: "Veewo Games",
    publisher: "Team17",
    releaseDate: "2024-11-15",
    reviewDate: "2024-11-20",
    featured: true,
    pros: [
      "Incredibly tight and responsive controls",
      "Massive variety of items and synergies",
      "Stunning neon visual aesthetic",
      "Excellent soundtrack that adapts to gameplay",
      "Deep replayability with unlockable characters",
    ],
    cons: [
      "Early game can feel overwhelming for newcomers",
      "Some item descriptions are vague",
      "Occasional performance dips in late-game chaos",
    ],
    content: `<p>Neon Abyss II arrives as one of the most anticipated sequels in the roguelite genre, and it delivers on nearly every front. Veewo Games has taken the frantic energy of the original and refined it into something that feels both familiar and revelatory.</p>

<h2>Gameplay</h2>
<p>The core loop remains intact: descend through procedurally generated dungeons, collect increasingly absurd item combinations, and face off against screen-filling bosses. What's new is the sheer density of interactions between items. Where the first game had interesting synergies, the sequel has <em>constellations</em> of them — cascading effects that can turn a mediocre run into an unstoppable force of destruction.</p>

<p>Controls are razor-sharp. Every jump, dash, and shot registers with the kind of precision that makes failure feel instructive rather than frustrating. The new "Abyss Surge" mechanic, which charges as you take damage, adds a risk-reward layer that keeps even experienced players on edge.</p>

<h2>Visual & Audio Design</h2>
<p>The neon aesthetic has been pushed further than seemed possible. Each biome has a distinct color language — the opening Neon District blazes in cyan and magenta, while the deeper Void Sector shifts to sickly greens and deep purples. The soundtrack by Chipzel and friends is a highlight, dynamically layering tracks based on your current item loadout.</p>

<h2>Content & Replayability</h2>
<p>With over 400 items, 12 playable characters, and a branching meta-progression system, Neon Abyss II has the content density to justify dozens of hours. Daily challenges and a robust leaderboard system give competitive players a reason to keep coming back.</p>

<h2>Verdict</h2>
<p>Neon Abyss II is the rare sequel that doesn't just expand on its predecessor — it transcends it. A few rough edges in the early game keep it from perfection, but this is essential playing for any fan of the genre.</p>`,
  },
  {
    slug: "echoes-of-eternity",
    title: "Echoes of Eternity",
    coverImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663530105637/WpQQxE6BG26rErDtiDLBRY/review-placeholder-2-eSHkkaL2dMEZLMZkG23YYY.png",
    score: 8.5,
    excerpt:
      "A breathtaking dark fantasy RPG that weaves an intricate narrative through crumbling ruins and forgotten gods. Echoes of Eternity is ambitious, beautiful, and occasionally frustrating.",
    genre: ["RPG", "Action", "Adventure"],
    platform: ["PC", "PS5"],
    developer: "Arcane Forge Studios",
    publisher: "Deep Silver",
    releaseDate: "2024-09-03",
    reviewDate: "2024-09-10",
    featured: true,
    pros: [
      "Stunning world design and atmosphere",
      "Rich, multi-layered narrative",
      "Satisfying and deep combat system",
      "Exceptional environmental storytelling",
    ],
    cons: [
      "Pacing issues in the second act",
      "Some side quests feel disconnected from the main story",
      "Technical issues on launch (mostly patched)",
    ],
    content: `<p>Echoes of Eternity is the kind of game that reminds you why dark fantasy endures as a genre. Arcane Forge Studios has crafted a world of extraordinary depth — one where every crumbling pillar and faded inscription tells a story older than the player characters themselves.</p>

<h2>World & Narrative</h2>
<p>The game takes place in the Shattered Realm, a once-great civilization brought low by the hubris of its god-kings. You play as a Seeker, one of a dying order tasked with recovering the fragments of a shattered divine artifact. The premise is familiar, but the execution is anything but — the writing is sharp, the lore is dense without being impenetrable, and the major narrative beats land with genuine emotional weight.</p>

<h2>Combat</h2>
<p>The combat system draws inspiration from the Soulslike genre while adding its own wrinkles. The "Echo" system allows you to absorb abilities from defeated enemies and weave them into your own moveset, creating a fluid and personalized fighting style. Boss encounters are consistently excellent — each one a puzzle that rewards observation and adaptation.</p>

<h2>Verdict</h2>
<p>Despite some pacing stumbles and a second act that loses momentum, Echoes of Eternity is a remarkable achievement. It's a game that trusts its players to engage with its world on its own terms, and that trust is rewarded handsomely.</p>`,
  },
  {
    slug: "wasteland-protocol",
    title: "Wasteland Protocol",
    coverImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663530105637/WpQQxE6BG26rErDtiDLBRY/review-placeholder-3-Aoa9CkWmCuUUbgyuvj5end.png",
    score: 7.8,
    excerpt:
      "A gritty open-world survival game with strong atmosphere and solid mechanics, held back by repetitive mission design and a thin narrative.",
    genre: ["Survival", "Open World", "Shooter"],
    platform: ["PC", "PS5", "Xbox Series X"],
    developer: "Iron Dust Games",
    publisher: "505 Games",
    releaseDate: "2024-07-22",
    reviewDate: "2024-07-30",
    pros: [
      "Oppressive and convincing post-apocalyptic atmosphere",
      "Robust crafting and base-building systems",
      "Excellent vehicle mechanics",
      "Dynamic weather and day/night cycle",
    ],
    cons: [
      "Repetitive mission structure",
      "Thin main narrative",
      "Enemy AI is inconsistent",
      "Sparse end-game content",
    ],
    content: `<p>Wasteland Protocol wears its influences proudly — you can see the fingerprints of Mad Max, Fallout, and STALKER throughout. What Iron Dust Games has created is a competent, often compelling survival experience that unfortunately struggles to distinguish itself from its inspirations.</p>

<h2>The World</h2>
<p>The Barrens, the game's sprawling open world, is genuinely impressive. Vast salt flats give way to rusted industrial zones, crumbling highway overpasses, and the occasional oasis settlement. The environmental art team deserves significant credit — every location feels lived-in and tells a story without a single line of dialogue.</p>

<h2>Survival & Crafting</h2>
<p>The survival systems are the game's strongest element. Managing hunger, thirst, radiation exposure, and equipment durability creates a constant low-level tension that keeps exploration meaningful. The crafting tree is deep and satisfying to progress through, and base-building provides a genuine sense of permanence in an otherwise hostile world.</p>

<h2>Verdict</h2>
<p>Wasteland Protocol is a solid entry in the survival genre that will satisfy fans looking for their next fix. It doesn't reinvent the wheel, but the wheel it has built rolls smoothly enough to justify the journey.</p>`,
  },
  {
    slug: "chrome-city-nights",
    title: "Chrome City Nights",
    coverImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663530105637/WpQQxE6BG26rErDtiDLBRY/review-placeholder-4-dfMGxUNFutcfe4WPU6rvhS.png",
    score: 9.5,
    excerpt:
      "A cyberpunk noir masterpiece that blends stunning visuals, a gripping detective narrative, and genre-defining atmosphere into one of the year's best games.",
    genre: ["Adventure", "Puzzle", "Narrative"],
    platform: ["PC", "PS5", "Xbox Series X", "Switch"],
    developer: "Midnight Pixel Co.",
    publisher: "Annapurna Interactive",
    releaseDate: "2024-10-08",
    reviewDate: "2024-10-15",
    featured: true,
    pros: [
      "Exceptional noir narrative with genuine twists",
      "Stunning rain-soaked cyberpunk visuals",
      "Memorable and complex characters",
      "Atmospheric soundtrack by Perturbator",
      "Smart, satisfying detective mechanics",
    ],
    cons: [
      "Relatively short (8–10 hours)",
      "Limited replayability",
      "Some dialogue pacing issues",
    ],
    content: `<p>Chrome City Nights is the game that cyberpunk fiction has been waiting for. Midnight Pixel Co. has distilled the genre to its essence — rain-slicked streets, moral ambiguity, corporate corruption, and the quiet desperation of individuals caught in systems too large to fight — and built something genuinely extraordinary around it.</p>

<h2>Story & Characters</h2>
<p>You play as Vera Solis, a disgraced detective hired to find a missing corporate whistleblower. What begins as a routine missing persons case spirals into a conspiracy that touches every layer of Chrome City's stratified society. The writing is exceptional — sharp, literary, and unafraid of moral complexity. Vera is one of the most compelling protagonists in recent gaming memory.</p>

<h2>Visuals & Atmosphere</h2>
<p>The game is visually stunning. Every scene is composed with the care of a film noir cinematographer — deep shadows, neon reflections in rain puddles, the contrast between the gleaming upper city and the decaying lower districts. The soundtrack by Perturbator is a perfect complement, blending synthwave melodies with jazz-inflected compositions.</p>

<h2>Verdict</h2>
<p>Chrome City Nights is a short game, and that brevity is its only real weakness. In its 8–10 hours, it achieves more than most games manage in triple the time. It is, without qualification, one of the finest games of the year.</p>`,
  },
  {
    slug: "stellar-conquest-reborn",
    title: "Stellar Conquest: Reborn",
    coverImage:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    score: 8.0,
    excerpt:
      "The beloved 4X strategy classic returns with a modern engine and expanded mechanics. A faithful revival that respects its legacy while welcoming new players.",
    genre: ["Strategy", "Turn-Based", "Simulation"],
    platform: ["PC"],
    developer: "Galactic Forge",
    publisher: "Paradox Interactive",
    releaseDate: "2024-08-14",
    reviewDate: "2024-08-20",
    pros: [
      "Deep and rewarding 4X mechanics",
      "Excellent faction variety and asymmetry",
      "Beautiful star map and UI design",
      "Strong modding support from day one",
    ],
    cons: [
      "Steep learning curve for newcomers",
      "Late-game performance issues with large empires",
      "AI could be more aggressive",
    ],
    content: `<p>Stellar Conquest: Reborn is a love letter to the golden age of 4X strategy, rebuilt from the ground up for modern hardware. Galactic Forge has managed the difficult task of preserving what made the original beloved while making it accessible to players who missed the original.</p>

<h2>Core Mechanics</h2>
<p>The four Xs — eXplore, eXpand, eXploit, eXterminate — are all present and accounted for, executed with the depth that fans expect. The technology tree is vast and branching, faction abilities create genuinely distinct playstyles, and the diplomatic system has more nuance than most modern entries in the genre.</p>

<h2>Verdict</h2>
<p>Stellar Conquest: Reborn is essential for fans of the genre and a strong recommendation for anyone willing to invest the time to learn its systems. It's not a revolution, but it's a masterful evolution of a beloved formula.</p>`,
  },
  {
    slug: "shadow-protocol-zero",
    title: "Shadow Protocol: Zero",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    score: 6.5,
    excerpt:
      "A competent but uninspired stealth-action game that plays it too safe. Shadow Protocol: Zero has the bones of something great but lacks the courage to use them.",
    genre: ["Stealth", "Action", "Thriller"],
    platform: ["PC", "PS5", "Xbox Series X"],
    developer: "Phantom Works",
    publisher: "Ubisoft",
    releaseDate: "2024-06-05",
    reviewDate: "2024-06-12",
    pros: [
      "Solid stealth mechanics",
      "Good level design in the first half",
      "Impressive character animations",
    ],
    cons: [
      "Generic story and characters",
      "Second half devolves into action-shooter",
      "Forgettable soundtrack",
      "Overpriced for content offered",
      "Intrusive microtransaction system",
    ],
    content: `<p>Shadow Protocol: Zero arrives with considerable pedigree — a development team with strong stealth-game credentials and a publisher with the resources to deliver a polished product. The result is a game that is technically accomplished but creatively timid.</p>

<h2>Stealth Systems</h2>
<p>When Shadow Protocol: Zero commits to stealth, it's genuinely good. The AI is responsive, the level design creates interesting multi-path scenarios, and the gadget system offers meaningful choices. The problem is that the game loses confidence in these systems halfway through, pivoting to a more conventional action-shooter experience that plays to none of its strengths.</p>

<h2>Verdict</h2>
<p>Shadow Protocol: Zero is a disappointment not because it's bad, but because it's so clearly capable of being better. Fans of the stealth genre will find enough to enjoy in the first half, but the full package doesn't justify the asking price.</p>`,
  },
];

export function getReviewBySlug(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug);
}

export function getFeaturedReviews(): Review[] {
  return reviews.filter((r) => r.featured);
}

export function getLatestReviews(limit?: number): Review[] {
  const sorted = [...reviews].sort(
    (a, b) =>
      new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

export function searchReviews(query: string): Review[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return reviews.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.genre.some((g) => g.toLowerCase().includes(q)) ||
      r.developer.toLowerCase().includes(q) ||
      r.platform.some((p) => p.toLowerCase().includes(q))
  );
}

export function getScoreColor(score: number): string {
  if (score >= 9) return "#00e5ff"; // Cyan — Masterpiece
  if (score >= 8) return "#69ff47"; // Green — Great
  if (score >= 7) return "#ffd600"; // Yellow — Good
  if (score >= 6) return "#ff9100"; // Orange — Average
  return "#ff1744"; // Red — Poor
}

export function getScoreLabel(score: number): string {
  if (score >= 9.5) return "Masterpiece";
  if (score >= 9) return "Outstanding";
  if (score >= 8) return "Great";
  if (score >= 7) return "Good";
  if (score >= 6) return "Average";
  if (score >= 5) return "Mediocre";
  return "Poor";
}

export function getAllGenres(): string[] {
  const genres = new Set<string>();
  reviews.forEach((r) => {
    r.genre.forEach((g) => genres.add(g));
  });
  return Array.from(genres).sort();
}

export function getReviewsByGenre(genre: string): Review[] {
  if (!genre) return reviews;
  return reviews.filter((r) => r.genre.includes(genre));
}

export function getReviewsByGenres(genres: string[]): Review[] {
  if (genres.length === 0) return reviews;
  return reviews.filter((r) =>
    genres.some((g) => r.genre.includes(g))
  );
}

export function getAllPlatforms(): string[] {
  const platforms = new Set<string>();
  reviews.forEach((r) => {
    r.platform.forEach((p) => platforms.add(p));
  });
  return Array.from(platforms).sort();
}

export type SortOption = "newest" | "oldest" | "highest-score" | "lowest-score" | "title";

export interface AdvancedSearchFilters {
  query?: string;
  genres?: string[];
  platforms?: string[];
  minScore?: number;
  maxScore?: number;
  sortBy?: SortOption;
}

export function advancedSearch(filters: AdvancedSearchFilters): Review[] {
  let results = [...reviews];

  // Filter by query (title, developer, publisher)
  if (filters.query && filters.query.trim()) {
    const q = filters.query.toLowerCase().trim();
    results = results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.developer.toLowerCase().includes(q) ||
        r.publisher.toLowerCase().includes(q)
    );
  }

  // Filter by genres
  if (filters.genres && filters.genres.length > 0) {
    results = results.filter((r) =>
      filters.genres!.some((g) => r.genre.includes(g))
    );
  }

  // Filter by platforms
  if (filters.platforms && filters.platforms.length > 0) {
    results = results.filter((r) =>
      filters.platforms!.some((p) => r.platform.includes(p))
    );
  }

  // Filter by score range
  if (filters.minScore !== undefined) {
    results = results.filter((r) => r.score >= filters.minScore!);
  }
  if (filters.maxScore !== undefined) {
    results = results.filter((r) => r.score <= filters.maxScore!);
  }

  // Sort results
  const sortBy = filters.sortBy || "newest";
  switch (sortBy) {
    case "newest":
      results.sort(
        (a, b) =>
          new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
      );
      break;
    case "oldest":
      results.sort(
        (a, b) =>
          new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime()
      );
      break;
    case "highest-score":
      results.sort((a, b) => b.score - a.score);
      break;
    case "lowest-score":
      results.sort((a, b) => a.score - b.score);
      break;
    case "title":
      results.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return results;
}
