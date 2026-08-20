# Content Directory Structure

This directory contains markdown files for blog posts and condition pages.

## Directory Structure

```
web/content/
├── blog/
│   └── my-first-post.md
└── conditions/
    └── diabetes-reversal.md
```

## Markdown File Format

### Blog Posts (`blog/*.md`)

Front matter (YAML):
```yaml
---
title: Post Title
date: YYYY-MM-DD
author: Author Name
description: Post description for SEO
---
```

### Condition Pages (`conditions/*.md`)

Front matter (YAML):
```yaml
---
title: Condition Title
condition: condition-slug
description: SEO description
keywords: keyword1, keyword2, keyword3
---
```

## Usage

These markdown files can be:
1. Parsed and rendered by Next.js pages
2. Used as content source for static site generation
3. Managed through a CMS or content management workflow
4. Version controlled alongside code

## Example Files

- `blog/my-first-post.md` - Example blog post
- `conditions/diabetes-reversal.md` - Example condition page

## Adding New Content

1. Create a new `.md` file in the appropriate directory
2. Add front matter with required metadata
3. Write content in Markdown format
4. Reference the file in your Next.js pages or API routes
