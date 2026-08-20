# Media Directory Structure

This directory contains all media assets for the website.

## Directory Structure

```
web/public/media/
├── images/      # Images, charts, infographics
├── videos/      # Video files (or links to YouTube/Vimeo)
├── pdfs/        # PDF documents, guides, downloads
└── icons/       # SVG icons, logos, small graphics
```

## Usage Examples

### Images

**Markdown:**
```markdown
![Diabetes Risk Chart](/media/images/diabetes-chart.png)
```

**React/JSX:**
```jsx
<img 
  src="/media/images/diabetes-chart.png" 
  alt="Diabetes Risk Chart by Dr. Muddu" 
  className="w-full max-w-lg mx-auto my-6 rounded-lg shadow-md"
/>
```

### Videos

**YouTube Embed:**
```jsx
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
```

**Local Video (if uploaded):**
```jsx
<video controls className="w-full max-w-2xl mx-auto my-6">
  <source src="/media/videos/diabetes-explained.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

### PDFs

**Link to PDF:**
```jsx
<a 
  href="/media/pdfs/diabetes-guide.pdf" 
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
  📄 Download Diabetes Guide (PDF)
</a>
```

**Markdown:**
```markdown
[Download Guide](/media/pdfs/diabetes-guide.pdf)
```

### Icons

**SVG Icon:**
```jsx
<img 
  src="/media/icons/icon-diabetes.svg" 
  alt="Diabetes Icon"
  className="w-8 h-8"
/>
```

**Inline SVG:**
```jsx
<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
  <path d="..." />
</svg>
```

## File Naming Conventions

- Use lowercase with hyphens: `diabetes-chart.png`
- Be descriptive: `heart-attack-risk-chart.jpg` not `chart1.jpg`
- Include version if needed: `guide-v2.pdf`

## File Size Guidelines

- **Images**: Optimize before upload (use tools like TinyPNG, ImageOptim)
  - JPG for photos: max 500KB
  - PNG for graphics: max 300KB
  - SVG for icons: keep small, optimize paths

- **Videos**: Prefer YouTube/Vimeo embeds over local files
  - If local: max 10MB, use compressed formats (MP4, WebM)

- **PDFs**: Keep under 5MB when possible
  - Compress large PDFs before upload

## Existing Images

Note: Existing images in `web/public/images/` are preserved and can still be accessed via `/images/...`

New images should go in `web/public/media/images/` for better organization.

## Adding Media to Markdown Content

When adding media to markdown files in `web/content/`:

```markdown
![Alt text](/media/images/filename.png)

[Download PDF](/media/pdfs/filename.pdf)
```

The `/media/` path works because files in `public/` are served from the root URL.
