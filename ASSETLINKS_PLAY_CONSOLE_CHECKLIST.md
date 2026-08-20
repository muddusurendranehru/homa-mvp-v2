# assetlinks.json → Play Console Checklist

1. **Edit assetlinks.json in Cursor** – Remove Kivra entry (keep only `com.homahealthcarecenter.app`). ✓ Done
2. **Save the file.** ✓ Done
3. **Commit and push:**
   ```bash
   git add web/public/.well-known/assetlinks.json
   git commit -m "fix: Remove extra Kivra entry"
   git push origin main
   ```
4. **Wait 2–3 minutes** for Render to deploy.
5. **Click "Review and publish"** in Play Console.

---

**Note:** If `assetlinks.json` has no uncommitted changes, the commit will be empty. The repo already has only the HOMA entry; push if you have other changes, then do steps 4–5.
