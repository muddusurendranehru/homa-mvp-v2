# Today's Achievements – February 7, 2026

## `.well-known` Setup for HOMA Healthcare Center

### Summary
Configured the `.well-known` directory and files for app deep linking (Android & iOS) and security disclosure (RFC 9116).

---

### 1. Directory Structure
- **Created:** `web/public/.well-known/`
- Standard location for well-known URIs served at `https://your-domain.com/.well-known/`

---

### 2. Android App Links (Digital Asset Links) ✓
- **File:** `web/public/.well-known/assetlinks.json`
- **Purpose:** Enables Android App Links so `com.homahealthcarecenter.app` can handle website URLs
- **Status:** Complete – SHA256 fingerprint configured
- **Package:** `com.homahealthcarecenter.app`

---

### 3. iOS Universal Links
- **File:** `web/public/.well-known/apple-app-site-association`
- **Purpose:** Enables Universal Links so the iOS app opens when users tap site links
- **Status:** Structure in place; replace `YOUR_TEAM_ID` with your Apple Developer Team ID
- **Paths configured:** `/`, `/metabolic-calculator/*`, `/testimonials/*`
- **Bundle ID:** `com.homahealthcarecenter.app`

---

### 4. Security.txt (RFC 9116)
- **File:** `web/public/.well-known/security.txt`
- **Purpose:** Standard way for security researchers to report vulnerabilities
- **Configured:**
  - Contact: `mailto:security@homahealthcarecenter.in`
  - Contact: `https://homahealthcarecenter.in/contact`
  - Encryption (PGP): `https://homahealthcarecenter.in/pgp-key.txt`
  - Acknowledgments: `https://homahealthcarecenter.in/security-thanks`
  - Preferred-Languages: en, te
  - Canonical URL
  - Policy: `https://homahealthcarecenter.in/security-policy`
  - Hiring: `https://homahealthcarecenter.in/careers/security`
  - Expires: 2027-01-01T00:00:00.000Z

---

### Follow-Up Tasks
1. ~~**assetlinks.json:** Add SHA256 fingerprint~~ ✓ Done
2. **apple-app-site-association:** Add Apple Team ID; verify paths match app routes
3. **security.txt:** Ensure linked pages exist: `/contact`, `/pgp-key.txt`, `/security-thanks`, `/security-policy`, `/careers/security`
4. **security.txt:** Update `Expires` before 2027-01-01 (recommended: within 1 year)
5. **Deploy:** Ensure files are served with correct `Content-Type` (e.g. `application/json` for assetlinks.json)

---

### Files Created/Updated
| File | Location |
|------|----------|
| assetlinks.json | `web/public/.well-known/` |
| apple-app-site-association | `web/public/.well-known/` |
| security.txt | `web/public/.well-known/` |
