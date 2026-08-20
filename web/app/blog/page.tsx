import BlogPageClient, { type BlogCardPost } from './BlogPageClient';

/** Display date on cards when `date` column is null (use `created_at`). */
function pickDisplayDate(p: Record<string, unknown>): string {
  if (typeof p.date === 'string' && p.date.trim()) return p.date.trim();
  const c = p.created_at;
  if (c instanceof Date && !Number.isNaN(c.getTime())) {
    return new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(c);
  }
  if (typeof c === 'string' && c) {
    const d = new Date(c);
    if (!Number.isNaN(d.getTime())) {
      return new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(d);
    }
  }
  return '';
}

async function getDbPosts(): Promise<BlogCardPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3003';
    const res = await fetch(`${baseUrl}/api/admin/blog`, { cache: 'no-store' });
    const data = await res.json();
    if (!data.success || !Array.isArray(data.posts)) return [];

    return data.posts.map((row: Record<string, unknown>) => {
      const p = row;
      return {
        id: typeof p.id === 'number' ? p.id : String(p.id ?? ''),
        slug: typeof p.slug === 'string' ? p.slug : undefined,
        title: typeof p.title === 'string' ? p.title : '',
        excerpt: typeof p.excerpt === 'string' && p.excerpt ? p.excerpt : '',
        date: pickDisplayDate(p),
        author: typeof p.author === 'string' ? p.author : undefined,
        category: typeof p.category === 'string' ? p.category : 'Nutrition and Diabetes',
        icon: typeof p.icon === 'string' && p.icon ? p.icon : '📝',
        readTime: '3 min read',
      };
    });
  } catch (error) {
    console.error('DB posts error:', error);
    return [];
  }
}

const HARDCODED_POSTS: BlogCardPost[] = [
  {
    id: 9,
    slug: 'watermelon-diabetes-guide',
    title: 'Watermelon — Diabetes Guide',
    excerpt:
      'Evidence-based nutrition facts for diabetic patients | Dr Muddu Surendra Nehru MD',
    date: 'March 2026',
    readTime: '5 min read',
    category: 'Nutrition and Diabetes',
    icon: '🍉',
    author: 'Dr Muddu Surendra Nehru MD',
  },
  {
    id: 8,
    slug: 'insulin-resistance-kidney-link',
    title: 'How Insulin Resistance Silently Damages Kidneys',
    excerpt:
      'Discover how insulin resistance and hyperinsulinemia directly damage kidneys—increasing risk of proteinuria, hypertension, and diabetic nephropathy in Indians.',
    date: 'Dec 12, 2025',
    readTime: '8 min read',
    category: 'Science',
    icon: '🔬',
  },
  {
    id: 7,
    slug: 'can-prediabetes-be-reversed-in-90-days',
    title: 'Can Prediabetes Be Reversed in 90 Days?',
    excerpt:
      "Yes—prediabetes can be reversed in 90 days with the right science-backed plan. Discover Dr. Muddu's metabolic remission protocol for Indian patients.",
    date: 'Dec 12, 2025',
    readTime: '12 min read',
    category: 'Science',
    icon: '🔬',
  },
  {
    id: 1,
    title: 'What Is HOMA-IR and Why It Matters for Diabetes Reversal',
    excerpt:
      "Understand the science behind insulin resistance and how Dr. Muddu's protocol targets it directly.",
    date: 'Dec 10, 2025',
    readTime: '4 min read',
    category: 'Science',
    icon: '🧬',
  },
  {
    id: 2,
    title: '5 Indian Foods That Lower Your TyG Index Naturally',
    excerpt: 'Simple dietary swaps to improve metabolic health — backed by clinical data.',
    date: 'Dec 8, 2025',
    readTime: '3 min read',
    category: 'Nutrition',
    icon: '🥗',
  },
  {
    id: 3,
    title: 'How Lakshmi Reduced Her HOMA-IR from 8.5 to 2.1 in 90 Days',
    excerpt: 'A real patient journey with day-by-day insights.',
    date: 'Dec 5, 2025',
    readTime: '5 min read',
    category: 'Success Story',
    icon: '⭐',
  },
  {
    id: 4,
    title: 'Understanding Central Obesity and Metabolic Syndrome',
    excerpt: 'Why waist circumference matters more than weight for metabolic health.',
    date: 'Dec 3, 2025',
    readTime: '4 min read',
    category: 'Science',
    icon: '📊',
  },
  {
    id: 5,
    title: 'The Role of Walking in Insulin Sensitivity',
    excerpt: 'How 10,000 daily steps can transform your metabolic markers.',
    date: 'Dec 1, 2025',
    readTime: '3 min read',
    category: 'Exercise',
    icon: '🚶',
  },
  {
    id: 6,
    title: 'Stress, Cortisol, and Blood Sugar: The Hidden Connection',
    excerpt: "Mental health's direct impact on metabolic remission.",
    date: 'Nov 28, 2025',
    readTime: '4 min read',
    category: 'Mental Health',
    icon: '🧘',
  },
];

export default async function BlogPage() {
  const dbPosts = await getDbPosts();
  const posts = [...dbPosts, ...HARDCODED_POSTS];

  return <BlogPageClient posts={posts} />;
}
