'use client';

import Link from 'next/link';
import BlogLayout from '@/components/BlogLayout';

export type BlogCardPost = {
  id: number | string;
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  icon: string;
  author?: string;
};

type Props = {
  posts: BlogCardPost[];
};

export default function BlogPageClient({ posts }: Props) {
  return (
    <BlogLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16 px-4 -mx-4 sm:-mx-6 lg:-mx-8 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            HOMA Clinic Health Insights
          </h1>
          <p className="text-xl text-green-100">
            Evidence-based articles on metabolic health, nutrition, and remission protocols
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto">
        {/* Category Filter (Visual Only) */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {['All', 'Science', 'Nutrition', 'Success Story', 'Exercise', 'Mental Health'].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                cat === 'All'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-green-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug ? `s-${post.slug}` : `h-${String(post.id)}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{post.icon}</div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                    {post.author ? (
                      <>
                        <span>•</span>
                        <span>{post.author}</span>
                      </>
                    ) : null}
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-green-600 transition">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4">{post.excerpt}</p>

                  <Link
                    href={post.slug ? `/blog/${post.slug}` : `/blog/post-${post.id}`}
                    className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Start Your Remission Journey?
          </h3>
          <p className="text-green-100 mb-6">
            Join 5,00,000+ patients who achieved metabolic remission with Dr. Muddu&apos;s 90-Day Program
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition shadow-lg"
            >
              Explore Packages →
            </Link>
            <Link
              href="/enroll"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition"
            >
              Enroll Now
            </Link>
          </div>
        </div>

        {/* Newsletter (Visual Only) */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            📬 Subscribe to Health Insights
          </h3>
          <p className="text-gray-600 mb-4">
            Get weekly tips on metabolic health, new research, and success stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}
