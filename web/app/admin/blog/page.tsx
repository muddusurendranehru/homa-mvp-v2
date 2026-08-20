'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';

const CATEGORIES = [
  'Nutrition and Diabetes',
  'Metabolic Health',
  'Patient Stories',
  'Research Updates',
  'Lifestyle and Exercise',
] as const;

function slugifyFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const emptyForm = {
  title: '',
  slug: '',
  icon: '📝',
  category: CATEGORIES[0],
  excerpt: '',
  meta_description: '',
  content: '',
  date: '',
  author: 'Dr Muddu Surendra Nehru MD',
  password: '',
};

export default function AdminBlogPage() {
  const [form, setForm] = useState(emptyForm);
  const [slugManual, setSlugManual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ slug: string } | null>(null);

  const setField = useCallback((key: keyof typeof emptyForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  }, []);

  const onTitleChange = (title: string) => {
    if (!slugManual) {
      setForm((f) => ({ ...f, title, slug: slugifyFromTitle(title) }));
    } else {
      setField('title', title);
    }
  };

  const onSlugChange = (slug: string) => {
    setSlugManual(true);
    setField('slug', slug);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const slug = form.slug.trim() || slugifyFromTitle(form.title);
    if (!form.title.trim() || !slug || !form.content.trim()) {
      setError('Title, slug, and content are required.');
      setLoading(false);
      return;
    }
    const password = form.password.trim();
    if (!password) {
      setError('Admin password is required.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          title: form.title.trim(),
          slug,
          content: form.content.trim(),
          excerpt: form.excerpt.trim() || undefined,
          category: form.category,
          icon: form.icon.trim() || '📝',
          meta_description: form.meta_description.trim() || undefined,
          date: form.date.trim() || undefined,
          author: form.author.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : `Publish failed (${res.status})`);
        setLoading(false);
        return;
      }

      if (data.success && typeof data.slug === 'string') {
        setSuccess({ slug: data.slug });
        setForm({ ...emptyForm, password: '' });
        setSlugManual(false);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const liveUrl =
    typeof window !== 'undefined' && success
      ? `${window.location.origin}/blog/${success.slug}`
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-green-100 text-sm font-medium">HOMA Clinic</p>
            <h1 className="text-2xl font-bold tracking-tight">Publish blog post</h1>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-sm font-medium transition border border-white/30"
          >
            ← Back to blog
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 pb-16">
        {success && liveUrl && (
          <div
            className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-emerald-900 shadow-sm"
            role="status"
          >
            <p className="font-semibold text-emerald-800">Published successfully</p>
            <p className="mt-2 text-sm">
              Live article:{' '}
              <a href={liveUrl} className="text-teal-700 underline font-medium break-all">
                {liveUrl}
              </a>
            </p>
          </div>
        )}

        {error && (
          <div
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6 bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
              placeholder="e.g. Mango and Diabetes Guide"
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug <span className="text-gray-400 font-normal">(auto from title; editable)</span>
            </label>
            <input
              id="slug"
              type="text"
              value={form.slug}
              onChange={(e) => onSlugChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm text-gray-900 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
              placeholder="mango-diabetes-guide"
              autoComplete="off"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                Icon <span className="text-gray-400 font-normal">(emoji)</span>
              </label>
              <input
                id="icon"
                type="text"
                value={form.icon}
                onChange={(e) => setField('icon', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
                placeholder="🥭"
                maxLength={8}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setField('category', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              rows={2}
              value={form.excerpt}
              onChange={(e) => setField('excerpt', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 resize-y min-h-[4rem]"
              placeholder="Short summary for the blog card"
            />
          </div>

          <div>
            <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-1">
              Meta description
            </label>
            <textarea
              id="meta_description"
              rows={2}
              value={form.meta_description}
              onChange={(e) => setField('meta_description', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 resize-y min-h-[4rem]"
              placeholder="SEO meta description (optional)"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              rows={14}
              value={form.content}
              onChange={(e) => setField('content', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 resize-y font-sans text-sm leading-relaxed"
              placeholder="Full article (plain text or markdown-style; rendering depends on blog article template)"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Display date <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="date"
                type="text"
                value={form.date}
                onChange={(e) => setField('date', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
                placeholder="e.g. March 2026"
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                id="author"
                type="text"
                value={form.author}
                onChange={(e) => setField('author', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Admin password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setField('password', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
              placeholder="Same as ADMIN_PASSWORD in .env"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto min-w-[200px] rounded-xl bg-gradient-to-r from-green-600 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-green-700 hover:to-teal-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Publishing…' : 'PUBLISH'}
          </button>
        </form>
      </main>
    </div>
  );
}
