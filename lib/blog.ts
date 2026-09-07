export type BlogPost = {
  slug: string;
  date: string; // ISO (YYYY-MM-DD)
  title: string;
  excerpt: string;
};

// Rick's blog posts. Static for now — the source of truth for both /blogs and
// the homepage combined feed.
export const blogPosts: BlogPost[] = [
  {
    slug: "why-i-went-carnivore-first",
    date: "2026-07-28",
    title: "Why I Went Carnivore First",
    excerpt:
      "The short version of a long decision: how years of frustration with standard advice led me to strip things back to meat, eggs, and fat.",
  },
  {
    slug: "what-my-labs-actually-looked-like",
    date: "2026-07-14",
    title: "What My Labs Actually Looked Like",
    excerpt:
      "A plain-language walk through the numbers that scared me into changing how I eat, and what's changed since.",
  },
  {
    slug: "the-first-30-days-were-rough",
    date: "2026-06-30",
    title: "The First 30 Days Were Rough",
    excerpt: "Adaptation, cravings, and the mistakes I made trying to do this without a plan.",
  },
];
