# Gallery photo upload

Add a photo in five steps. The gallery page only loads the first six images, then six more each time a visitor clicks Load more.

The live route is `web/app/gallery/page.tsx`. This Next.js app already uses `web/app` for every page, so the image list lives at `web/src/data/gallery.ts` and is imported from that page. Do not create `web/src/app`; that would hide the rest of the site.

1. Compress the image on [TinyPNG](https://tinypng.com/) so the file is under 150KB.
2. Rename the file (for example, `screening-camp-1.jpg`).
3. Place it in `web/public/images/gallery/`.
4. Add one line to `web/src/data/gallery.ts`:

```ts
{ id: '6', src: '/images/gallery/screening-camp-1.jpg', alt: 'HOMA screening camp', category: 'Camps' },
```

5. Push to GitHub.
