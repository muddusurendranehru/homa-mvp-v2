/**
 * Blog posts render from content/blog/{slug}.md only.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import { getBlogPost, getAllBlogSlugs } from '@/lib/content';

const SITE_URL = 'https://mvp.homahealthcarecenter.in';

export async function generateStaticParams() {
  return getAllBlogSlugs();
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    return { title: 'Post Not Found | HOMA Clinic' };
  }
  return {
    title: `${post.title} | HOMA Clinic`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `${SITE_URL}/blog/${slug}`,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return (
      <article className="max-w-3xl mx-auto min-w-0 w-full px-4 py-8">
          <p className="mb-6 flex items-center gap-2">
            <Link href="/" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
              ← Home
            </Link>
            <span className="text-green-600" aria-hidden="true">·</span>
            <Link href="/blog" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
              Blog
            </Link>
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Post Not Found</h1>
          <p className="mt-3 text-gray-600">The blog post you&apos;re looking for doesn&apos;t exist.</p>
      </article>
    );
  }

  const displayDate = post.date
    ? new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(post.date))
    : '';
  const authorLine = [post.author, displayDate].filter(Boolean).join(' | ');

  return (
    <article className="max-w-3xl mx-auto min-w-0 w-full px-4 py-8">
        <p className="mb-6 flex items-center gap-2">
          <Link href="/" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
            ← Home
          </Link>
          <span className="text-green-600" aria-hidden="true">·</span>
          <Link href="/blog" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
            Blog
          </Link>
        </p>

        {post.image ? (
          <div className="mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto rounded-xl shadow-sm"
            />
          </div>
        ) : null}

        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
          Blog
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 w-full min-w-0 break-words whitespace-normal overflow-visible">
          {post.title}
        </h1>
        {authorLine ? (
          <p className="text-sm text-gray-500 mb-8">{authorLine}</p>
        ) : null}

        <div
          className="max-w-none text-gray-800 leading-relaxed space-y-4 mb-12 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-6"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        <div className="mt-10 mb-6">
          <ShareButtons
            url={`${SITE_URL}/blog/${slug}`}
            title={post.title}
          />
        </div>

        <footer className="border-t border-gray-200 pt-8 text-sm text-gray-600 space-y-2">
          <p className="font-medium text-gray-800">
            Dr Muddu Surendra Nehru MD | HOMA Healthcare Center | Gachibowli | 09963721999
          </p>
          <p>
            <Link href="/health-check" className="text-teal-600 hover:underline">
              Free metabolic health check →
            </Link>
          </p>
        </footer>
    </article>
  );
}