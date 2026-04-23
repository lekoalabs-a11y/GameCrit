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
    slug: "dark-souls-ii",
    title: "Dark Souls II",
    coverImage:
      "https://assets-prd.ignimgs.com/2022/01/05/dark-souls-2-button-1641371379539.jpg?crop=1%3A1%2Csmart&format=jpg&auto=webp&quality=80",
    score: 8.7,
    excerpt:
      "Beaucoup de défauts mais quelques qualités remarquables",
    genre: [
    "Action",
    "RPG",
    "Fantasy",
    "Dark Fantasy",
  ],
    platform: [
    "PC",
    "PS5",
    "PS4",
    "PS3",
    "Xbox 360",
    "Xbox One",
    "Xbox Series",
  ],
    developer: "FromSoftware",
    publisher: "Bandai Namco",
    releaseDate: "2014-03-11",
    reviewDate: "2026-04-23",
    featured: true,
    pros: [
    "Gameplay",
    "Variété de build",
    "Très beaux panoramas",
  ],
    cons: [
    "L'esquive en début de jeu",
  ],
    content: `
<p>Alors, que dire de ce jeu tant détesté par une bonne partie de la commu from software? Après avoir terminer le jeu, tous ses dlc, l'avoir platiné et avoir battu l'intégralité des boss du jeu je vais expliquer en détail pourquoi j'adore ce jeu et comment se fait-il que ce jeu soit autant detesté. Je vais faire une partie sans spoil majeure et une partie avec.

 Première chose que j'aimerais dire c'est qu'il existe 2 versions de dark souls 2 : la version vanilla et la version scholar. La différence notable entre ces deux versions c'est l'emplacement des mobs mais surtout leur quantité, dans la version vanilla, il y a bcp de mobs et ils sont placés de manière à te rendre la vie dure mais c'est fait de façon juste. Également, il y a une zone mid game qui est un peu plus difficile que la version scholar, sinon le reste des zones sont pareils comme pour les dlc ou sont plus simple.  Dans SOFTS (abréviation de scholar of the first sin), il y a encore plus de mobs et ils sont placés assez proche entre eux ce qui fait que si tu rush comme un débile il vont venir t'enculer à plusieurs rajouter à ça le fait que quand tu vas dans un fog wall t'es pas invincible sur quasiment tt la durée de l'animation (ça s'applique aux 2 versions mais c encore plus marquant sur SOFTS que sur vanilla). Ce qui fait que des zones comme l'iron keep passe d'une zone difficile de base à injustement dur sur SOFTS. Perso j'ai joué qu'à SOFTS.</p>



<h2><strong>Gameplay</strong></h2>


<p>Simple et efficace… à quelques détails près, sur le papier on est sur la continuité de ce que dark souls 1 a fait. Mais il y a quand même quelques différences à noter : tu peux voir ta mort 3 secondes avant qu'elle arrive à cause de la lenteur qu’est de boire la fiole d’estus (c’était déjà la cas dans ds1 mais là c’est amplifier), rajouté à ça le fait que son soin n'est pas instantané et c'est très facile de mourir à cause de ça, l’attaque après une roulade ne fonctionne tout simplement pas : au lieu de se baser sur la direction de ton stick il se base sur la direction de ta roulade ce qui completement stupide. l’endurance se consomme comme pas possible : que ce soit quand tu attaque, que tu roll et même quand tu cours. Pour en rajouter, les devs se sont dit que ce serait une bonne idée que ton personnage, à chaque mort, perde 10% de ses pv max (jusqu’à un max de 50%), cette mécanique n’a aucun intéret d’exister si ce n’est d’être injuste. Au moins, il y a un anneau trouvable dans la tour de heide au tout début du jeu permettant de réduire cet effet à max 25%. De l’autre coté, la diversité d'arme est impressionnante y a vraiment de tout, il y a également la possibilité d'acheter les armes de tt les boss importants du jeu après les avoir battu (également ceux des dlc) en plus du power stancing (le fait de manier 2 armes en mm temps) qui est une bonne mécanique. Également, l’equip load à s’affiche maintenant en pourcentage ce qui est bien pratique.</p>

`,
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
