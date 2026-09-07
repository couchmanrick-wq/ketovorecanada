export type BlogPost = {
  slug: string;
  date: string; // ISO (YYYY-MM-DD)
  title: string;
  excerpt: string;
};

// Rick's blog posts. Static for now — the source of truth for both /blogs and
// the homepage combined feed.
export const blogPosts: BlogPost[] = [];
