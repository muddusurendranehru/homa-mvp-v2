# Push Steps – .well-known Setup

## What Will Be Committed

| File/Folder | Description |
|-------------|-------------|
| `web/public/.well-known/assetlinks.json` | Android App Links for com.homahealthcarecenter.app |
| `web/public/.well-known/apple-app-site-association` | iOS Universal Links |
| `web/public/.well-known/security.txt` | Security contact info (RFC 9116) |
| `web/app/security-policy/page.tsx` | Security policy page |
| `web/next.config.js` | Content-Type headers for .well-known files |
| `TODAY_ACHIEVEMENTS_WELL_KNOWN.md` | Today's achievements summary |
| `web/app/layout.tsx` | Footer Security link |

---

## Step 1: Navigate to Project Root

```powershell
cd "c:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION"
```

---

## Step 2: Check Status

```powershell
git status
```

---

## Step 3: Pull Latest (if behind)

```powershell
git pull origin main
```

Resolve any merge conflicts if they appear.

---

## Step 4: Add Files Selectively

```powershell
git add web/public/.well-known/
git add web/app/security-policy/page.tsx
git add web/next.config.js
git add TODAY_ACHIEVEMENTS_WELL_KNOWN.md
git add web/app/layout.tsx
```

---

## Step 5: Commit with Descriptive Message

```powershell
git commit -m "feat: Complete .well-known setup for deep links and security

- Added assetlinks.json for Android App Links (Play Store verification)
- Added apple-app-site-association for iOS Universal Links
- Added security.txt (RFC 9116) with security contact info
- Created /security-policy page for vulnerability disclosure
- Configured Content-Type headers in next.config.js
- Added Security link in footer
- Documented achievements in TODAY_ACHIEVEMENTS_WELL_KNOWN.md"
```

---

## Step 6: Push to GitHub (triggers Render auto-deploy)

```powershell
git push origin main
```

---

## Step 7: Wait for Render Deploy

Wait **2–3 minutes** for Render to build and deploy.

---

## Step 8: Verify URLs

Replace `your-domain.com` with your actual domain (e.g. `dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com`):

| URL | Expected |
|-----|----------|
| `https://your-domain.com/.well-known/assetlinks.json` | JSON with package_name, sha256 fingerprint |
| `https://your-domain.com/.well-known/apple-app-site-association` | JSON with appID, paths |
| `https://your-domain.com/.well-known/security.txt` | Plain text with Contact, Expires, etc. |
| `https://your-domain.com/security-policy` | Security policy page |

---

## Quick Copy-Paste (all steps)

```powershell
cd "c:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION"
git status
git pull origin main
git add web/public/.well-known/
git add web/app/security-policy/page.tsx
git add web/next.config.js
git add TODAY_ACHIEVEMENTS_WELL_KNOWN.md
git add web/app/layout.tsx
git commit -m "feat: Complete .well-known setup for deep links and security

- Added assetlinks.json for Android App Links (Play Store verification)
- Added apple-app-site-association for iOS Universal Links
- Added security.txt (RFC 9116) with security contact info
- Created /security-policy page for vulnerability disclosure
- Configured Content-Type headers in next.config.js
- Added Security link in footer
- Documented achievements in TODAY_ACHIEVEMENTS_WELL_KNOWN.md"
git push origin main
```
