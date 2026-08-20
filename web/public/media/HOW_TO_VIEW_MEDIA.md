# How to View Media in Website Gallery

## Current Gallery Page

**URL:** `http://localhost:3002/gallery`

The gallery page currently displays images from `web/public/images/` directory.

## How to Check Media Structure

### 1. View Gallery Page in Browser

Open your browser and navigate to:
```
http://localhost:3002/gallery
```

You'll see:
- Patient success story images
- YouTube video embed
- Image cards with captions

### 2. Check Media Files Directly

**Images:**
- Existing: `http://localhost:3002/images/waist1.jpg`
- New media: `http://localhost:3002/media/images/diabetes-chart.png` (when uploaded)

**PDFs:**
- `http://localhost:3002/media/pdfs/guide.pdf` (when uploaded)

**Icons:**
- `http://localhost:3002/media/icons/icon-diabetes.svg` (when uploaded)

### 3. Add Media to Gallery Page

To use the new media structure in the gallery, update `web/app/gallery/page.tsx`:

**Current (using `/images/`):**
```jsx
<ImageCard
  src="/images/waist1.jpg"
  alt="Patient success"
  caption="Reversed diabetes"
/>
```

**New (using `/media/images/`):**
```jsx
<ImageCard
  src="/media/images/diabetes-chart.png"
  alt="Diabetes Risk Chart"
  caption="HOMA-IR Risk Assessment"
/>
```

### 4. Test Media Structure

**Step 1:** Upload a test image to `web/public/media/images/`
- Example: `diabetes-chart.png`

**Step 2:** Access it via browser:
```
http://localhost:3002/media/images/diabetes-chart.png
```

**Step 3:** Add to gallery page:
```jsx
<ImageCard
  src="/media/images/diabetes-chart.png"
  alt="Diabetes Risk Chart"
  caption="Metabolic Risk Assessment"
/>
```

## Directory Structure Check

**File System:**
```
web/public/
├── images/          ← Existing images (still works)
│   ├── waist1.jpg
│   └── ...
└── media/           ← New media structure
    ├── images/      ← New images go here
    ├── videos/      ← Video files
    ├── pdfs/        ← PDF documents
    └── icons/       ← SVG icons
```

**URL Paths:**
- `/images/waist1.jpg` → `web/public/images/waist1.jpg`
- `/media/images/chart.png` → `web/public/media/images/chart.png`
- `/media/pdfs/guide.pdf` → `web/public/media/pdfs/guide.pdf`

## Quick Test

1. **View existing gallery:** `http://localhost:3002/gallery`
2. **Check media directory:** Files in `web/public/media/` are accessible via `/media/...`
3. **Add new media:** Upload files to `web/public/media/images/` and access via `/media/images/filename.png`

## Example: Adding New Image to Gallery

1. Upload image: `web/public/media/images/diabetes-success.jpg`
2. Update gallery page:
```jsx
<ImageCard
  src="/media/images/diabetes-success.jpg"
  alt="Diabetes reversal success story"
  caption="HbA1c normalized in 90 days"
/>
```
3. View at: `http://localhost:3002/gallery`
