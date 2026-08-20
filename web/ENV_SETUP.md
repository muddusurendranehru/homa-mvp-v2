# 🔧 Environment Setup

## Create .env.local File

In the `/web` directory, create a file called `.env.local`:

```bash
cd web
```

**Windows (PowerShell):**
```powershell
@"
NEXT_PUBLIC_API_URL=http://localhost:5000/api
"@ | Out-File -FilePath .env.local -Encoding utf8
```

**Or create manually with this content:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

> **Note:** Replace `G-XXXXXXXXXX` with your actual Google Analytics 4 Measurement ID. If you don't have one yet, the GA4 code won't load (it's conditional).

---

## Why This Variable Name?

- ✅ `NEXT_PUBLIC_API_URL` - Can be read in browser, points to backend API base URL
- ✅ `NEXT_PUBLIC_GA4_MEASUREMENT_ID` - Google Analytics 4 Measurement ID (e.g., `G-XXXXXXXXXX`)
- ✅ All API calls are relative: `/auth/login`, `/assessments/latest`

---

## How It Works

### In lib/api.ts:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Creates axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,  // http://localhost:5000/api
});

// All calls are relative:
apiClient.post('/auth/login', data);      // → http://localhost:5000/api/auth/login
apiClient.get('/assessments/latest');    // → http://localhost:5000/api/assessments/latest
```

### Axios Interceptor:
```typescript
// Automatically adds Authorization header from localStorage
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
```

---

## Production Setup

When deploying to Render, update `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

---

## Verify Setup

After creating `.env.local`, run:

```bash
npm run dev
```

Check browser console for:
```
Backend URL: http://localhost:5000/api
```

---

**Current Backend:** Running on port 5000 ✅  
**GA4 Status:** Configured in `web/app/layout.tsx` (requires `NEXT_PUBLIC_GA4_MEASUREMENT_ID` in `.env.local`)  
**Update .env.local if you change backend port or add GA4 ID!**

---

## Google Analytics 4 (GA4) Setup

### Get Your Measurement ID:

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a property or select an existing one
3. Go to **Admin** → **Data Streams** → Select your web stream
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Add to .env.local:

```env
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Verify GA4 is Working:

1. Restart your Next.js dev server (`npm run dev`)
2. Open your site in a browser
3. Check browser console → Network tab → Look for `gtag/js` requests
4. Or use [Google Tag Assistant](https://tagassistant.google.com/) to verify

### How It Works:

The GA4 code is conditionally loaded in `web/app/layout.tsx`:
- ✅ Only loads if `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set
- ✅ Tracks page views automatically
- ✅ Uses Next.js App Router best practices**

