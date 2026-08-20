import { neon } from '@neondatabase/serverless';
import { remark } from 'remark';
import html from 'remark-html';
import type { BlogPost } from '@/lib/content';

function getSql() {
  const url = process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL ?? null;
  if (!url) return null;
  return neon(url);
}

/** Load a published post from Neon by slug. Returns null if missing or DB unavailable. */
export async function getBlogPostFromNeon(slug: string): Promise<BlogPost | null> {
  const sql = getSql();
  if (!sql) return null;

  try {
    const rows = await sql`
      SELECT
        title,
        slug,
        content,
        excerpt,
        author,
        date,
        meta_description
      FROM blog_posts
      WHERE slug = ${slug}
        AND published = true
      LIMIT 1
    `;

    const row = rows[0] as
      | {
          title: string;
          slug: string;
          content: string;
          excerpt: string | null;
          author: string | null;
          date: string | null;
          meta_description: string | null;
        }
      | undefined;

    if (!row) return null;

    const processedContent = await remark().use(html).process(row.content);
    const htmlContent = processedContent.toString();

    return {
      slug: row.slug,
      title: row.title,
      date: row.date ?? '',
      author: row.author ?? undefined,
      description: row.meta_description ?? row.excerpt ?? undefined,
      content: row.content,
      htmlContent,
    };
  } catch (e) {
    console.error('[getBlogPostFromNeon]', e);
    return null;
  }
}
