import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getSql() {
  const url = process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL;
  if (!url) throw new Error('No DATABASE_URL');
  return neon(url);
}

function unauthorized(message?: string) {
  return NextResponse.json(
    {
      success: false,
      error:
        message ??
        'Unauthorized — password must match ADMIN_PASSWORD in web/.env.local (restart dev server after editing env).',
    },
    { status: 401 }
  );
}

function getAdminPasswordFromRequest(body: Record<string, unknown>, request: NextRequest): string | undefined {
  const fromBody = typeof body.password === 'string' ? body.password.trim() : undefined;
  const header = request.headers.get('x-admin-password')?.trim();
  const auth = request.headers.get('authorization');
  const bearer =
    auth?.startsWith('Bearer ') ? auth.slice(7).trim() : undefined;
  return fromBody ?? header ?? bearer ?? undefined;
}

function dbConfigErrorResponse() {
  return NextResponse.json(
    { success: false, error: 'Database not configured (DATABASE_URL or NEON_DATABASE_URL)' },
    { status: 500 }
  );
}

/**
 * GET — list published posts, or single post when ?slug= (fully public: no ADMIN_PASSWORD).
 * Only POST checks ADMIN_PASSWORD.
 */
export async function GET(request: NextRequest) {
  let sql;
  try {
    sql = getSql();
  } catch {
    return dbConfigErrorResponse();
  }

  const slug = request.nextUrl.searchParams.get('slug');

  if (slug) {
    try {
      const rows = await sql`
        SELECT *
        FROM blog_posts
        WHERE slug = ${slug}
          AND published = true
        LIMIT 1
      `;
      const list = rows as Record<string, unknown>[];
      const post = list[0] ?? null;
      return NextResponse.json({ success: true, post });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch post';
      console.error('[admin/blog GET slug]', e);
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }

  try {
    const rows = await sql`
      SELECT *
      FROM blog_posts
      WHERE published = true
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ success: true, posts: rows as Record<string, unknown>[] });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to fetch posts';
    console.error('[admin/blog GET]', e);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

type PostBody = {
  password?: string;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  date?: string;
  category?: string;
  icon?: string;
  meta_description?: string;
};

/**
 * POST — create blog post (requires ADMIN_PASSWORD).
 */
export async function POST(request: NextRequest) {
  let sql;
  try {
    sql = getSql();
  } catch {
    return dbConfigErrorResponse();
  }

  const expectedRaw = process.env.ADMIN_PASSWORD;
  const expected = typeof expectedRaw === 'string' ? expectedRaw.trim() : '';
  if (!expected) {
    return NextResponse.json(
      { success: false, error: 'ADMIN_PASSWORD is not set' },
      { status: 500 }
    );
  }

  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const provided = getAdminPasswordFromRequest(body as Record<string, unknown>, request);
  if (!provided || provided !== expected) {
    return unauthorized();
  }

  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const slugRaw = typeof body.slug === 'string' ? body.slug.trim() : '';
  const content = typeof body.content === 'string' ? body.content : '';

  if (!title || !slugRaw || content === '') {
    return NextResponse.json(
      { success: false, error: 'title, slug, and content are required' },
      { status: 400 }
    );
  }

  const excerpt = typeof body.excerpt === 'string' ? body.excerpt.trim() : null;
  const author =
    typeof body.author === 'string' && body.author.trim()
      ? body.author.trim()
      : 'Dr Muddu Surendra Nehru MD';
  const date = typeof body.date === 'string' && body.date.trim() ? body.date.trim() : null;
  const category =
    typeof body.category === 'string' && body.category.trim()
      ? body.category.trim()
      : 'Nutrition and Diabetes';
  const icon =
    typeof body.icon === 'string' && body.icon.trim() ? body.icon.trim() : '📝';
  const meta_description =
    typeof body.meta_description === 'string' && body.meta_description.trim()
      ? body.meta_description.trim()
      : null;

  try {
    await sql`
      INSERT INTO blog_posts (
        title,
        slug,
        content,
        excerpt,
        author,
        category,
        icon,
        meta_description,
        date
      )
      VALUES (
        ${title},
        ${slugRaw},
        ${content},
        ${excerpt},
        ${author},
        ${category},
        ${icon},
        ${meta_description},
        ${date}
      )
    `;

    return NextResponse.json({
      success: true,
      slug: slugRaw,
      message: 'Post published',
    });
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string };
    if (err.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'A post with this slug already exists' },
        { status: 409 }
      );
    }
    console.error('[admin/blog POST]', e);
    return NextResponse.json(
      { success: false, error: err.message ?? 'Failed to save post' },
      { status: 500 }
    );
  }
}
