# Media Usage Guide

## Directory Structure

```
web/public/media/
├── images/      ✅ Created - For charts, infographics, photos
├── videos/      ✅ Created - For video files or YouTube links
├── pdfs/        ✅ Created - For downloadable PDF documents
└── icons/       ✅ Created - For SVG icons and small graphics
```

## Important Notes

✅ **Existing images preserved**: All existing images in `web/public/images/` remain accessible via `/images/...`  
✅ **No breaking changes**: Existing functionality is maintained  
✅ **New structure ready**: Use `/media/...` for new uploads

## Usage Examples

### Images in Markdown

```markdown
![Diabetes Risk Chart](/media/images/diabetes-chart.png)

This chart shows how HOMA-IR correlates with diabetes risk over time.
```

### Images in React/JSX

```jsx
<img 
  src="/media/images/diabetes-chart.png" 
  alt="Diabetes Risk Chart by Dr. Muddu" 
  className="w-full max-w-lg mx-auto my-6 rounded-lg shadow-md"
/>
```

### Videos (YouTube Embed)

```jsx
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="w-full max-w-2xl mx-auto my-6"
></iframe>
```

### PDF Downloads

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

### Icons

```jsx
<img 
  src="/media/icons/icon-diabetes.svg" 
  alt="Diabetes Icon"
  className="w-8 h-8"
/>
```

## File Paths

All files in `web/public/` are served from the root URL:

- `web/public/media/images/chart.png` → `/media/images/chart.png`
- `web/public/media/pdfs/guide.pdf` → `/media/pdfs/guide.pdf`
- `web/public/images/existing.jpg` → `/images/existing.jpg` (still works!)

## Best Practices

1. **Optimize images** before upload (use TinyPNG, ImageOptim)
2. **Use descriptive filenames**: `diabetes-risk-chart.png` not `chart1.png`
3. **Keep file sizes reasonable**: 
   - Images: < 500KB
   - PDFs: < 5MB
   - Videos: Prefer YouTube embeds over local files
4. **Use proper alt text** for accessibility

## Adding Media to Content

### In Markdown Files (`web/content/`)

```markdown
# Diabetes Reversal Guide

![Risk Chart](/media/images/diabetes-chart.png)

[Download Full Guide](/media/pdfs/diabetes-guide.pdf)
```

### In React Components

```jsx
export default function ConditionPage() {
  return (
    <div>
      <img src="/media/images/chart.png" alt="Chart" />
      <a href="/media/pdfs/guide.pdf">Download PDF</a>
    </div>
  );
}
```
