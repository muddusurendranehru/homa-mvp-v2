# 📱 PWA Icon Setup Instructions

## ✅ Step 1: Generate Icons (2 minutes)

### A. Generate Icons Online
1. Go to **https://www.favicon-generator.org**
2. Upload your clinic logo (or use text: "HOMA")
3. Select **"Android Chrome"** → it generates 192×192 and 512×512
4. Download the zip file

### B. Extract and Rename
After extracting the zip:
- `android-chrome-192x192.png` → rename to → `icon-192x192.png`
- `android-chrome-512x512.png` → rename to → `icon-512x512.png`

### C. Place Files
Place both PNG files in this directory:
```
web/public/
├── icon-192x192.png  ← Place here
├── icon-512x512.png  ← Place here
└── manifest.json     ← Already created ✅
```

## ✅ Step 2: Verify

After placing the icons, verify:
1. Files exist in `web/public/`:
   - ✅ `icon-192x192.png`
   - ✅ `icon-512x512.png`
   - ✅ `manifest.json`

2. Test locally:
   ```bash
   cd web
   npm run dev
   ```
   Visit: `http://localhost:3000/manifest.json`

3. Check browser:
   - Open DevTools → Application → Manifest
   - Should show "HOMA Clinic" as the app name
   - Icons should display correctly

## 🎯 Result

Your app is now installable as a PWA! Users can:
- Add to home screen (mobile)
- Install as app (desktop Chrome/Edge)
- See branded icons when installed

---

**Note:** The `manifest.json` file is already created and linked in `app/layout.tsx`. You just need to add the two PNG icon files!
