import BlogPageClient, { type BlogCardPost } from './BlogPageClient';
import { getAllBlogSlugs, getBlogPost, type BlogPost } from '@/lib/content';

function timestamp(date: string): number {
  const value = new Date(date).getTime();
  return Number.isNaN(value) ? 0 : value;
}

function formatDate(date: string): string {
  if (!date) return '';
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return date;
  return new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(value);
}

function readTimeFor(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function excerptFor(post: BlogPost): string {
  const description = post.description?.trim();
  if (description) return description;
  const plain = post.content.replace(/[#>*_\[\]()`]/g, ' ').replace(/\s+/g, ' ').trim();
  if (plain.length <= 180) return plain;
  return `${plain.slice(0, 177).trim()}...`;
}

function toCard(post: BlogPost): BlogCardPost {
  return {
    id: post.slug,
    slug: post.slug,
    title: post.title,
    excerpt: excerptFor(post),
    date: formatDate(post.date),
    readTime: readTimeFor(post.content),
    category: 'Blog',
    icon: '📝',
    author: post.author ?? '',
  };
}

export default async function BlogPage() {
  const slugs = getAllBlogSlugs();
  const loaded = await Promise.all(slugs.map(({ slug }) => getBlogPost(slug)));
  const posts = loaded
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => timestamp(b.date) - timestamp(a.date))
    .map(toCard);

  return <BlogPageClient posts={posts} />;
}
