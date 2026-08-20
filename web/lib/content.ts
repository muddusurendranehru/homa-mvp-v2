import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

// Blog post types
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author?: string;
  description?: string;
  content: string;
  htmlContent: string;
}

// Condition page types
export interface ConditionPage {
  slug: string;
  title: string;
  condition: string;
  description?: string;
  keywords?: string;
  content: string;
  htmlContent: string;
}

// Get all blog post slugs
export function getAllBlogSlugs(): { slug: string }[] {
  const blogDirectory = path.join(contentDirectory, 'blog');
  
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => ({
      slug: name.replace(/\.md$/, ''),
    }));
}

// Get blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const blogDirectory = path.join(contentDirectory, 'blog');
  const fullPath = path.join(blogDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    
    const htmlContent = processedContent.toString();

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      author: data.author,
      description: data.description,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

// Get all condition page slugs
export function getAllConditionSlugs(): { slug: string }[] {
  const conditionsDirectory = path.join(contentDirectory, 'conditions');
  
  if (!fs.existsSync(conditionsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(conditionsDirectory);
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => ({
      slug: name.replace(/\.md$/, ''),
    }));
}

// Get condition page by slug
export async function getConditionPage(slug: string): Promise<ConditionPage | null> {
  const conditionsDirectory = path.join(contentDirectory, 'conditions');
  const fullPath = path.join(conditionsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    
    const htmlContent = processedContent.toString();

    return {
      slug,
      title: data.title || slug,
      condition: data.condition || slug,
      description: data.description,
      keywords: data.keywords,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading condition page ${slug}:`, error);
    return null;
  }
}

// Get all blog posts (for listing page)
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = getAllBlogSlugs();
  const posts = await Promise.all(
    slugs.map(({ slug }) => getBlogPost(slug))
  );
  
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
}
